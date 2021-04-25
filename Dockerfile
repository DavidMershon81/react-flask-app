# Use the Python3.8-slim-buster image
FROM python:3.8-slim-buster

RUN apt-get update && apt-get install -y git python3-dev gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build
COPY /build /build/

WORKDIR /app
COPY /api /app/

RUN pip install -r requirements.txt

CMD ["uwsgi", "app.ini"]
