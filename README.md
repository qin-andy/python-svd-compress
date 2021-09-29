# [python-svd-compress](https://fierce-plateau-92798.herokuapp.com)
<img src="https://github.com/qin-andy/python-web-svd-compress/blob/master/images/side_by_side%20svd.PNG" alt="a side by side comparison of the svd compress"><img>

An interactive web demo of the singular value decomposition of a matrix applied to image compression.
See website 'About the SVD' section for more details on the SVD itself.

Built in **React**, **Flask**, and **Redis** and dockerized for development and deployment.

## Features
  - Serverside calculations and caching for clientside performance
  - Interactive singular value slider to visualize compression at differing levels
  - Custom image uploading support for user files

## Usage
### Setting up Local Development
  1. Run ``git clone`` to the directory of your choice
  2. Set up backend python environment 
      1. From root, ``cd application``
      2. Set up venv with ``python -m venv env`` and activate ``./env/Scripts/activate``
      3. Install dependencies with ``pip install -r requirements.txt``
      4. Create a ``secret_key.txt`` file in the application folder with a secure key
  3. Setup React frontend with yarn
      1. From root, ``cd frontend``
      2. Install dependencies with ``yarn install``
  5. Ensure docker and docker-compose are installed
  6. From root, run ``docker-compose up`` to set up Flask backend and Redis server on ``http://localhost:5000``
  7. Run ``cd frontend`` and ``yarn start`` for the React live development server on ``http://localhost:3000`` with requests proxied to the Flask backend

With docker-compose, the Flask server is configured to start in development mode with live reload using docker volume mounted to the backend directory.

Note that there are 2 dockerfiles, ``Dockerfile`` and ``Dockerfile.dev``. The ``Dockerfile`` with no extension is used for deployment on Heroku with a multistage build to serve
the frontend as well as configured ports as environment variables, [as described in the Heroku documentation.](https://devcenter.heroku.com/articles/container-registry-and-runtime)
Do not use this one for local development. There are no volume mounts, so any code changes will require an entire image rebuild. Also, by default it will not run as the ports are not configured locally!

``Dockerfile.dev`` can be used to expose the right ports locally and features volume mounts for the code as an alternative to docker-compose, although the Redis server must be started separately.

### Deployment
A brief summary, see [the Heroku devcenter](https://devcenter.heroku.com/articles/container-registry-and-runtime) for more details. Assuming an
app has already been created:
  1. Run ``docker build -t svd-compress .`` to build the image from the Dockerfile at the root of the directory
  2. Run ``heroku container:login`` then ``heroku container:push web`` and wait for the image and container to build
  3. Run ``heroku container:release web`` to deploy and ``heroku logs --tail`` to monitor for any issues

For Heroku, the Redis server is configured using the [Redis Addon for Heroku](https://elements.heroku.com/addons/heroku-redis) rather than seperately networked containers
as recommended by the Heroku devcenter.

## About This Project
My goals for this project were to:
  - Make an interesting math concept more accessible
  - Design a fluid and responsive web experience with a well-designed user interface
  - Step out of the JavaScript ecosystem and experiment with Python through Flask
  - Explore a new database system through Redis
  - Learn about developing with Docker and dockerization of existing applications


### In terms of why I chose those specific technologies:
  - Originally the frontend was written and completed in vanilla JavaScript, but I ended up rewriting it in React for my own sanity.
My reasoning for using Flask over Node and Express which I felt more comfortable with was because of how straightforwards
numpy made matrix manipulation. 
  - Redis seemed like a very simple solution to the issue of how to cache large computed image SVDs.
  - Since I've primarily developed on Windows up until this point, it seemed like a great opportunity to get my feet wet with Linux
through WSL2, since Redis isn't supported on Windows. 
  - While I was there, I also figured I might as well learn Docker since I had been reading about
platform agnostic development and it sounded like something cool to explore. 
  - In practice, using Docker for this project might have
been overkill, especially since in deployment, the Redis server is accessed through the Heroku add-on rather than a separate container,
but it was a great learning experience!
