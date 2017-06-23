const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const compression = require('compression');
const fs = require('fs');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(function response(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.listen(3000);

module.exports = app;