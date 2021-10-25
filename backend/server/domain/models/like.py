from db_connect import db

class Likes(db.Model):
    __tablename__ = "Likes"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    
    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'), nullable=False)
    user_id = db.Column(db.String(255), db.ForeignKey('User.id'), nullable=False)
    date = db.Column(db.Date(), nullable=False)