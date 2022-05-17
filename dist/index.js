import Web3 from "web3";
import ERC20Utils from "./utils/ERC20";
class Ethut {
    constructor(provider) {
        this._web3 = typeof provider == 'string' ? new Web3(provider) : provider;
        this.erc20 = new ERC20Utils(this._web3);
    }
}
export default Ethut;
