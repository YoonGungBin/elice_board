
from flask import Blueprint, render_template, request, session, flash
from werkzeug.utils import redirect
from datetime import datetime, timedelta
import collections

bp = Blueprint('main', __name__)
from model.model import *

# 정보 조회 용 임시 홈
@bp.route('/')
def home():
    # 최근 일주일 좋아요 많이 받은 상위 6개의 게시물
    week_ago = datetime.now()-timedelta(weeks=1)
    likes = db.session.query(Likes).filter(Likes.date>=week_ago).all() 

    post_ids = collections.defaultdict(int)
    for like in likes:
        post_ids[like.post_id] += 1 


    post_ids = sorted(post_ids.items(), key= lambda x : x[1])[:6]
    top10_posts = []
    for post_id, value in enumerate(post_ids):
        post = Post.query.filter_by(id=post_id).first()
        top10_posts.append(post)

    return render_template('db.html',  posts=top10_posts)


# 포스트 목록 조회
@bp.route('/post', methods=['GET'])
def post():
    # 포스트 목록 조회
    if request.method == 'GET':
        posts = Post.query.all()
        return render_template("post.html", posts=posts)
    return redirect("/post")


# 포스트 작성
@bp.route('/post/write', methods=['GET', 'POST'])
def post_write():
    # 포스트 작성
    if request.method == 'POST':
        if 'id' not in session:
            return "로그인이 필요한 서비스입니다."

        post_date = datetime.now()
        title = request.form['title']

        post = Post(
            user_id=session['id'],
            post_date=post_date,
            title=title,
            content=request.form['content'],
            like = 0
        )

        db.session.add(post)
        db.session.commit()

        # post = Post.query.filter_by(post_date=post_date, title=title).first()
        # post_id = post.id

        # keyword 받아오기
        # {keywords:[k1, k2, k3, ...]}
        # keywords = request.get_json()


    if request.method == 'GET':
        return "게시물 작성 페이지"

    return redirect("/post")

# @bp.route('post/<int:post_id>/keywords', methods=['POST'])



@bp.route('/post/<int:post_id>', methods=['GET', 'POST', 'PATCH'])
def post_detail(post_id):
    # 포스트 조회
    if request.method == 'GET':
        post = Post.query.filter_by(id=post_id).first()
        return render_template("post_detail.html", post=post)

    # 게시물 수정
    if request.method == 'PATCH':
        if 'id' not in session:
            return "로그인이 필요한 서비스입니다."
        post = Post.query.filter_by(id=post_id).first()
        # 현재 로그인한 유저의 아이디가 게시물 작성 아이디와 같은 경우에만 수정 가능
        if post.user_id == session['id']:
            post.title = request.form['title']
            post.content = request.form['content']
            post.update_date = datetime.now()

            db.session.commit()
        
        return redirect("/post/"+str(post_id))


# 좋아요 누르기
@bp.route('/post/<int:post_id>/like', methods=['GET'])
def like(post_id):
    if 'id' not in session:
        return "로그인이 필요한 서비스입니다."

    post = Post.query.filter_by(id=post_id).first()
    user_id = session['id']
    like = Likes.query.filter_by(user_id=user_id, post_id=post_id).first()
    # 이미 좋아요를 눌렀으면 좋아요 삭제
    if like:
        post.like -= 1
        db.session.delete(like)
    # 누르지 않았으면 추가
    else:
        like = Likes(
            post_id = post_id,

            user_id = user_id,
            date = datetime.now()
        )
        post.like += 1
        db.session.add(like)

    db.session.commit()
    return redirect("/post/"+str(post_id))
