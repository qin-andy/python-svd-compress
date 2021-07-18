import uuid
import pickle
import redis
import gc

from functools import wraps
from flask import Flask, render_template, request, session
from markupsafe import escape

from ImageSVD import ImageSVD


app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)
secret_file = open("secret_key.txt");
app.secret_key = secret_file.read()

svds =[
    ImageSVD("static/images/bridge.png"),
    ImageSVD("static/images/city.png"),
    ImageSVD("static/images/horizon.png"),
    ImageSVD("static/images/shore.png")
]

examples = [
    pickle.dumps(svds[0]),
    pickle.dumps(svds[1]),
    pickle.dumps(svds[2]),
    pickle.dumps(svds[3])
]

cache.set("ex0", examples[0])
cache.set("ex1", examples[1])
cache.set("ex2", examples[2])
cache.set("ex3", examples[3])

del svds
del examples
gc.collect()

expiration_time = 60

def assign_session(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user_id = session.get('user_id')
        if user_id:
            print("Session recognized: " + str(user_id))
            return fn(*args, **kwargs)
        else:
            session['user_id'] = str(uuid.uuid4().hex)
            print("Session unrecognized, assigning: " + str(user_id))
            return fn(*args, **kwargs)
    return wrapper


def buildSVDJson(svd, svs):
    if svs > min(svd.width, svd.height):
        return "Singular values cannot exceed image size: " + str(svd.width) + "x" + str(svd.height), 400
    rgb = svd.get_reduced_image(svs);
    rgb_list = rgb.tolist()
    return {"colors": rgb_list, "shape": rgb.shape, "svs": svs}, 200


@app.route("/")
@assign_session
def index():
    return render_template("index.html")


@app.route("/svd/example/<index>")
@assign_session
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
    if (index >= 0) and (index < 4):
        serialized_image_svd = cache.get("ex" + str(index))
        svd = pickle.loads(serialized_image_svd)
        

        session['current'] = "ex" + str(index)
        res, code = buildSVDJson(svd, svs)
        return res, code
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

        session['current'] = "custom"
        cache.set(session.get("user_id"), pickle.dumps(svd))
        cache.expire(session.get("user_id"), expiration_time)

        res, code = buildSVDJson(svd, svs)
        return res, code
    else:
        return "<p>Image uploading endpoint</p>"


@app.route("/recalculate")
@assign_session
def recalculate_product():
    svs = request.args.get("svs");
    selected = request.args.get("selected")

    if svs == None:
        svs = 10
    elif not svs.isnumeric():
        return "Invalid singular values count!", 400
    svs = int(svs)

    svd = None

    if session.get("current") == "custom":
        serialized_image_svd = cache.get(session.get("user_id"))
        if not serialized_image_svd:
            return "Session timed out", 400
        svd = pickle.loads(serialized_image_svd)
    else:
        serialized_image_svd = cache.get("ex" + selected)
        svd = pickle.loads(serialized_image_svd)
    res, code = buildSVDJson(svd, svs)
    return res, code


@app.route("/session")
@assign_session
def count():
    user_id = session.get("user_id")
    if 'count' not in session:
        session['count'] = 0
    session['count'] += 1
    return str(session['count']) + " views from session: " + str(user_id) + ", stored: " + str(cache.get(user_id))


@app.route("/session/store/<value>")
@assign_session
def redis_store_test(value):
    user_id = session.get("user_id")
    cache.set(user_id, value)
    return "Stored " + str(value) + " in redis!"