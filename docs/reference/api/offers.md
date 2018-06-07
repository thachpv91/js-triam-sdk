---
title: offers()
---

## Overview

In order to read information about offers from a Horizon server, the [`server`](./server.md) object provides the `offers()` function. `offers()` returns an `OfferCallBuilder` class, an extension of the [`CallBuilder`](./call_builder.md) class.

## Methods

| Method | Horizon Endpoint | Param Type | Description |
| --- | --- | --- | --- |
| `offers("accounts", address)` | | `string`, `string` | Access all offers for a given `address`. |
| `.limit(limit)` | | `integer` | Limits the number of returned resources to the given `limit`.|
| `.cursor("token")` | | `string` | Return only resources after the given paging token. |
| `.order({"asc" or "desc"})` | | `string` |  Order the returned collection in "asc" or "desc" order. |
| `.call()` | | | Triggers a HTTP Request to the Horizon server based on the builder's current configuration.  Returns a `Promise` that resolves to the server's response.  For more on `Promise`, see [these docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).|
| `.stream({options})` | | object of [properties](https://developer.mozilla.org/en-US/docs/Web/API/EventSource#Properties) | Creates an `EventSource` that listens for incoming messages from the server.|

## Examples

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('https://horizon-testnet.domain.xyz');

server.offers("accounts", "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ")
  .call()
  .then(function (offerResult) {
    console.log(offerResult);
  })
  .catch(function (err) {
    console.error(err);
  })
```
