import './App.css';
import { Users } from './user';
// import { useCallback } from 'react';
import { authenticateInstagram, getAccessTokenFromCode, getUserMediaAsync } from './utils/instagram-helper';
const { useState } = require('react');

function App() {
  const [accessInfo, setAccessInfo] = useState(null);
  const [mediaArr, setMediaArr] = useState([]);

  const onGetAccessToken = (accessToken) => {
    getAccessTokenFromCode(accessToken).then((data) => {
      setAccessInfo(data);
    });
  }

  const onGetMedia = async () => {
    const mediadata = await getUserMediaAsync(accessInfo.access_token);

    setMediaArr(mediadata);
  }

  return (
    <div className="App">
      <header className="App-header">
        MSAN image import test pages
      </header>
      <Users />
      <button onClick={() => authenticateInstagram(382052066857208, onGetAccessToken)}>Log in</button>
      {
        accessInfo &&
        <div>
          <div>
            { accessInfo.user_id }
          </div>
          <div>
            { accessInfo.access_token }
          </div>
        </div>
      }
      <button onClick={onGetMedia}>Get Media</button>
      {
        mediaArr.map((media) => (
          <div key={media.id}>
            <img src={media.media_url} alt="instagram media" width="450"/>
          </div>
        ))
      }
    </div>
  );
}

export default App;
