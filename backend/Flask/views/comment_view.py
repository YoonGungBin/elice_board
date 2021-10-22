
from flask import Blueprint, request, session
from werkzeug.utils import redirect
from datetime import datetime

bp = Blueprint('comment', __name__)
from model.model import *


@bp.route('/post/<int:post_id>/comment', methods=['POST'])
def create_comment(post_id):
    # 댓글 작성
    if request.method == 'POST':
        if 'id' not in session:
            return "로그인이 필요한 서비스입니다."
        post_id = post_id
        user_id = session['id']
        post_date = datetime.now()
        content = request.form['content']
        
        comment = Comment(
            post_id=post_id,
            user_id=user_id,
            post_date=post_date,
            content=content
        )
        db.session.add(comment)
        db.session.commit()

        return redirect("/post/"+str(post_id))


@bp.route('/post/<int:post_id>/comment/<int:comment_id>', methods=['PATCH'])
def update_comment(post_id, comment_id):
    # 댓글 수정
    if request.method == 'PATCH':
        if 'id' not in session:
            return "로그인이 필요한 서비스입니다."

        comment = Comment.query.filter_by(id=comment_id).first()
        if comment.user_id == session['id']:
            comment.update_date = datetime.now()
            comment.content = request.form['content']
            
            db.session.commit()
    
    return redirect("/post/"+str(post_id))   