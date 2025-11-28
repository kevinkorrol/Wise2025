from prometheus_client import start_http_server, Gauge
import json
import time

# Define metrics
total_amount = Gauge('batch_total_amount', 'Total money in a batch', ['destination_country', 'batch_id'])
num_transactions = Gauge('batch_num_transactions', 'Number of transactions in a batch', ['destination_country', 'batch_id'])

start_http_server(8081)

while True:
    try:
        with open("mock_data.json") as f:
            data = json.load(f)
        
        # Group by batch_id and destination_country
        batches = {}
        for tx in data:
            key = (tx['destination_country'], tx['batch_id'])
            if key not in batches:
                batches[key] = {'total': 0, 'count': 0}
            batches[key]['total'] += tx['amount']
            batches[key]['count'] += 1
        
        # Update Prometheus metrics
        for (dest, batch_id), stats in batches.items():
            total_amount.labels(destination_country=dest, batch_id=str(batch_id)).set(stats['total'])
            num_transactions.labels(destination_country=dest, batch_id=str(batch_id)).set(stats['count'])
    except:
        pass
    time.sleep(5)
