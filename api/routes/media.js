var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET media listing. */
router.get('/', async function(req, res, next) {
  const token = req.query.access_token;

  const response = await axios({
    method: 'get',
    url: `https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${token}`,
  }).catch((err) => {
      console.error(err);
  });

  res.send(response.data.data);
});

module.exports = router;
