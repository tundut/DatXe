from .home import home
from .auth import auth
from .manage import manage
from .book import book
from .feedback import feedback
from .promotion import promotion
from .ride import ride

blueprints = [home, auth, manage, book, feedback, promotion, ride]

def register_blueprints(app):
    for bp in blueprints:
        app.register_blueprint(bp)