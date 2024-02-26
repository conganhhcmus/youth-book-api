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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.isAdminOrOwner = exports.isAdmin = void 0;
const common_1 = require("../constants/common");
const error_1 = require("../constants/error");
const roles_1 = require("../constants/roles");
const helpers = __importStar(require("../helpers/common"));
const error_2 = require("../types/error");
const isAdmin = (req, res, next) => {
    const payload = req['identity'];
    if (payload.role !== roles_1.Roles.Admin) {
        throw new error_2.ForbiddenError(error_1.USER_HAVE_NOT_PERMISSION);
    }
    next();
};
exports.isAdmin = isAdmin;
const isAdminOrOwner = (req, res, next) => {
    const { id } = req.params;
    const payload = req['identity'];
    if (payload.role !== roles_1.Roles.Admin && payload._id !== id) {
        throw new error_2.ForbiddenError(error_1.USER_HAVE_NOT_PERMISSION);
    }
    next();
};
exports.isAdminOrOwner = isAdminOrOwner;
const verifyAccessToken = (req, res, next) => {
    const token = (req.cookies[common_1.TOKEN_KEY] || req.headers[common_1.TOKEN_KEY]);
    if (!token) {
        throw new error_2.ForbiddenError(error_1.INVALID_TOKEN);
    }
    const payload = helpers.verifyToken(token);
    req['identity'] = payload;
    next();
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (req, res, next) => {
    const refreshToken = (req.cookies[common_1.REFRESH_TOKEN_KEY] || req.headers[common_1.REFRESH_TOKEN_KEY]);
    if (!refreshToken) {
        throw new error_2.ForbiddenError(error_1.INVALID_TOKEN);
    }
    const payload = helpers.verifyRefreshToken(refreshToken);
    req['identity'] = payload;
    next();
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=authToken.js.map