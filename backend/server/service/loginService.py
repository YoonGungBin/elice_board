from domain.dao.userDao import one_user
from bcrypt import hashpw, checkpw, gensalt
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required, get_jwt_identity
)

def login_user(user):
    email = user['email']
    password = user['password']
    user = one_user(email)

    if not user:
        return 'login fail'
    elif not checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
        return 'login fail'
    else:
        access_token = create_access_token(identity=user.id, fresh=True)
        refresh_token = create_refresh_token(identity=email)
        return [access_token, refresh_token]

def token_reissuance():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user, fresh=False)
    return access_token

def check_user():
    identity = get_jwt_identity()
    user = one_user(identity)

    return user