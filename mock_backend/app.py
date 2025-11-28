from prometheus_client import start_http_server, Gauge
import json
import time

g = Gauge('mock_cpu_usage', 'Mock CPU usage metric')
r = Gauge('mock_requests_total', 'Mock requests total')

start_http_server(8081)

while True:
    with open("mock_data.json") as f:
        data = json.load(f)
    g.set(data.get("cpu_usage", 0))
    r.set(data.get("requests_total", 0))
    time.sleep(1)
