from db_connect import db

class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    profile = db.Column(db.String(255))

    # posts = db.relationship('Post',backref='user')
    # comments = db.relationship('Comment',backref='user')
    # likes = db.relationship('Likes',backref='user')

    def __init__(self, email, password, name):
        self.email = email
        self.password = password
        self.name = name