import Web3 from "web3";
import ERC20Utils from "./utils/ERC20";
declare class Ethut {
    private _web3;
    erc20: ERC20Utils;
    constructor(provider: string | Web3);
}
export default Ethut;
