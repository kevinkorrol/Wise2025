FROM python:3.11-slim

WORKDIR /app

COPY app.py .
COPY mock_data.json .

RUN pip install prometheus_client

CMD ["python", "app.py"]
