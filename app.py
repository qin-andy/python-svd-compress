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
    image = ImageSVD("beav.png")
    image_array = image.get_reduced_image(630);
    image_list = image_array.tolist()
    json_str = json.dumps(image_list)
    return {"colors": json_str}