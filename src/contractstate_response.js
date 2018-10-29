import {ContractState as BaseContract} from "stellar-base";
import forIn from "lodash/forIn";

/**
 * Do not create this object directly, use {@link Server#getContractState}.
 *
 * Returns information and links relating to a single account.
 * The balances section in the returned JSON will also list all the trust lines this account has set up.
 * It also contains {@link ContractState} object and exposes it's methods so can be used in {@link TransactionBuilder}.
 *
 * @see [ContractState Details](https://www.stellar.org/developers/horizon/reference/accounts-single.html)
 * @param {string} response Response from horizon account endpoint.
 * @returns {ContractStateResponse}
 */
export class ContractStateResponse {
    constructor(response) {
        this._baseContract = new BaseContract(response.contract_id, response.state);
        // Extract response fields
        forIn(response, (value, key) => {
            this[key] = value;
        });
    }

    /**
     * Returns Stellar account ID, ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`
     * @returns {string}
     */
    contractId() {
        return this._baseAccount.contractId();
    }

    /**
     * @returns {string}
     */
    state() {
        return this._baseAccount.state();
    }
}
