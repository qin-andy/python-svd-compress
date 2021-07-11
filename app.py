from flask import Flask, render_template
from markupsafe import escape
from ImageSVD import ImageSVD
import json

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/svd/example")
def example():
    image = ImageSVD("tapir_sad.jpg")
    image_array = image.get_reduced_image(3);
    image_list = image_array.tolist()
    return {"colors": image_list, "shape": image_array.shape}