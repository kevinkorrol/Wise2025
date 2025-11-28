from prometheus_client import start_http_server, Gauge
import json
import time
import requests

BACKEND_URL = "http://localhost:8080/metrics"

# Batch-level metrics
total_amount = Gauge('batch_total_amount', 'Total money in a batch',
                     ['origin_currency', 'destination_currency'])
num_transactions = Gauge('batch_num_transactions', 'Number of transactions in a batch',
                         ['origin_currency', 'destination_currency'])

# User-level metric
user_money = Gauge('user_money', 'User money',
                   ['origin_currency', 'destination_currency', 'name'])

start_http_server(8081)

while True:
    try:
        # response = requests.get(BACKEND_URL, timeout=3)
        # data = response.json()
        with open("mock_data.json") as f:
            data = json.load(f)

        for batch in data:

            origin = batch['MinimumAmount']['currency']
            dest = batch['TargetCurrency']

            total = 0
            count = 0

            for trans in batch['Transactions']:
                name = trans['Name']
                amount = trans['Amount']

                # Update per-user metric
                user_money.labels(
                    origin_currency=origin,
                    destination_currency=dest,
                    name=name,
                ).set(amount)

                total += amount
                count += 1

            # Update batch-level metrics
            total_amount.labels(
                origin_currency=origin,
                destination_currency=dest
            ).set(total)

            num_transactions.labels(
                origin_currency=origin,
                destination_currency=dest
            ).set(count)

    except Exception as e:
        print(f"Error fetching data: {e}")

    time.sleep(5)
