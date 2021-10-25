from app import db
class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.String(255), primary_key=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    telephone = db.Column(db.String(13), nullable=False)
    profile = db.Column(db.String(255))

    posts = db.relationship('Post',backref='user')
    comments = db.relationship('Comment',backref='user')
    likes = db.relationship('Likes',backref='user')

    def serialize(self):
        return {'id':self.id, 'password':self.password, 'name':self.name, 'telephone':self.telephone} 

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

class Comment(db.Model):
    __tablename__ = "Comment"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    post_date = db.Column(db.Date(), nullable=False)
    update_date = db.Column(db.Date())
    content = db.Column(db.Text())

    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'), nullable=False)
    user_id = db.Column(db.String(255), db.ForeignKey('User.id'), nullable=False)


class Likes(db.Model):
    __tablename__ = "Likes"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    
    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'), nullable=False)
    user_id = db.Column(db.String(255), db.ForeignKey('User.id'), nullable=False)
    date = db.Column(db.Date(), nullable=False)

class Keyword(db.Model):
    __tablename__ = "Keyword"
    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'),  primary_key=True, nullable=False)
    
    keyword = db.Column(db.String(50), nullable=False)
