var express = require('express');
var router = express.Router();

router.use('/', require('./randomGo'));

module.exports = router;