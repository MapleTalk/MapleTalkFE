import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SettingItem = ({title, onPress}) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Text style={styles.itemText}>{title}</Text>
  </TouchableOpacity>
);

export default function SettingScreen() {
  const userInfo = useSelector(state => state.user.userInfo);

  return (
    <View style={styles.container}>
      <SettingItem
        title="Edit Profile"
        onPress={() => console.log('Edit Profile Pressed')}
      />
      <SettingItem
        title="Logout"
        onPress={() => console.log('Logout Pressed')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  itemContainer: {padding: 20, borderBottomWidth: 1, borderBottomColor: 'gray'},
  itemText: {fontSize: 18},
});
