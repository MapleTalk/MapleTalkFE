import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

import FriendScreen from './tab/FriendScreen';
import ChatListScreen from './tab/ChatListScreen'; // 이름 변경
import RoomScreen from './RoomScreen';
import SettingScreen from './tab/SettingScreen';

const Tab = createBottomTabNavigator();

const FriendStack = createStackNavigator();
const FriendStackScreen = () => {
  return (
    <FriendStack.Navigator>
      <FriendStack.Screen
        name="FriendScreen"
        component={FriendScreen}
        options={{headerShown: false}}
      />
      <FriendStack.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={{headerShown: false}}
      />
    </FriendStack.Navigator>
  );
};

const RoomStack = createStackNavigator();
const RoomStackScreen = () => {
  return (
    <RoomStack.Navigator>
      <RoomStack.Screen
        name="ChatListScreen"
        component={ChatListScreen} // 이름 변경
        options={{headerShown: false}}
      />
      <RoomStack.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={{headerShown: false}}
      />
    </RoomStack.Navigator>
  );
};

const SettingStack = createStackNavigator();
const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{headerShown: false}}
      />
    </SettingStack.Navigator>
  );
};

function TitleScreen({signIn}) {
  const userInfo = useSelector(state => state.user.userInfo);

  if (userInfo) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="친구"
            options={{headerShown: false}}
            component={FriendStackScreen}
          />
          <Tab.Screen
            name="채팅"
            options={{headerShown: false}}
            component={RoomStackScreen}
          />
          <Tab.Screen
            name="설정"
            options={{headerShown: false}}
            component={SettingStackScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={false}
      />
    );
  }
}

export default TitleScreen;
