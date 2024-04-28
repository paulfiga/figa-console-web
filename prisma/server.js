var http = require('http');

var server = http.createServer(function (req, res) {
    var body = (async () => {
        try {
            var body = "hello world";
            var content_length = body.length;
            res.writeHead(200, {
                'Content-Length': content_length,
                'Content-Type': 'text/plain' });
            res.end(body);
        } catch (error) {
            console.log(error.response.body);
        }
    })();
 });
 
server.listen(8080);