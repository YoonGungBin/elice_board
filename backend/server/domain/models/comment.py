from db_connect import db

class Comment(db.Model):
    __tablename__ = "Comment"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    post_date = db.Column(db.Date(), nullable=False)
    update_date = db.Column(db.Date())
    content = db.Column(db.Text())

    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'), nullable=False)
    user_id = db.Column(db.String(255), db.ForeignKey('User.id'), nullable=False)