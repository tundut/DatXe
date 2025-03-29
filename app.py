from app.models import db, TaiKhoan
from app.routes import register_blueprints

from flask_login import LoginManager
from flask import Flask
import os
import secrets

basedir = os.path.abspath(os.path.dirname(__file__))
database_path = os.path.join(basedir, "app", "instance", "database.db")


app = Flask(__name__, template_folder="app/templates", static_folder="app/static")
app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{database_path}"

db.init_app(app)

register_blueprints(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(TaiKhoan, user_id)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)