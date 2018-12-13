let express = require('express');
let router = express.Router();
let huila = require('../public/javascripts/stub');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
