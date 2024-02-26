"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("express-async-errors");
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routers_1 = __importDefault(require("./routers"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const swagger_1 = __importDefault(require("./swagger"));
const config_1 = require("./config");
const app = (0, express_1.default)();
/** middlewares */
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.disable('x-powered-by');
app.use((0, cookie_parser_1.default)());
/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json('Youth Book API is running!');
});
/** api routes */
app.use('/api/v1', (0, routers_1.default)());
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default, { customCssUrl: config_1.SWAGGER_CSS_URL }));
/** error handlers */
(0, errorHandler_1.default)(app);
/** start server */
app.listen(config_1.PORT, () => {
    console.log(`Server connected to http://localhost:${config_1.PORT}`);
});
/** connect database */
mongoose_1.default.Promise = Promise;
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(config_1.ATLAS_URI);
mongoose_1.default.connection.on('error', (error) => console.log(error));
//# sourceMappingURL=app.js.map