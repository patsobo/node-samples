# TODO make this a little more intuitive

echo "DOING ASYNC NOW..."

for i in {1..5}
do
    curl -s "localhost:8080/async" &
done

echo "ASYNC REQUESTS SENT"
sleep 10
echo "STARTING SYNC..."

for i in {1..5}
do
    curl -s "localhost:8080/sync" &
done

echo "SYNC REQUESTS SENT"
sleep 30

