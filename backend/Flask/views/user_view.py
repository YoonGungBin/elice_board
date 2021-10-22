from datetime import date, datetime, timedelta, timezone
from flask import Blueprint, render_template, request, session, jsonify
from flask.wrappers import Response
from flask_jwt_extended.utils import set_access_cookies, unset_jwt_cookies
from werkzeug.utils import redirect, secure_filename
from bcrypt import hashpw, checkpw, gensalt
import jwt

from flask_jwt_extended import JWTManager
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required, get_jwt_identity
)


bp = Blueprint('user', __name__)

from model.model import *

# 회원가입
@bp.route("/register", methods=['GET', 'POST'])
def regist():
    if request.method == 'POST':
        user = User.query.filter_by(id=request.json['id']).first()
        if not user:
            id = request.json['id']
            password = request.json['password']
            name = request.json['name']
            telephone = request.json['telephone']

            pw_hash = hashpw(password.encode('utf-8'), gensalt())

            user = User(
                id=id,
                password=pw_hash,
                name=name,
                telephone=telephone
            )
            db.session.add(user)
            db.session.commit()

            return '', 200
        else:
            return '', 401


# 로그인
@bp.route("/login", methods=['POST'])
def login():
    if request.method == "POST":
        id = request.json['id']
        password = request.json['password'].encode("utf-8")
        user = User.query.filter_by(id=id).first()

        if not user:
            return '', 401
        elif not checkpw(password, user.password.encode("utf-8")):
            return '', 401
        else:
            access_token = create_access_token(identity=id, fresh=True)
            refresh_token = create_refresh_token(identity=id)
            return jsonify(
                access_token=access_token, 
                refresh_token=refresh_token
            )


# 토큰 재발급
@bp.route("/silent-refresh", methods=['POST'])
@jwt_required(refresh=True)
def silent_refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity, fresh=False)
    return jsonify(access_token=access_token)


@bp.route("/check", methods=['POST'])
@jwt_required(refresh=True)
def check():
    identity = get_jwt_identity()
    user_id = identity
    user = User.query.filter_by(id=user_id).first()
    return jsonify({"id": user.id, "name": user.name})

# 로그아웃
@bp.route('/logout')
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@bp.route('/protected', methods=['GET'])
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200    


# 마이페이지 조회
@bp.route('/mypage', methods=['GET', 'PATCH'])
def mypage():
    user = User.query.filter_by(id=session['id']).first()
    if request.method == "GET":
        return render_template("mypage.html", user=user)

    # 마이페이지 수정
    if request.method == "PATCH":
        ch_pw = request.json['password'].encode("utf-8")

        if checkpw(ch_pw, user.password.encode("utf-8")):
            password = request.json['password']
            user.password = hashpw(password.encode('utf-8'), gensalt())
            user.name = request.json['name']
            user.telephone = request.json['telephone']
            db.session.commit()
    return redirect('/mypage')


@bp.route('/fileUpload', methods=['GET', 'POST'])
def upload_file():
    id = session['id']
    if request.method == 'POST':
        file = request.files['file']
        file.save('./static/uploads/profile/' + secure_filename(file.filename))
        photolink = './static/uploads/profile/' + file.filename

        user = User.query.filter_by(id=id).first()
        user.profile = photolink
        db.session.commit()

    return redirect('/mypage') 
