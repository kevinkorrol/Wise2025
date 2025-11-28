FROM python:3.11-slim

WORKDIR /app

COPY app.py .

RUN pip install prometheus_client

CMD ["python", "app.py"]
