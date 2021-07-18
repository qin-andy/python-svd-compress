from flask import Flask
from application.images import images

def create_app():
    app = Flask(__name__)
    app.register_blueprint(images)
    secret_file = open("secret_key.txt")
    app.secret_key = secret_file.read()
    return app