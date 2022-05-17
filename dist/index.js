"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = __importDefault(require("web3"));
var ERC20_1 = __importDefault(require("./utils/ERC20"));
var Ethut = /** @class */ (function () {
    function Ethut(provider) {
        this._web3 = typeof provider == 'string' ? new web3_1.default(provider) : provider;
        this.erc20 = new ERC20_1.default(this._web3);
    }
    return Ethut;
}());
exports.default = Ethut;
//# sourceMappingURL=index.js.map