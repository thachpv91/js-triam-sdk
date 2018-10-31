var http = require('http');
var StellarSdk = require('../src/index');

//create a server object:
http.createServer(function (req, res) {

    // decode req here
    // req is the XDR data
    console.log(req.data);


    var txHandler =  JSON.stringify(StellarSdk.xdr.TransactionEnvelope.fromXDR(req.envelope_xdr, 'base64'));
    console.log(txHandler);
    var data = JSON.parse(txHandler);
    var retData = "";

    switch (data.funcName.toString())
    {
        case "CreateContract":
        retData += '{"newState":"64374673huhfjhsjye2y2dsdhsjdh78372hd"}';
        break;
        case "SendAsset":
        retData += '{"newState":"64374673huhfjhsjye2y2dsdhsjdh78372hd"}';
        break;
        case "CallContract":

        break;
        default:


    }



    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(retData); //write a response to the client
    res.end(); //end the response
}).listen(9000);