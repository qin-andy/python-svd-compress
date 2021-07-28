FROM node:16-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./frontend/package.json package-lock.json ./
COPY ./frontend/src ./src
COPY ./frontend/public ./public
RUN yarn global add react-scripts
RUN yarn install
RUN yarn build

FROM python:3.8-slim-buster
WORKDIR /code
ENV FLASK_APP=application
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONUNBUFFERED=1
ENV PORT=$PORT
RUN pip install -U pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY --from=build-step /app/build ./frontend/build
EXPOSE 5000
COPY ./application ./application
COPY ./secret_key.txt ./secret_key.txt
CMD flask run -p $PORT