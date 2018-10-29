import {CallBuilder} from "./call_builder";

/**
 * Creates a new {@link ContractStateCallBuilder} pointed to server defined by serverUrl.
 * Do not create this object directly, use {@link Server#getstate}.
 *
 * @class ContractStateCallBuilder
 * @extends CallBuilder
 * @constructor
 * @extends CallBuilder
 * @param {string} serverUrl Stellar-core server URL.
 */
export class ContractStateCallBuilder extends CallBuilder {
    constructor(serverUrl) {
        super(serverUrl);
        this.url.segment('getstate');
    }

    /**
     * Returns information and links relating to a single account.
     * The balances section in the returned JSON will also list all the trust lines this account has set up.
     *
     * @param {string} id For example: `GDGQVOKHW4VEJRU2TETD6DBRKEO5ERCNF353LW5WBFW3JJWQ2BRQ6KDD`
     * @returns {ContractStateCallBuilder}
     */
    contractId(id) {
      this.filter.push(['accounts', id]);
      return this;
    }
}
