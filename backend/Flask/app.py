from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from flask_jwt_extended import JWTManager
from datetime import timedelta

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    cors = CORS(app, supports_credentials=True)

    # user:password에 mySQL서버 username과 password입력 => mySQL서버에 nmpdb 생성
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://username:password@localhost:3306/nmpdb?charset=utf8mb4"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config['SESSION_TYPE'] = 'filesystem'
    app.secret_key = "123"

    # jwt
    app.config['JWT_SECRET_KEY'] = 'super-secrete'
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    jwt = JWTManager(app)
    
    db.init_app(app)

    # app.py있는 폴더에서 flask db init => flask db migrate => flask db upgrade 입력 후 db에 테이블이 잘 생성되는지 확인
    migrate = Migrate(app, db)

    from views import main_view, user_view, comment_view

    app.register_blueprint(main_view.bp)
    app.register_blueprint(user_view.bp)
    app.register_blueprint(comment_view.bp)

    
    return app

# app.py있는 폴더에서 flask run 실행
if __name__ == "__main__":
    create_app().run(debug=True)
    