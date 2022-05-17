"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ERC20Utils = /** @class */ (function () {
    function ERC20Utils(web3) {
        var _this = this;
        /**
         * @param contractAddress
        */
        this.getSymbol = function (contractAddress) { return __awaiter(_this, void 0, void 0, function () {
            var abi, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        abi = new this._web3.eth.Contract([{
                                inputs: [],
                                name: "symbol",
                                outputs: [{ internalType: "string", name: "", type: "string" }],
                                stateMutability: "view",
                                type: "function"
                            }], contractAddress);
                        return [4 /*yield*/, abi.methods.symbol().call().catch(function () { return undefined; })];
                    case 1:
                        symbol = _a.sent();
                        if (!symbol)
                            throw new Error('Invalid contract address or non-standart abi');
                        return [2 /*return*/, symbol];
                }
            });
        }); };
        /**
         * @param {string} contractAddress
         * @returns decimals number
        */
        this.getDecimals = function (contractAddress) { return __awaiter(_this, void 0, void 0, function () {
            var abi, decimals, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        abi = new this._web3.eth.Contract([{
                                inputs: [],
                                name: "decimals",
                                outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
                                stateMutability: "view",
                                type: "function"
                            }], this._web3.utils.toChecksumAddress(contractAddress));
                        _a = Number;
                        return [4 /*yield*/, abi.methods.decimals().call().catch(function () { return undefined; })];
                    case 1:
                        decimals = _a.apply(void 0, [_b.sent()]);
                        if (isNaN(decimals))
                            throw new Error('Invalid contract address or non-standart abi');
                        return [2 /*return*/, decimals];
                }
            });
        }); };
        /**
         * @param {string} contractAddress
         * @param {string} holderAddress
        */
        this.balanceOf = function (contractAddress, holderAddress) { return __awaiter(_this, void 0, void 0, function () {
            var contract, balance, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contract = new this._web3.eth.Contract([{
                                inputs: [{ internalType: "address", name: "", type: "address" }],
                                name: "balanceOf",
                                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                                stateMutability: "view",
                                type: "function",
                            }], contractAddress);
                        if (!this._NETWORK_COINS.includes(contractAddress)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._web3.eth.getBalance(holderAddress).catch(function () { return undefined; })];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, contract.methods.balanceOf(holderAddress).call().catch(function () { return undefined; })];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        balance = _a;
                        if (!balance || isNaN(Number(balance)))
                            throw new Error('Invalid contract address or non-standart abi');
                        return [2 /*return*/, String(balance)];
                }
            });
        }); };
        /**
         * @param recipient - Contract address for interaction
         * @param address - Address of the owner of the tokens
         * @param contract - The contract of the token that will be asked for get allowance
        */
        this.allowance = function (recipient, address, contract) { return __awaiter(_this, void 0, void 0, function () {
            var abi, allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._NETWORK_COINS.includes(contract))
                            return [2 /*return*/, "115792089237316195423570985008687907853269984665640564039457584007913129639935"];
                        abi = new this._web3.eth.Contract([{ inputs: [
                                    { internalType: "address", name: "owner", type: "address" },
                                    { internalType: "address", name: "spender", type: "address" }
                                ],
                                name: "allowance",
                                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                                stateMutability: "view", type: "function"
                            }], contract);
                        return [4 /*yield*/, abi.methods.allowance(address, recipient).call().catch(function () { return undefined; })];
                    case 1:
                        allowance = _a.sent();
                        if (allowance || isNaN(Number(allowance)))
                            throw new Error('Invalid contract address or non-standart abi');
                        return [2 /*return*/, String(allowance)];
                }
            });
        }); };
        this._web3 = web3;
        this._NETWORK_COINS = [
            '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            '0x0000000000000000000000000000000000000000'
        ];
    }
    return ERC20Utils;
}());
;
exports.default = ERC20Utils;
//# sourceMappingURL=ERC20.js.map