from domain.models.user import User, db

def one_user(identity):
    if str(type(identity)) == "<class 'str'>":
        result = User.query.filter_by(email=identity).first()
    if str(type(identity)) == "<class 'int'>":
        result = User.query.filter_by(id=identity).first()

    return result

def new_user(email, password, name):
    user = User(email, password, name)
    db.session.add(user)
    db.session.commit()
    return user