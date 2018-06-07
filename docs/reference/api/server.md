---
title: Server
---

## Overview

The `server` object handles a network connection to a Horizon server.  It provides methods that makes requests to that Horizon server easy.

## Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `object` | No | The server configuration |
| `config.secure` | `boolean` | No | If `true`, establishes a connection with HTTPS instead of HTTP.  Defaults `false`.|
| `config.hostname` | `string` | No | The hostname of the Horizon server.  Defaults to `localhost`.|
| `config.port` | `integer` | No | The port of the Horizon server to connect to.  Defaults to 3000.|

## Methods

| Method | Params | Description |
| --- | --- | --- |
| `accounts` | None | Returns an `AccountCallBuilder` with methods to query account endpoints. |
| `ledgers` | None | Returns a `LedgerCallBuilder` with methods to query ledger endpoints. |
| `transactions` | None | Returns a `TransactionCallBuilder` with methods to query transaction endpoints. |
| `operations` | None | Returns an `OperationsCallBuilder` with methods to query operation endpoints.|
| `payments` | None | Returns a `PaymentCallBuilder` with methods to query payment endpoints. |
| `effects` | None | Returns an `EffectCallBuilder` with methods to query effect endpoints.|
| `offers` | `resource`, `resourceParams` | Returns a `OfferCallBuilder` that queries the offer endpoint.  This requires "accounts" as the `resource` and the address of the account with the offers you're interested in as `resourceParams`. |
| `orderbook` | `selling`, `buying` | Returns a `OrderbookCallBuilder` that queries the orderbook endpoint.  Requires the `Asset`s that others are `selling` or `buying` as parameters. |


## Examples

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('https://horizon-testnet.domain.xyz');

server.accounts()
  ...
```
