import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import Api from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TitleScreen from './layout/TitleScreen';
import {Provider, useDispatch} from 'react-redux';
import store from './store';
import {setUserInfo} from './userSlice';

const MainApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });

    AsyncStorage.getItem('user')
      .then(user => {
        if (user !== null) {
          dispatch(setUserInfo(JSON.parse(user)));
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      if (await Api.checkUser(user.id)) {
        console.log('유저가 있음');
      } else {
        console.log('유저가 없어서 register 진행');
        await Api.registerUser(user);
      }
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch(setUserInfo(user));
    } catch (error) {
      console.error(error);
    }
  };

  return <TitleScreen signIn={signIn} />;
};

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
