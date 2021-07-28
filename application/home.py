from flask import Blueprint, session, send_from_directory


home = Blueprint('home', __name__,
            static_url_path='/', 
            static_folder='../frontend/build')


@home.route("/")
def index():
    return send_from_directory(home.static_folder, 'index.html')