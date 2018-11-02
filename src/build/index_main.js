'use strict';

var StellarSdk = require('./index');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('http://172.16.0.199:8000', {allowHttp: true, timeout: 100000000000000});

//var server = new StellarSdk.Server('http://127.0.0.1:8000');

var sourceKeys = StellarSdk.Keypair.fromSecret('SDADVTYEA4S3WTDH7APCDAJTA67LHNNGH5KNAZO7CN3TGYJBW646H4ZC');
var destinationId = 'GDVFD5MG7BGQZZSU27FQJURB7JQIHDEP3N35PR267UIMH22EWJM7JZIV';
// Transaction will hold a built transaction we can resubmit if the result is unknown.
var transaction;

var data = {
  "funcName": "add",
  "contractParams" : "5,8"
};
// data["funcName"] = "add";
// data["contractParams"] = ["5", "6"];

// First, check to make sure that the destination account exists.
// You could skip this, but if the account does not exist, you will be charged
// the transaction fee when the transaction fails.
server.loadAccount(destinationId)
// If the account is not found, surface a nicer error message for logging.
.catch(StellarSdk.NotFoundError, function (error) {
  throw new Error('The destination account does not exist!');
})
// If there was no error, load up-to-date information on your account.
.then(function () {
  return server.loadAccount(sourceKeys.publicKey());
})
.then(function (sourceAccount) {
  // Start building the transaction.
  transaction = new StellarSdk.TransactionBuilder(sourceAccount)
  .addOperation(StellarSdk.Operation.checkContract({
    isContract: "1"
  }))
  .addOperation(StellarSdk.Operation.createContract({
    startingBalance: "10",
    contractAddr: "http://172.16.0.199:3000/hello.txt",
    data: data
  }))
  // .addOperation(StellarSdk.Operation.payment({
  //   destination: "GASOCNHNNLYFNMDJYQ3XFMI7BYHIOCFW3GJEOWRPEGK2TDPGTG2E5EDW",
  //   asset: StellarSdk.Asset.native(),
  //   amount: "100.50",  // 100.50 XLM
  //   contract: 1
  // }))
  // A memo allows you to add your own metadata to a transaction. It's
  // optional and does not affect how Stellar treats the transaction.
  .addMemo(StellarSdk.Memo.text('Test Transaction')).build();
  // Sign the transaction to prove you are actually the person sending it.
  transaction.sign(sourceKeys);
  // And finally, send it off to Stellar!
  return server.submitTransaction(transaction);
}).then(function (result) {
  console.log('Success! Results:', result);
}).catch(function (error) {
  console.error('Something went wrong!', error);
  // If the result is unknown (no response body, timeout etc.) we simply resubmit
  // already built transaction:
  // server.submitTransaction(transaction);
});