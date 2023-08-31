FROM python:3.10

WORKDIR /code

COPY classe /code

COPY sql.py /code

COPY requirements.txt /code

RUN pip3.10 install --no-cache-dir --upgrade -r /code/requirements.txt

COPY api.py /code

CMD [ "uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000" ]