from prometheus_client import start_http_server, Gauge
import random
import time

# --- Configuration ---
PORT = 8081
UPDATE_INTERVAL_SECONDS = 5
COUNTRIES = ['RSA']
BATCH_IDS = [101, 102]
THRESHOLD = 25000
MIN_GROWTH = 500    # minimum growth per cycle
MAX_GROWTH = 3000   # maximum growth per cycle

# --- Metrics ---
total_amount = Gauge('batch_total_amount', 'Total money in a batch', ['destination_country', 'batch_id'])
num_transactions = Gauge('batch_num_transactions', 'Number of transactions in a batch', ['destination_country', 'batch_id'])

start_http_server(PORT)
print(f"Prometheus metrics exposed on port {PORT}")

# Track current amounts per batch
current_amounts = { (country, batch_id): 0 for country in COUNTRIES for batch_id in BATCH_IDS }

while True:
    for country in COUNTRIES:
        for batch_id in BATCH_IDS:
            key = (country, batch_id)

            # Random growth each cycle
            growth = random.randint(MIN_GROWTH, MAX_GROWTH)
            current_amounts[key] += growth

            # Reset to 0 if threshold reached
            if current_amounts[key] >= THRESHOLD:
                print(f"Threshold reached for {country}-{batch_id}. Resetting to 0...")
                current_amounts[key] = 0

            # Add slight randomness for realism
            display_amount = current_amounts[key] * (1 + random.uniform(-0.05, 0.05))

            # Calculate transaction count
            count = int(display_amount / random.uniform(200, 1000))

            # Update Prometheus metrics
            total_amount.labels(destination_country=country, batch_id=str(batch_id)).set(display_amount)
            num_transactions.labels(destination_country=country, batch_id=str(batch_id)).set(count)

            print(f"{country}-{batch_id}: Amount={display_amount:.2f}, Count={count}")

    time.sleep(UPDATE_INTERVAL_SECONDS)