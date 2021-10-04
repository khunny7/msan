const axios = require('axios');

const getAccessTokenFromCode = async (code) => {
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
  
  return response.data;
}

module.exports = { getAccessTokenFromCode };