"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var index_routes_1 = __importDefault(require("./routes/index.routes"));
//Initializations
dotenv_1.default.config();
var app = express_1.default();
//Settings
app.set('port', process.env.PORT || 5555);
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('.hbs', express_handlebars_1.default({
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
    defaultLayout: 'main.hbs',
    extname: '.hbs',
}));
app.set('view engine', '.hbs');
var storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, 'public/uploads'),
    filename: function (req, file, cb) {
        cb(null, uuid_1.v4() + path_1.default.extname(file.originalname));
    },
});
//Middlewares
app.use(multer_1.default({
    storage: storage,
    dest: path_1.default.join(__dirname, 'uploads'),
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        var fileTypes = /|jpg|png|gif/;
        var mimeType = fileTypes.test(file.mimetype);
        var extname = fileTypes.test(path_1.default.extname(file.originalname));
        if (mimeType && extname)
            return cb(null, true);
        cb(new Error('NO funciona'));
    },
}).single('image'));
//Routes
app.use(index_routes_1.default);
// Static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.listen(app.get('port'), function () {
    return console.log('>>>>>Server running on port ' + app.get('port'));
});
console.log('xd');
