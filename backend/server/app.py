from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from apis.Controller.loginController import login_bp
from apis.Controller.userController import user_bp

from db_connect import db
import config


def create_app():
    app = Flask(__name__)
    app.register_blueprint(login_bp)
    app.register_blueprint(user_bp)
    app.config.from_object(config)

    JWTManager(app)
    db.init_app(app)

    migrate = Migrate(app, db)
    migrate.init_app(app, db, compare_type=True)

    CORS(app, supports_credentials=True)

    return app

if __name__ == "__main__":
    create_app().run(debug=True)
    