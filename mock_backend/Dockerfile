FROM python:3.11-slim

WORKDIR /app

COPY app.py .

RUN pip install prometheus_client requests

CMD ["python", "app.py"]
