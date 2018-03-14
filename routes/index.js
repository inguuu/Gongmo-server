var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
router.use('/random', require('./random'));
router.use('/apply', require('./apply'));

module.exports = router;
