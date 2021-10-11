const axios = require('axios');

const getRedirectUri = () => {
    const hostname = window && window.location && window.location.hostname;
    const port = window && window.location && window.location.port;

    return `https://${hostname}${port === '3000' ? ':3000' : ''}/auth`;
}

const getAccessTokenFromCode = async (code) => {
  const data = {
    client_id: '382052066857208',
    client_secret: '05f55558af72d28ebbb9ff7209cfd7aa',
    grant_type: 'authorization_code',
    redirect_uri: getRedirectUri(),
    code,
  };

  const insta_form = new URLSearchParams();
  for(const [key, value] of Object.entries(data)) {
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

const authenticateInstagram = (instagramClientId, callback) => {
    var popupWidth = 700,
        popupHeight = 500,
        popupLeft = (window.screen.width - popupWidth) / 2,
        popupTop = (window.screen.height - popupHeight) / 2;
    var popup = window.open('', '', 'width='+popupWidth+',height='+popupHeight+',left='+popupLeft+',top='+popupTop+'');
    popup.onload = function() {
        if(window.location.hash.length === 0) {
            popup.open(`https://api.instagram.com/oauth/authorize/?client_id=${instagramClientId}&redirect_uri=${getRedirectUri()}&scope=user_profile,user_media&response_type=code`, '_self');
        }
        var interval = setInterval(function() {
            try {
                console.log(popup.location.hash.length);
                if(popup.location.hash.length) {
                    clearInterval(interval);
                    const accessToken = popup.location.search.split('code=')[1]
                    popup.close();
                    if(callback !== undefined && typeof callback == 'function'){
                        callback(accessToken);
                    }
                }
            }
            catch(evt) {
                // Permission denied
            }
        }, 500);
    };
};

const getUserMediaAsync = async (token) => {
    const response = await axios({
        method: 'get',
        url: `https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${token}`,
        }).catch((err) => {
            console.error(err);
        });
    
    return response.data.data;
}

export { authenticateInstagram, getAccessTokenFromCode, getUserMediaAsync};
