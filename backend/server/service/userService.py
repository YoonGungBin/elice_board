from domain.dao.userDao import one_user, new_user
from bcrypt import hashpw, checkpw, gensalt

def register_user(user):
    check_user = one_user(user['email'])
    if not check_user:
        pw_hash = hashpw(user['password'].encode('utf-8'), gensalt())
        user = new_user(
            email=user['email'],
            password=pw_hash,
            name=user['name']
        )
        return user
    else:
        return 'email is aready done'