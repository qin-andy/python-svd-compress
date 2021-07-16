import time

from PIL import Image
from flask import Flask, render_template, request, session
import redis
from markupsafe import escape
from ImageSVD import ImageSVD


app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)
secret_file = open("secret_key.txt");
app.secret_key = secret_file.read()

examples = [
    ImageSVD("static/images/bridge.png"),
    ImageSVD("static/images/city.png"),
    ImageSVD("static/images/horizon.png"),
    ImageSVD("static/images/shore.png")
]

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/svd/example/<index>")
def example(index):
    svs = request.args.get("svs");
    if svs == None:
        svs = 10
    elif not svs.isnumeric():
        return "Invalid singular values count!", 400
    svs = int(svs)

    if not index.isnumeric():
        return "Invalid index!", 400

    index = int(index)
    if (index >= 0) and (index < len(examples)):
        svd = examples[index]
        if svs > min(svd.width, svd.height):
            return "Singular values cannot exceed image size: " + str(svd.width) + "x" + str(svd.height), 400
        rgb = svd.get_reduced_image(svs);
        rgb_list = rgb.tolist()
        print("Request fulfilled")
        return {"colors": rgb_list, "shape": rgb.shape, "svs": svs}
    else:
        return "Image not found!", 400


@app.route("/upload/image", methods=['GET', 'POST'])
def upload():
    svs = request.args.get("svs");
    if svs == None:
        svs = 10
    elif not svs.isnumeric():
        return "Invalid singular values count!", 400
    svs = int(svs)

    if request.method == 'POST':
        data = request.form
        arr = data["data"].split(",")
        svd = ImageSVD(arr, int(data["width"]), int(data["height"]))
        rgb = svd.get_reduced_image(svs)
        rgb_list = rgb.tolist()
        print("post result shape: " + str(rgb.shape))
        return {"colors": rgb_list, "shape": rgb.shape, "svs": svs}
    else:
        return "<p>Image uploading endpoint</p>"

@app.route("/session")
def count():
    if 'count' not in session:
        session['count'] = 0
    session['count'] += 1
    return str(session['count'])

@app.route("/redis/hits")
def hits():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)