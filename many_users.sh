echo "DOING ASYNC NOW..."

for i in {1..5}
do
    curl -s "localhost:8080/async" &
done

echo "ASYNC REQUESTS FINISHED"
echo "STARTING SYNC..."

for i in {1..5}
do
    curl -s "localhost:8080/sync" &
done

echo "SYNC FINISHED"
