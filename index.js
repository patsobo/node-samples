'use strict'
const http = require('http')

// TODO return start time and end time in response
// NOTE: if you run this in chrome in parallel tabs async won't work like you expect.  It'll queue them up one by one for some reason
const blockEventLoop = (duration) => {
    const endTime = Date.now() + (duration);

    while (Date.now() < endTime) {
        Math.random();
    }
};

var syncRequestNum = 0;
var asyncRequestNum = 0;
var startTime = new Date();

// reference: https://github.com/workshopper/learnyounode/blob/master/exercises/http_json_api_server/solution/solution.js
const server = http.createServer(function (req, res) {
    let resBody
    console.log(req.url)

    if (/^\/async/.test(req.url)) {
        // ""asynchronous"" database query (5 seconds)
        setTimeout(() => {
            console.log('Finished async call ' + asyncRequestNum);
            var elapsed = new Date() - startTime
            resBody = {
                async: asyncRequestNum,
                finishedAt: elapsed
            }
            asyncRequestNum = asyncRequestNum + 1;
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(resBody))
        }, 5000);
    } else if (/^\/sync/.test(req.url)) {
        // "synchronous"" database query (5 seconds)
        blockEventLoop(5000);
        console.log('Finished sync call ' + syncRequestNum);
        var elapsed = new Date() - startTime
        resBody = {
            sync: syncRequestNum,
            finishedAt: elapsed
        }
        syncRequestNum = syncRequestNum + 1;
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(resBody))
    } else {
        res.writeHead(404)
        res.end()
    }
});
server.listen(8080);
