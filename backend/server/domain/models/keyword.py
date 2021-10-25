from db_connect import db

class Keyword(db.Model):
    __tablename__ = "Keyword"
    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'),  primary_key=True, nullable=False)
    
    keyword = db.Column(db.String(50), nullable=False)