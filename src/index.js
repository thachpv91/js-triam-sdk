// require('es6-promise').polyfill();

// // stellar-sdk classes to expose
// export * from "./errors";
// export {Config} from "./config";
// export {Server} from "./server";
// export {FederationServer, FEDERATION_RESPONSE_MAX_SIZE} from "./federation_server";
// export {StellarTomlResolver, STELLAR_TOML_MAX_SIZE} from "./stellar_toml_resolver";

// // expose classes and functions from stellar-base
// export * from "stellar-base";

// export default module.exports;
'use strict'

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

function capitalize (str) {
  const firstLetter = str.charAt(0) // we can check what's inside here
  return `${firstLetter.toUpperCase()}${str.slice(1)}`
}

app.get('/:name?', (req, res) => {
  const name = req.params.name ? capitalize(req.params.name) : 'World'
/////////////
var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var sourceKeys = StellarSdk.Keypair
  .fromSecret('SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4');
var destinationId = 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5';
// Transaction will hold a built transaction we can resubmit if the result is unknown.
var transaction;

// First, check to make sure that the destination account exists.
// You could skip this, but if the account does not exist, you will be charged
// the transaction fee when the transaction fails.
server.loadAccount(destinationId)
  // If the account is not found, surface a nicer error message for logging.
  .catch(StellarSdk.NotFoundError, function (error) {
    throw new Error('The destination account does not exist!');
  })
  // If there was no error, load up-to-date information on your account.
  .then(function() {
    return server.loadAccount(sourceKeys.publicKey());
  })
  .then(function(sourceAccount) {
    // Start building the transaction.
    transaction = new StellarSdk.TransactionBuilder(sourceAccount)
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationId,
        // Because Stellar allows transaction in many currencies, you must
        // specify the asset type. The special "native" asset represents Lumens.
        asset: StellarSdk.Asset.native(),
        amount: "10"
      }))
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Stellar treats the transaction.
      .addMemo(StellarSdk.Memo.text('Test Transaction'))
      .build();
    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(sourceKeys);
    // And finally, send it off to Stellar!
    return server.submitTransaction(transaction);
  })
  .then(function(result) {
    console.log('Success! Results:', result);
  })
  .catch(function(error) {
    console.error('Something went wrong!', error);
    // If the result is unknown (no response body, timeout etc.) we simply resubmit
    // already built transaction:
    // server.submitTransaction(transaction);
  });
/////////////
  res.send(`Hello ${name}!`)
})

app.listen(PORT, () => console.log(`App listening on *:${PORT}`))
