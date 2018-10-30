import {Ledger as BaseLedger} from "stellar-base";
import forIn from "lodash/forIn";

/**
 * Do not create this object directly, use {@link Server#getLastLedger}.
 *
 * Returns information and links relating to a single account.
 * The balances section in the returned JSON will also list all the trust lines this account has set up.
 * It also contains {@link Ledger} object and exposes it's methods so can be used in {@link TransactionBuilder}.
 *
 * @see [Ledger Details](https://www.stellar.org/developers/horizon/reference/accounts-single.html)
 * @param {string} response Response from horizon account endpoint.
 * @returns {LedgerResponse}
 */
export class LedgerResponse {
    constructor(response) {
        this._baseLedger = new BaseLedger(response.ledger_hash, response.ledger_seq);
        // Extract response fields
        forIn(response, (value, key) => {
            this[key] = value;
        });
    }

    /**
     * Returns Stellar account ID, ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`
     * @returns {string}
     */
    ledgerHash() {
        return this._baseLedger.ledgerHash();
    }

    /**
     * @returns {string}
     */
    ledgerSeq() {
        return this._baseLedger.ledgerSeq();
    }
}
