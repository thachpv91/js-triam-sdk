---
title: submitTransaction()
---

## Overview

You can build a transaction locally (see [this example](../readme.md#building-transactions)), but after you build it you have to submit it to the Stellar network.  js-triam-sdk has a function `submitTransaction()` that sends your transaction to the Horizon server (via the [`transactions_create`] endpoint) to be broadcast to the Stellar network.

## Methods

| Method | Horizon Endpoint | Param Type | Description |
| --- | --- | --- | --- |
| `submitTransaction(Transaction)` | | Submits a transaction to the network.

## Example

```js
var TriamSdk = require('triam-sdk')
var server = new TriamSdk.Server('https://horizon-testnet.domain.xyz');

var transaction = new TriamSdk.TransactionBuilder(account)
        // this operation funds the new account with XLM
        .addOperation(TriamSdk.Operation.payment({
            destination: "GASOCNHNNLYFNMDJYQ3XFMI7BYHIOCFW3GJEOWRPEGK2TDPGTG2E5EDW",
            asset: TriamSdk.Asset.native(),
            amount: "20000000"
        }))
        .build();

transaction.sign(TriamSdk.Keypair.fromSeed(seedString)); // sign the transaction

server.submitTransaction(transaction)
    .then(function (transactionResult) {
        console.log(transactionResult);
    })
    .catch(function (err) {
        console.error(err);
    });
```
