from flask import Flask
from application.api import api
from application.home import home

def create_app():
    app = Flask(__name__,
                static_url_path='/', 
                static_folder='../frontend/build')

    secret_file = open("secret_key.txt")
    app.secret_key = secret_file.read()

    app.register_blueprint(api)
    app.register_blueprint(home)
    return app