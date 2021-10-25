def login_request_dto(user):
    return {
        "email": user['email'],
        "password": user['password']
    }

def user_request_dto(user):
    return {
        "email": user['email'],
        "password": user['password'],
        "name": user["name"]
    }