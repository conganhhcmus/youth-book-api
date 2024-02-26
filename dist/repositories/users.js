"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserByRefreshToken = exports.getUserByUserName = exports.getUsers = void 0;
const users_1 = __importDefault(require("../models/users"));
const getUsers = () => users_1.default.find();
exports.getUsers = getUsers;
const getUserByUserName = (username) => users_1.default.findOne({ username });
exports.getUserByUserName = getUserByUserName;
const getUserByRefreshToken = (token) => users_1.default.findOne({ refreshToken: token });
exports.getUserByRefreshToken = getUserByRefreshToken;
const getUserById = (id) => users_1.default.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new users_1.default(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = (id) => users_1.default.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => users_1.default.findByIdAndUpdate(id, values, { new: true });
exports.updateUserById = updateUserById;
//# sourceMappingURL=users.js.map