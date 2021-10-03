var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'MSAN2' });
});

router.get('/auth', async function(req, res, next) {
  if (req && req.query && req.query.code) {
    const code = req.query.code;

    const data = {
      client_id: '382052066857208',
      client_secret: '05f55558af72d28ebbb9ff7209cfd7aa',
      grant_type: 'authorization_code',
      redirect_uri:'https://msan.azurewebsites.net/auth',
      code,
    };

    const insta_form = new URLSearchParams();
    for([key, value] of Object.entries(data)) {
      insta_form.append(key, value);
    }
  
    const response = await axios({
      method: 'post',
      url: 'https://api.instagram.com/oauth/access_token',
      data: insta_form,
      headers: { "Content-Type": 'application/x-www-form-urlencoded' },
    }).catch((err) => {
        console.error(err);
    });

    res.send(response.data);
  } else {
    res.send("Unexpected error");
  }
});

module.exports = router;
