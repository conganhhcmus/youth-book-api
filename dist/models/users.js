"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: false, default: '' },
    fullName: { type: String, required: false, default: '' },
    role: { type: Number, required: false, default: 0 },
    password: { type: String, required: true, select: false },
    refreshToken: { type: String, required: false, select: false },
    isActive: { type: Boolean, required: false, default: true },
});
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=users.js.map