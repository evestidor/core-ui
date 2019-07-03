FROM python:3.7-alpine

WORKDIR /app

ENV PYTHONUNBUFFERED 1

RUN apk add --no-cache bash git

COPY Pipfile* /app/

RUN pip install pipenv

RUN pipenv install --system --deploy --dev

COPY . .

RUN SECRET_KEY=secret python manage.py collectstatic --no-input

CMD python manage.py runserver 0.0.0.0:8000
