---
title: ledgers()
---

## Overview

In order to read information about ledgers from a Horizon server, the [`server`](./server.md) object provides the `ledgers()` function. `ledgers()` returns an `TransactionCallBuilder` class, an extension of the [`CallBuilder`](./call_builder.md) class.

## Methods

| Method | Horizon Endpoint | Param Type | Description |
| --- | --- | --- | --- |
| `ledgers()` | | | Access all ledgers. |
| `.ledger(ledgerSeq)` | | `string` | Pass in the sequence of the ledger you're interested in to access its details. |
| `.limit(limit)` | | `integer` | Limits the number of returned resources to the given `limit`.|
| `.cursor("token")` | | `string` | Return only resources after the given paging token. |
| `.order({"asc" or "desc"})` | | `string` |  Order the returned collection in "asc" or "desc" order. |
| `.call()` | | | Triggers a HTTP Request to the Horizon server based on the builder's current configuration.  Returns a `Promise` that resolves to the server's response.  For more on `Promise`, see [these docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).|
| `.stream({options})` | | object of [properties](https://developer.mozilla.org/en-US/docs/Web/API/EventSource#Properties) | Creates an `EventSource` that listens for incoming messages from the server.  URL based on builder's current configuration.|

## Examples

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('https://horizon-testnet.domain.xyz');

server.ledgers()
  .limit(15)
  .order("desc")
  .call()
  .then(function (ledgerResult) {
    console.log(ledgerResult);
  })
  .catch(function (err) {
    console.error(err);
  })
```
