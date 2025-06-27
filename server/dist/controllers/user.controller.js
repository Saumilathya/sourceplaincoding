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
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.updateProfilePicture = exports.updatePassword = exports.updateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.createActivationToken = exports.registrationUser = void 0;
require("dotenv").config();
const user_model_1 = __importDefault(require("../models/user.model"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../utils/jwt");
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
exports.registrationUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = yield user_model_1.default.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler_1.default("Email already exist", 400));
        }
        const user = {
            name,
            email,
            password,
        };
        const activationToken = (0, exports.createActivationToken)(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        try {
            yield (0, sendMail_1.default)({
                email: user.email,
                subject: "Activate your account",
                template: "activation-mail.ejs",
                data,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account!`,
                activationToken: activationToken.token,
            });
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({
        user,
        activationCode,
    }, process.env.ACTIVATION_TOKEN, {
        expiresIn: "5m",
    });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;
exports.activateUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activation_token, activation_code } = req.body;
        const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_TOKEN);
        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler_1.default("Invalid activation code", 400));
        }
        const { name, email, password } = newUser.user;
        const existUser = yield user_model_1.default.findOne({ email });
        if (existUser) {
            return next(new ErrorHandler_1.default("Email already exist", 400));
        }
        const user = yield user_model_1.default.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            success: true,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.loginUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler_1.default("Please enter email and password", 400));
        }
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler_1.default("Invalid email or password", 400));
        }
        const isPasswordMatch = yield user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler_1.default("Invalid email or password", 400));
        }
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// logout user
exports.logoutUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// update access token
exports.updateAccessToken = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh_token = req.headers["refresh-token"];
        const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN);
        if (!decoded) {
            return next(new ErrorHandler_1.default("Could not refresh token", 400));
        }
        const user = yield user_model_1.default.findById(decoded.id);
        if (!user) {
            return next(new ErrorHandler_1.default("Please login for access this resources!", 400));
        }
        req.user = user;
        return next();
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// get user info
exports.getUserInfo = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield user_model_1.default.findById(userId);
        if (user) {
            res.status(201).json({
                success: true,
                user,
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// social auth
exports.socialAuth = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, avatar } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            const newUser = yield user_model_1.default.create({ email, name, avatar });
            (0, jwt_1.sendToken)(newUser, 200, res);
        }
        else {
            (0, jwt_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateUserInfo = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield user_model_1.default.findById(userId);
        if (name && user) {
            user.name = name;
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updatePassword = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler_1.default("Please enter old and new password", 400));
        }
        const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("+password");
        if ((user === null || user === void 0 ? void 0 : user.password) === undefined) {
            return next(new ErrorHandler_1.default("Invalid user", 400));
        }
        const isPasswordMatch = yield (user === null || user === void 0 ? void 0 : user.comparePassword(oldPassword));
        if (!isPasswordMatch) {
            return next(new ErrorHandler_1.default("Invalid old password", 400));
        }
        user.password = newPassword;
        yield user.save();
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// update profile picture
exports.updateProfilePicture = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { avatar } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield user_model_1.default.findById(userId).select("+password");
        // if (avatar && user) {
        //   // if user have one avatar then call this if
        //   if (user?.avatar?.public_id) {
        //     // first delete the old image
        //     await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
        //     const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        //       folder: "avatars",
        //       width: 150,
        //     });
        //     user.avatar = {
        //       public_id: myCloud.public_id,
        //       url: myCloud.secure_url,
        //     };
        //   } else {
        //     const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        //       folder: "avatars",
        //       width: 150,
        //     });
        //     user.avatar = {
        //       public_id: myCloud.public_id,
        //       url: myCloud.secure_url,
        //     };
        //   }
        // }
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// get all users --- only for admin
exports.getAllUsers = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find().sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            users,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// update user role --- only for admin
exports.updateUserRole = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, role } = req.body;
        const isUserExist = yield user_model_1.default.findOne({ email });
        if (isUserExist) {
            const id = isUserExist._id;
            const user = yield user_model_1.default.findByIdAndUpdate(id, { role }, { new: true });
            res.status(201).json({
                success: true,
                user,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Delete user --- only for admin
exports.deleteUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        yield user.deleteOne({ id });
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
