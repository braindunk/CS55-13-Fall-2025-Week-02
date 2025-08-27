// CS55-13-Fall-2025-Week-02
// rats

// use http package (shared code) fron node.js
const myhttp = require("http");

// load the core node filesystem (fs) module, using js promises instead of callbacks
const fs = require("fs").promises;

// create a function to respond to http requests
const requestListener = function( myrequest, myresponse ) {
    console.log( myrequest.url );

    if ( myrequest.url === '/' ) {
        // check request url, if root, return html file
        // special variable __dirname has absolute path of where node code is running
        fs.readFile(__dirname + "/page.html")
            .then(
                // function(contents) {...}
                contents => {
                    // set http response header entry
                    myresponse.setHeader("Content-Type", "text/html; charset=UTF-8");
                    // return 200 OK http status code
                    myresponse.writeHead(200);
                    // send back file contents + close response
                    myresponse.end(contents);
                }
            );
    } else {
        // if request url not root, return json file
        fs.readFile(__dirname + "/data.json")
            .then(
                contents => {
                    // set http response header entry
                    myresponse.setHeader("Content-Type", "application/json; charset=UTF-8");
                    // return 200 OK http status code
                    myresponse.writeHead(200);
                    // send back file contents + close response
                    myresponse.end(contents);
                }
            );
    }

};

// use http package createServer()
// that runs a web server
let myserver = myhttp.createServer(
    // createServer() uses our function to run when a request comes in
    requestListener
);

// ask http to start listening on a tcp port for incoming http requests
// listen() takes 2 args: 1: tcp port #, string of the ip address to listen (0.0.0.0)
// http://127.0.0.1:8080/
myserver.listen( 8080, "127.0.0.1" );