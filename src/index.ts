import Web3 from "web3";

import ERC20Utils from "./utils/ERC20";

export class Ethut{
    private  _web3;

    public erc20;

    constructor(provider: string | Web3){
        this._web3 =  typeof provider == 'string' ? new Web3(provider) : provider;
        this.erc20 = new ERC20Utils(this._web3);
    }
}