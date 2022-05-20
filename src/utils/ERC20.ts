import Web3 from "web3";

class ERC20Utils{
    private  _web3;
    private _NETWORK_COINS;

    /**
     * @param contractAddress 
    */
     getSymbol = async (contractAddress: string) => {
        const abi = new this._web3.eth.Contract([{
            inputs: [],
            name: "symbol",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function"
        }], this._web3.utils.toChecksumAddress(contractAddress));

        const symbol = await abi.methods.symbol().call().catch(() => undefined);
        if (!symbol) throw new Error('Invalid contract address or non-standart abi');

        return symbol;
    };

    /**
     * @param {string} contractAddress
     * @returns decimals number
    */
    getDecimals =  async (contractAddress: string) => {
        if (this._NETWORK_COINS.includes(contractAddress.toLocaleLowerCase())) return 18;
        const abi = new this._web3.eth.Contract([{
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function"
        }], this._web3.utils.toChecksumAddress(contractAddress));

        const decimals = Number(await abi.methods.decimals().call().catch(() => undefined));
        if (isNaN(decimals)) throw new Error('Invalid contract address or non-standart abi');

        return decimals;
    };

    /**
     * @param {string} contractAddress
     * @param {string} holderAddress
    */
    balanceOf = async (contractAddress: string, holderAddress: string) => {
        const contract = new this._web3.eth.Contract([{
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        }], this._web3.utils.toChecksumAddress(contractAddress));

        const balance = this._NETWORK_COINS.includes(contractAddress.toLocaleLowerCase())
            ? await this._web3.eth.getBalance(holderAddress).catch(() => undefined)
            : await contract.methods.balanceOf(holderAddress).call().catch(() => undefined);
        
        if (!balance || isNaN(Number(balance))) throw new Error('Invalid contract address or non-standart abi');

        return String(balance);
    };

    /**
     * @param recipient - Contract address for interaction
     * @param address - Address of the owner of the tokens
     * @param contract - The contract of the token that will be asked for get allowance
    */
    allowance = async (recipient: string, address: string, contract: string) => {
        if (this._NETWORK_COINS.includes(contract)) return "115792089237316195423570985008687907853269984665640564039457584007913129639935";
        const abi = new this._web3.eth.Contract([{ inputs: 
            [
                { internalType: "address", name: "owner", type: "address" },
                { internalType: "address", name: "spender", type: "address" }
            ],
            name: "allowance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view", type: "function"
        }], this._web3.utils.toChecksumAddress(contract));

        const allowance = await abi.methods.allowance(address, recipient).call().catch(() => undefined);
        if (!allowance || isNaN(Number(allowance))) throw new Error('Invalid contract address or non-standart abi');
    
        return String(allowance);
    };

    /**
     * @param recipient - Contract address for interaction
     * @param contract - The contract of the token that will be asked for get allowance
     * @param amount - amount in string numbers
     * @returns input data for sign
     */
    approve = (recipient: string, contract: string, amount: string='115792089237316195423570985008687907853269984665640564039457584007913129639935') => {
        if (this._NETWORK_COINS.includes(contract)) throw new Error(`Network coin does not require approving`);
        const abi = new this._web3.eth.Contract([{ 
            inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" }],
            name: "approve",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function" 
        }], this._web3.utils.toChecksumAddress(contract));

        const approve = abi.methods.approve(
            this._web3.utils.toChecksumAddress(recipient),
            this._web3.utils.toHex(amount)
        );

        return approve.encodeABI() as string;
    }

    constructor(web3: Web3){
        this._web3 = web3;
        this._NETWORK_COINS = [
            '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            '0x0000000000000000000000000000000000000000'
        ]
    }
};

export default ERC20Utils;