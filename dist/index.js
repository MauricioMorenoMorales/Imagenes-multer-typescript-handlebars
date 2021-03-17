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
//Middlewares
app.use(multer_1.default({ dest: path_1.default.join(__dirname, 'uploads') }).single('image'));
//Routes
app.get('/', function (req, res) { return res.render('index'); });
app.post('/upload', function (req, res) {
    console.log(req.file);
    res.send('Uploaded 2');
});
app.listen(app.get('port'), function () {
    return console.log('>>>>>Server running on port ' + app.get('port'));
});
console.log('xd');
