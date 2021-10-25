from db_connect import db

class Post(db.Model):
    __tablename__ = "Post"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    post_date = db.Column(db.Date(), nullable=False)
    update_date = db.Column(db.Date())
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text())
    like = db.Column(db.Integer)
    user_id = db.Column(db.String(255), db.ForeignKey('User.id'), nullable=False)

    keywords = db.relationship('Keyword',backref='post')
    likes = db.relationship('Likes',backref='post')
    comments = db.relationship('Comment',backref='post')