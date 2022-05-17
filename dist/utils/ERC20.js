var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ERC20Utils {
    constructor(web3) {
        /**
         * @param contractAddress
        */
        this.getSymbol = (contractAddress) => __awaiter(this, void 0, void 0, function* () {
            const abi = new this._web3.eth.Contract([{
                    inputs: [],
                    name: "symbol",
                    outputs: [{ internalType: "string", name: "", type: "string" }],
                    stateMutability: "view",
                    type: "function"
                }], contractAddress);
            const symbol = yield abi.methods.symbol().call().catch(() => undefined);
            if (!symbol)
                throw new Error('Invalid contract address or non-standart abi');
            return symbol;
        });
        /**
         * @param {string} contractAddress
         * @returns decimals number
        */
        this.getDecimals = (contractAddress) => __awaiter(this, void 0, void 0, function* () {
            const abi = new this._web3.eth.Contract([{
                    inputs: [],
                    name: "decimals",
                    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
                    stateMutability: "view",
                    type: "function"
                }], this._web3.utils.toChecksumAddress(contractAddress));
            const decimals = Number(yield abi.methods.decimals().call().catch(() => undefined));
            if (isNaN(decimals))
                throw new Error('Invalid contract address or non-standart abi');
            return decimals;
        });
        /**
         * @param {string} contractAddress
         * @param {string} holderAddress
        */
        this.balanceOf = (contractAddress, holderAddress) => __awaiter(this, void 0, void 0, function* () {
            const contract = new this._web3.eth.Contract([{
                    inputs: [{ internalType: "address", name: "", type: "address" }],
                    name: "balanceOf",
                    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                    stateMutability: "view",
                    type: "function",
                }], contractAddress);
            const balance = this._NETWORK_COINS.includes(contractAddress)
                ? yield this._web3.eth.getBalance(holderAddress).catch(() => undefined)
                : yield contract.methods.balanceOf(holderAddress).call().catch(() => undefined);
            if (!balance || isNaN(Number(balance)))
                throw new Error('Invalid contract address or non-standart abi');
            return String(balance);
        });
        /**
         * @param recipient - Contract address for interaction
         * @param address - Address of the owner of the tokens
         * @param contract - The contract of the token that will be asked for get allowance
        */
        this.allowance = (recipient, address, contract) => __awaiter(this, void 0, void 0, function* () {
            if (this._NETWORK_COINS.includes(contract))
                return "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const abi = new this._web3.eth.Contract([{ inputs: [
                        { internalType: "address", name: "owner", type: "address" },
                        { internalType: "address", name: "spender", type: "address" }
                    ],
                    name: "allowance",
                    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                    stateMutability: "view", type: "function"
                }], contract);
            const allowance = yield abi.methods.allowance(address, recipient).call().catch(() => undefined);
            if (allowance || isNaN(Number(allowance)))
                throw new Error('Invalid contract address or non-standart abi');
            return String(allowance);
        });
        this._web3 = web3;
        this._NETWORK_COINS = [
            '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            '0x0000000000000000000000000000000000000000'
        ];
    }
}
;
export default ERC20Utils;
