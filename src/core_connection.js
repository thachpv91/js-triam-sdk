var http = require('http');

/**
 * Server handles the network connection to a [Stellar-core] (http://localhost:11626)
 * @constructor
 */
export class CoreConnection {

    constructor() {}

    /**
    * get balance by account id from account table
    * @param {string} accountId - The account to load.
    * @returns {string} balance
    */
   getBalance(accountId) {
        return https.get('http://localhost:11626/getbalance?id=' + accountId, (resp) => {
            var myJSON = JSON.stringify(resp);
            obj = JSON.parse(myJSON);

            return obj.balance;
        
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

    /**
    * get state by contract id from contractstate table
    * @param {string} contractId - The account to load.
    * @returns {string} state
    */
   getState(contractId) {
        return https.get('http://localhost:11626/getstate?id=' + contractId, (resp) => {
            var myJSON = JSON.stringify(resp);
            obj = JSON.parse(myJSON);

            return obj.state;
        
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

    /**
    * get number of the last ledger
    * @returns {string} num
    */

   getLedger() {

    return https.get('http://localhost:11626', (resp) => {
        var myJSON = JSON.stringify(resp);
        obj = JSON.parse(myJSON);

        return obj.num;
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

    }

}

