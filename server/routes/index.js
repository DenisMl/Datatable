let express = require('express');
let router = express.Router();
let stubs = require('../public/javascripts/stub');

/* GET home page. */
router.get('/slackusers', function(req, res, next) {
  res.status(200).json(stubs.stub)
});

router.get('/mapping', (req, res) => {
  res.status(200).json(stubs.aliasesStub)
});

router.post('/update', (req, res) => {
  if (req.body) {
    console.log(req.body);
    res.status(200).send(req.body);
  } else {
    res.status(400).send('error');
  }

});

module.exports = router;
