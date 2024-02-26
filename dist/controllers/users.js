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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserInfo = exports.getUserInfo = exports.getAllUserInfo = void 0;
const users_1 = require("../services/users");
const getAllUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, users_1.getAllUsers)();
    return res.status(200).json(result);
});
exports.getAllUserInfo = getAllUserInfo;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, users_1.getUserInfoById)(id);
    return res.status(200).json(result);
});
exports.getUserInfo = getUserInfo;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield (0, users_1.updateUserInfoById)(id, data);
    return res.status(200).json(result);
});
exports.updateUserInfo = updateUserInfo;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, users_1.deleteUserInfoById)(id);
    return res.status(200).json(result);
});
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=users.js.map