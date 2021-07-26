import uuid
import pickle
import redis
import os
import time
import re

from functools import wraps
from flask import Blueprint, render_template, request, session
from markupsafe import escape

from application.svd.ImageSVD import ImageSVD


images = Blueprint('images',__name__,
            static_url_path='', 
            static_folder='static',
            template_folder='templates')
url = os.environ.get("REDIS_URL")
cache = None
if not url:
    cache = redis.Redis(host='redis', port=6379)
else:
    cache = redis.from_url(url)


EXPIRATION_TIME = 300 # In seconds

def assign_session(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user_id = session.get('user_id')
        if user_id:
            return fn(*args, **kwargs)
        else:
            session['user_id'] = str(uuid.uuid4().hex)
            return fn(*args, **kwargs)
    return wrapper


def buildSVDJson(svd, svs):
    if svs > min(svd.width, svd.height):
        return "Singular values cannot exceed image size: " + str(svd.width) + "x" + str(svd.height), 400
    rgb = svd.get_reduced_image(svs);
    # rgb_list = rgb.tolist()
    return {"colors": str(rgb), "shape": (1, 1), "svs": svs}, 200


@images.route("/")
@assign_session
def index():
    return render_template("index.html")


@images.route("/upload/image", methods=['GET', 'POST'])
@assign_session
def upload():
    print("Upload request receieved!")
    completeStart = time.time()
    svs = request.args.get("svs");
    if svs == None:
        svs = 10
    elif not svs.isnumeric():
        return "Invalid singular values count!", 400
    svs = int(svs)

    if request.method == 'POST':
        data = request.form
        svd = ImageSVD(re.sub('^data:image/.+;base64,', '', data['data64']), 64)

        start = time.time()
        cache.set(session.get("user_id"), pickle.dumps(svd))
        cache.expire(session.get("user_id"), EXPIRATION_TIME)
        print("Storing Upload SVD in Redis: " + str(time.time() - start))
        
        start = time.time()
        res, code = buildSVDJson(svd, svs)
        print("Building SVD Json: " + str(time.time() - start))
        print("Complete upload time:: " + str(time.time() - completeStart))
        return res, code
    else:
        return "<p>Image uploading endpoint</p>"


@images.route("/recalculate")
@assign_session
def recalculate_product():
    completeStart = time.time()
    svs = request.args.get("svs");

    if svs == None:
        svs = 10
    elif not svs.isnumeric():
        return "Invalid singular values count!", 400
    svs = int(svs)
    svd = None

    try:
        start = time.time()
        serialized_image_svd = cache.get(session.get("user_id"))
        svd = pickle.loads(serialized_image_svd)
        print("Fetching svd from redis: " + str(time.time() - start))
    except:
        return "Session timed out! Try recalculating!", 408
    start = time.time()
    res, code = buildSVDJson(svd, svs)
    print("Building SVD Json: " + str(time.time() - start))
    print("Complete recalculate time:: " + str(time.time() - completeStart))
    return res, code


@images.route("/session")
@assign_session
def count():
    user_id = session.get("user_id")
    if 'count' not in session:
        session['count'] = 0
    session['count'] += 1
    return str(session['count']) + " views from session: " + str(user_id) + ", stored: " + str(cache.get(user_id))