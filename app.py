from PIL import Image
from flask import Flask, render_template, request, session
from markupsafe import escape
from ImageSVD import ImageSVD


app = Flask(__name__)
secret_file = open("secret_key.txt");
app.secret_key = secret_file.read()

examples = [
    ImageSVD("static/images/horizon.png"),
    ImageSVD("static/images/city.png"),
    ImageSVD("static/images/bridge.png"),
    ImageSVD("static/images/shore.png")
]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/svd/example/<index>")
def example(index):
    if not index.isnumeric():
        return "Invalid index!", 400
    index = int(index)
    if (index >= 0) and (index < len(examples)):
        svd = examples[0]
        rgb = svd.get_reduced_image(10);
        rgb_list = rgb.tolist()
        return {"colors": rgb_list, "shape": rgb.shape}
    else:
        return "Image not found!", 400


@app.route("/upload/image", methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        data = request.form
        arr = data["data"].split(",")
        svd = ImageSVD(arr, int(data["width"]), int(data["height"]))
        rgb = svd.get_reduced_image(20)
        rgb_list = rgb.tolist()
        print("post result shape: " + str(rgb.shape))
        return {"colors": rgb_list, "shape": rgb.shape}
    else:
        return "<p>Image uploading endpoint</p>"

@app.route("/session")
def count():
    if 'count' not in session:
        session['count'] = 0
    session['count'] += 1
    return str(session['count'])