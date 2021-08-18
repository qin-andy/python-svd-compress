# [python-svd-compress](https://fierce-plateau-92798.herokuapp.com)
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
  2. Ensure docker and docker-compose are installed
  3. Run ``docker-compose up`` to set up Flask backend and Redis server on ``http://localhost:5000``
  4. Run ``cd frontend`` and ``yarn start`` for the React live development server on ``http://localhost:3000`` with requests proxied to the Flask backend

Note that there are 2. ``Dockerfile`` with no extension is used for deployment on Heroku with a multistage build to serve
the frontend as well as configured ports as environment variables, [as described in the Heroku documentation.](https://devcenter.heroku.com/articles/container-registry-and-runtime)
``Dockerfile.dev`` can be used as an alternative to docker-compose, although the Redis server must be started separately.

### Deployment
A brief summary, see [the Heroku devcenter](https://devcenter.heroku.com/articles/container-registry-and-runtime) for more details. Assuming an
app has already been created:
  1. Run ``docker build -t svd-compress .`` to build the image from the Dockerfile at the root of the directory
  2. Run ``heroku container:login`` then ``heroku container:push web`` and wait for the image and container to build
  3. Run ``heroku container:release web`` to deploy and ``heroku logs --tail`` to monitor for any issues
