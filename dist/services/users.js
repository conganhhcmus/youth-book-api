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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserInfoById = exports.updateUserInfoById = exports.getUserInfoById = exports.getAllUsers = void 0;
const error_1 = require("../constants/error");
const users_1 = require("../repositories/users");
const error_2 = require("../types/error");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, users_1.getUsers)();
});
exports.getAllUsers = getAllUsers;
const getUserInfoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_1.getUserById)(id);
    if (!user) {
        throw new error_2.BadRequestError(error_1.USER_NOT_FOUND);
    }
    return user;
});
exports.getUserInfoById = getUserInfoById;
const updateUserInfoById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, refreshToken, username } = data, newData = __rest(data, ["password", "refreshToken", "username"]);
    const user = yield (0, users_1.getUserById)(id);
    if (!user) {
        throw new error_2.BadRequestError(error_1.USER_NOT_FOUND);
    }
    if (user.username !== username) {
        throw new error_2.BadRequestError(error_1.INVALID_PARAMETERS);
    }
    return yield (0, users_1.updateUserById)(id, newData);
});
exports.updateUserInfoById = updateUserInfoById;
const deleteUserInfoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_1.getUserById)(id);
    if (!user) {
        throw new error_2.BadRequestError(error_1.USER_NOT_FOUND);
    }
    return yield (0, users_1.deleteUserById)(id);
});
exports.deleteUserInfoById = deleteUserInfoById;
//# sourceMappingURL=users.js.map