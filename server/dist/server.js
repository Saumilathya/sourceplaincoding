"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const db_1 = require("./db/db");
const cloudinary_1 = require("cloudinary");
const error_1 = require("./middleware/error");
const user_route_1 = __importDefault(require("./routes/user.route"));
const cors_1 = __importDefault(require("cors"));
const course_route_1 = __importDefault(require("./routes/course.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// cookie parser
// app.use(cookieParser());
app.use((0, cors_1.default)({
    origin: ["https://sourceplaincoding.vercel.app", "http://localhost:3000/"],
    credentials: true,
}));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use("/api/v1", user_route_1.default);
app.use("/api/v1", course_route_1.default);
app.get("/text", (req, res) => {
    res.status(404).json({
        success: true,
        message: "Api is not working",
    });
});
server.listen(PORT, () => {
    (0, db_1.connectDb)();
    console.log(`Server is running at http://localhost:${PORT}`);
});
app.use(error_1.ErrorMiddleware);
