from apis.dto.requestDto import user_request_dto
from flask import Blueprint, request
from service.userService import register_user
from apis.dto.responseDto import user_response_dto

user_bp = Blueprint('user', __name__, url_prefix='/api')

# 회원가입
@user_bp.route("/register", methods=['POST'])
def user():
    # 회원가입
    user = request.get_json()
    result = register_user(user)
    return user_response_dto(result)