import Web3 from "web3";
declare class ERC20Utils {
    private _web3;
    private _NETWORK_COINS;
    /**
     * @param contractAddress
    */
    getSymbol: (contractAddress: string) => Promise<any>;
    /**
     * @param {string} contractAddress
     * @returns decimals number
    */
    getDecimals: (contractAddress: string) => Promise<number>;
    /**
     * @param {string} contractAddress
     * @param {string} holderAddress
    */
    balanceOf: (contractAddress: string, holderAddress: string) => Promise<string>;
    /**
     * @param recipient - Contract address for interaction
     * @param address - Address of the owner of the tokens
     * @param contract - The contract of the token that will be asked for get allowance
    */
    allowance: (recipient: string, address: string, contract: string) => Promise<string>;
    constructor(web3: Web3);
}
export default ERC20Utils;
