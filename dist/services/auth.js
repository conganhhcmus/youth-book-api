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
exports.resetPassword = exports.resetToken = exports.login = exports.register = void 0;
const error_1 = require("../types/error");
const users_1 = require("../repositories/users");
const common_1 = require("../helpers/common");
const error_2 = require("../constants/error");
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.password || !data.username) {
        throw new error_1.BadRequestError(error_2.INVALID_PARAMETERS);
    }
    const existingUser = yield (0, users_1.getUserByUserName)(data.username);
    if (existingUser) {
        throw new error_1.BadRequestError(error_2.USER_IS_EXISTING);
    }
    const user = yield (0, users_1.createUser)({
        email: data.email,
        username: data.username,
        fullName: data.fullName,
        role: data.role,
        password: yield (0, common_1.hashPassword)(data.password),
    });
    return user;
});
exports.register = register;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.password || !data.username) {
        throw new error_1.BadRequestError(error_2.INVALID_PARAMETERS);
    }
    const user = yield (0, users_1.getUserByUserName)(data.username).select('+password');
    if (!user || !user.isActive) {
        throw new error_1.BadRequestError(error_2.USER_NOT_FOUND);
    }
    const isCorrect = yield (0, common_1.comparePassword)(data.password, user.password);
    if (!isCorrect) {
        throw new error_1.UnauthorizedError(error_2.INVALID_LOGIN);
    }
    const _a = user.toObject(), { password } = _a, payload = __rest(_a, ["password"]);
    const token = (0, common_1.createToken)(payload);
    const refreshToken = (0, common_1.createRefreshToken)(payload);
    user.refreshToken = refreshToken;
    user.save();
    return { token, refreshToken };
});
exports.login = login;
const resetToken = (payload, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_1.getUserByUserName)(payload.username).select('+refreshToken');
    if (!user) {
        throw new error_1.BadRequestError(error_2.USER_NOT_FOUND);
    }
    if (refreshToken !== user.refreshToken) {
        throw new error_1.UnauthorizedError(error_2.INVALID_REFRESH_TOKEN);
    }
    const _b = user.toObject(), { password } = _b, payloadNew = __rest(_b, ["password"]);
    const token = (0, common_1.createToken)(payloadNew);
    return { token, refreshToken };
});
exports.resetToken = resetToken;
const resetPassword = (data, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.password || !data.username || !newPassword) {
        throw new error_1.BadRequestError(error_2.INVALID_PARAMETERS);
    }
    const user = yield (0, users_1.getUserByUserName)(data.username).select('+password');
    if (!user) {
        throw new error_1.BadRequestError(error_2.USER_NOT_FOUND);
    }
    const isCorrect = yield (0, common_1.comparePassword)(data.password, user.password);
    if (!isCorrect) {
        throw new error_1.UnauthorizedError(error_2.INVALID_PASSWORD);
    }
    const _c = user.toObject(), { password } = _c, payload = __rest(_c, ["password"]);
    const token = (0, common_1.createToken)(payload);
    const refreshToken = (0, common_1.createRefreshToken)(payload);
    user.refreshToken = refreshToken;
    user.password = yield (0, common_1.hashPassword)(newPassword);
    user.save();
    return { token, refreshToken };
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.js.map