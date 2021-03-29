"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) { return res.render('index'); });
router.post('/upload', function (req, res) {
    console.log(req.file);
    res.send('Uploaded 2');
});
exports.default = router;
