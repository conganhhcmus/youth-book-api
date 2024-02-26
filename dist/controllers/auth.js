"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.resetToken = exports.login = exports.register = void 0;
const auth = __importStar(require("../services/auth"));
const common_1 = require("../constants/common");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield auth.register(data);
    return res.status(201).json(result);
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield auth.login(data);
    // res.cookie(TOKEN_KEY, result.token);
    // res.cookie(REFRESH_TOKEN_KEY, result.refreshToken);
    return res.status(200).json(result);
});
exports.login = login;
const resetToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req['identity'];
    const refreshToken = req.cookies[common_1.REFRESH_TOKEN_KEY];
    const result = yield auth.resetToken(payload, refreshToken);
    // res.cookie(TOKEN_KEY, result.token);
    // res.cookie(REFRESH_TOKEN_KEY, result.refreshToken);
    return res.status(200).json(result.token);
});
exports.resetToken = resetToken;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const newPassword = req.body.newPassword;
    const result = yield auth.resetPassword(data, newPassword);
    // res.cookie(TOKEN_KEY, result.token);
    // res.cookie(REFRESH_TOKEN_KEY, result.refreshToken);
    return res.status(200).json(result);
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.js.map