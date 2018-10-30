var http = require('http');
var StellarSdk = require('../src/index');

//create a server object:
http.createServer(function (req, res) {

    // decode req here
    // req is the XDR data
    console.log(req.data);


    var txHandler =  JSON.stringify(StellarSdk.xdr.TransactionEnvelope.fromXDR(req.envelope_xdr, 'base64'));


    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
}).listen(9000);