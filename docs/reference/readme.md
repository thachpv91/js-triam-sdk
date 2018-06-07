---
title: Overview
---
The JavaScript Triam Network SDK facilitates integration with the [Triam Horizon API server] and submission of Stellar transactions, either on Node.js or in the browser. It has two main uses: [querying Horizon](#querying-horizon) and [building, signing, and submitting transactions to the Stellar network](#building-transactions).

[Building and installing js-triam-sdk](https://github.com/triamnetwork/js-triam-sdk)<br>
[Examples of using js-triam-sdk](./examples.md)

# Querying Horizon
js-triam-sdk gives you access to all the endpoints exposed by Horizon.

## Building requests
js-triam-sdk uses the [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) to create the requests to send
to Horizon. Starting with a [server](https://triamnetwork.github.io/triam-sdk/Server.html) object, you can chain methods together to generate a query.
```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('https://horizon-testnet.domain.xyz');
// get a list of transactions that occurred in ledger 1400
server.transactions()
    .forLedger(1400)
    .call().then(function(r){ console.log(r); });

// get a list of transactions submitted by a particular account
server.transactions()
    .forAccount('GASOCNHNNLYFNMDJYQ3XFMI7BYHIOCFW3GJEOWRPEGK2TDPGTG2E5EDW')
    .call().then(function(r){ console.log(r); });
```

Once the request is built, it can be invoked with `.call()` or with `.stream()`. `call()` will return a
[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to the response given by Horizon.

## Streaming requests
Many requests can be invoked with `stream()`. Instead of returning a promise like `call()` does, `.stream()` will return an `EventSource`.
Horizon will start sending responses from either the beginning of time or from the point specified with `.cursor()`.

For example, to log instances of transactions from a particular account:

```javascript
var TriamSdk = require('triam-sdk')
var server = new TriamSdk.Server('https://horizon-testnet.domain.xyz');
var lastCursor=0; // or load where you left off

var txHandler = function (txResponse) {
    console.log(txResponse);
};

var es = server.transactions()
    .forAccount(accountAddress)
    .cursor(lastCursor)
    .stream({
        onmessage: txHandler
    })
```

## Handling responses

### XDR
The transaction endpoints will return some fields in raw [XDR].
form. You can convert this XDR to JSON using the `.fromXDR()` method.

An example of re-writing the txHandler from above to print the XDR fields as JSON:

```javascript
var txHandler = function (txResponse) {
    console.log( JSON.stringify(TriamSdk.xdr.TransactionEnvelope.fromXDR(txResponse.envelope_xdr, 'base64')) );
    console.log( JSON.stringify(TriamSdk.xdr.TransactionResult.fromXDR(txResponse.result_xdr, 'base64')) );
    console.log( JSON.stringify(TriamSdk.xdr.TransactionMeta.fromXDR(txResponse.result_meta_xdr, 'base64')) );
};

```


### Following links
The links returned with the Horizon response are converted into functions you can call on the returned object.
This allows you to simply use `.next()` to page through results. It also makes fetching additional info, as in the following example, easy:

```js
server.payments()
    .limit(1)
    .call()
    .then(function(response){
        // will follow the transactions link returned by Horizon
        response.records[0].transaction().then(function(txs){
            console.log(txs);
        });
    });
```


# Transactions

## Building transactions

See the [Building Transactions] guide for information about assembling a transaction.

## Submitting transactions
Once you have built your transaction, you can submit it to the Stellar network with `Server.submitTransaction()`.
```js
var TriamSdk = require('triam-sdk')
TriamSdk.Network.useTestNetwork();
var server = new TriamSdk.Server('https://horizon-testnet.domain.xyz');

server
  .loadAccount(publicKey)
  .then(function(account){
  		var transaction = new TriamSdk.TransactionBuilder(account)
  				// this operation funds the new account with XLM
  				.addOperation(TriamSdk.Operation.payment({
  					destination: "GASOCNHNNLYFNMDJYQ3XFMI7BYHIOCFW3GJEOWRPEGK2TDPGTG2E5EDW",
  					asset: TriamSdk.Asset.native(),
  					amount: "20000000"
  				}))
  				.build();

  		transaction.sign(TriamSdk.Keypair.fromSecret(secretString)); // sign the transaction

		return server.submitTransaction(transaction);
  })
  .then(function (transactionResult) {
    console.log(transactionResult);
  })
  .catch(function (err) {
  	console.error(err);
  });
```
