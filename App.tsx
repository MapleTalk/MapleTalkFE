import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import Api from './Api';
import TitleView from './layout/TitleView';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      console.log("CLICKED");
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      Api.googleLogin(userInfo.user);
    } catch (error) {
      console.error(error);
    }
  };

  return <TitleView />;
  /*(
    <GoogleSigninButton
      style={{width: 192, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={false}
    />
  );
  */
};

export default App;
