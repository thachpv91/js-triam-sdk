# js-triam-sdk

js-triam-sdk is a Javascript library for communicating with a [Triam Network Horizon server]. It is used for building Stellar apps either on Node.js or in the browser.

It provides:
- a networking layer API for Horizon endpoints.
- facilities for building and signing transactions, for communicating with a Stellar Horizon instance, and for submitting transactions or querying network history.

### js-triam-sdk vs js-stellar-base

js-triam-sdk is a high-level library that serves as client side API for [Horizon]. This library makes extensive use of the lower-level [js-stellar-base](https://github.com/stellar/js-stellar-base) and exposes js-stellar-base classes via its export object.  js-stellar-base can be used as a standalone library for creating Stellar primitive constructs via XDR helpers and wrappers. js-stellar-base doesn't depend on connecting to Horizon.

js-triam-sdk exposes all js-stellar-base classes so you don't have to install js-stellar-base along js-triam-sdk.

## Quick start

Using npm to include js-triam-sdk in your own project:
```shell
npm install --save triam-sdk
```

## Install

### To use as a module in a Node.js project
1. Install it using npm:
  ```shell
  npm install --save triam-sdk
  ```

2. require/import it in your JavaScript:
  ```js
  var TriamSdk = require('triam-sdk');
  ```

### To develop and test js-triam-sdk itself
1. Clone the repo:
  ```shell
  git clone https://github.com/triamnetwork/js-triam-sdk.git
  ```

2. Install dependencies inside js-triam-sdk folder:
  ```shell
  cd js-triam-sdk
  npm install
  ```

## Testing
To run all tests:
```shell
gulp test
```

To run a specific set of tests:
```shell
gulp test:node
gulp test:browser
```

## Documentation
Documentation for this repo lives in [Developers site](https://triamnetwork.github.io/triam-docs).

npm >=2.13.0 required.
Read more about [npm version](https://docs.npmjs.com/cli/version).

## License
js-stellar-sdk is licensed under an Apache-2.0 license. See the [LICENSE](https://github.com/stellar/js-stellar-sdk/blob/master/LICENSE) file for details.
