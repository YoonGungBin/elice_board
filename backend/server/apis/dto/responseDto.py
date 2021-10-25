from flask.json import jsonify

def user_response_dto(user):
    if user == "email is aready done":
        return jsonify(user), 400
    return jsonify({"email":user.email,
                    "name":user.name}
                ), 200

def login_response_dto(result):
    if result == "login fail":
        return jsonify(result), 400
    return jsonify({"access_token":result[0],
                    "refresh_token":result[1]}
                ), 200

