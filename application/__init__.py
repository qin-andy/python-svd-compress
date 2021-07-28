from flask import Flask
from application.images import app

def create_app():
    app = Flask(__name__)
    app.register_blueprint(app)
    return app