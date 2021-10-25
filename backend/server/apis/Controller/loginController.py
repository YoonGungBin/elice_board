from flask import Blueprint, request, jsonify
from apis.dto.requestDto import user_request_dto, login_request_dto
from apis.dto.responseDto import user_response_dto, login_response_dto
from service.loginService import login_user, token_reissuance, check_user
from flask_jwt_extended import  jwt_required
from flask_jwt_extended.utils import unset_jwt_cookies

login_bp = Blueprint('login', __name__, url_prefix='/api')

# 로그인
@login_bp.route("/login", methods=['POST'])
def login():
    user = login_request_dto(request.get_json())
    result = login_user(user)

    return login_response_dto(result)
    
# 토큰 재발급
@login_bp.route("/silent-refresh", methods=['GET'])
@jwt_required(refresh=True)
def silent_refresh():
    access_token = token_reissuance()
    return jsonify(access_token=access_token)

# 토큰 보냈을 때 유저 정보 체크
@login_bp.route("/check", methods=['GET'])
@jwt_required(refresh=True)
def check():
    user = check_user()
    return user_response_dto(user)

# 로그아웃(다시 만들기)
@login_bp.route('/logout')
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response