# node-samples
A place for me to put test code for node

## index.js
A simple node server that does mock sync and async requests.

## run.sh
Make sure you've [installed Node](https://nodejs.org/en/download/) first.  Then run:

```
chmod +x run.sh
./run.sh
```

To run the sample.  It will send five async requests followed by five sync requests.  You should notice that the sync requests take way longer to complete.
