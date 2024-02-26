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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyToken = exports.createRefreshToken = exports.createToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const saltRounds = 10;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, saltRounds);
});
exports.hashPassword = hashPassword;
const comparePassword = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hashPassword);
});
exports.comparePassword = comparePassword;
const createToken = (data) => {
    return jsonwebtoken_1.default.sign(data, config_1.TOKEN_SECRET_KEY, { expiresIn: '1h' });
};
exports.createToken = createToken;
const createRefreshToken = (data) => {
    return jsonwebtoken_1.default.sign(data, config_1.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });
};
exports.createRefreshToken = createRefreshToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET_KEY);
};
exports.verifyToken = verifyToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.REFRESH_TOKEN_SECRET_KEY);
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=common.js.map