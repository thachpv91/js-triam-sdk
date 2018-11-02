'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');

/**
 * Server handles the network connection to a [Stellar-core] (http://localhost:11626)
 * @constructor
 */

var CoreConnection = exports.CoreConnection = function () {
    function CoreConnection() {
        _classCallCheck(this, CoreConnection);
    }

    /**
    * get balance by account id from account table
    * @param {string} accountId - The account to load.
    * @returns {string} balance
    */


    _createClass(CoreConnection, [{
        key: 'getBalance',
        value: function getBalance(accountId) {
            return https.get('http://localhost:11626/getbalance?id=' + accountId, function (resp) {
                var myJSON = JSON.stringify(resp);
                obj = JSON.parse(myJSON);

                return obj.balance;
            }).on("error", function (err) {
                console.log("Error: " + err.message);
            });
        }

        /**
        * get state by contract id from contractstate table
        * @param {string} contractId - The account to load.
        * @returns {string} state
        */

    }, {
        key: 'getState',
        value: function getState(contractId) {
            return https.get('http://localhost:11626/getstate?id=' + contractId, function (resp) {
                var myJSON = JSON.stringify(resp);
                obj = JSON.parse(myJSON);

                return obj.state;
            }).on("error", function (err) {
                console.log("Error: " + err.message);
            });
        }

        /**
        * get number of the last ledger
        * @returns {string} num
        */

    }, {
        key: 'getLedger',
        value: function getLedger() {

            return https.get('http://localhost:11626', function (resp) {
                var myJSON = JSON.stringify(resp);
                obj = JSON.parse(myJSON);

                return obj.num;
            }).on("error", function (err) {
                console.log("Error: " + err.message);
            });
        }
    }]);

    return CoreConnection;
}();