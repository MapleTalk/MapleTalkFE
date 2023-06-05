import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

// 각 탭에 대응하는 컴포넌트
function FriendsScreen() {
  return (
    <View>
      <Text>친구 화면</Text>
    </View>
  );
}

function ChatScreen() {
  return (
    <View>
      <Text>채팅 화면</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>설정 화면</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="친구" component={FriendsScreen} />
      <Tab.Screen name="채팅" component={ChatScreen} />
      <Tab.Screen name="설정" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
