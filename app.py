from flask import Flask, render_template
from markupsafe import escape
from ImageSVD import ImageSVD, ColorSVD

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/name/<name>")
def hello(name):
    return f"Hello, {escape(name)}!"
