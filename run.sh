# Run the node server, store the pid so we can stop it later
echo "RUNNING SERVER, STARTING TIMER AT 0"
node index.js
pid=$!

echo "DOING ASYNC NOW..."
for i in {1..5}
do
    # Note: the '&' just means to run the command in the background - that way we can send all curl requests at once
    curl -s "localhost:8080/async" &
done

echo "ASYNC REQUESTS SENT, WAITING FOR RESPONSES..."
sleep 10

echo "STARTING SYNC..."
for i in {1..5}
do
    curl -s "localhost:8080/sync" &
done

echo "SYNC REQUESTS SENT, WAITING FOR RESPONSES..."
sleep 30

echo "COMPLETED ALL REQUESTS, SHUTTING DOWN SERVER..."
kill -9 $pid
