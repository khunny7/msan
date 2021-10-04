var express = require('express');
var router = express.Router();
const axios = require('axios');
const { getAccessTokenFromCode } = require('../utils/instagramRepo');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'MSAN2' });
});

router.get('/auth', async function(req, res, next) {
  if (req && req.query && req.query.code) {
    const code = req.query.code;
  
    const response = await getAccessTokenFromCode(code);

    res.send(response);
  } else {
    res.send("Unexpected error");
  }
});

module.exports = router;
