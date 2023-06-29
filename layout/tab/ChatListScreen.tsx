import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Api from '../../Api';

export default function ChatListScreen({navigation, route}) {
  const [chatRooms, setChatRooms] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector(state => state.user.userInfo);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      fetchChatRooms();
    } else {
      const filteredChatRooms = chatRooms.filter(room =>
        room.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setChatRooms(filteredChatRooms);
    }
  }, [searchText]);

  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const response = await Api.getUserChatRooms(userInfo.name);
      setChatRooms(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLongPress = roomName => {
    Alert.alert(
      'Chat Room Long Press',
      'You have long pressed ' + roomName,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Leave', onPress: () => console.log('Leave Pressed')},
      ],
      {cancelable: false},
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={text => setSearchText(text)}
        placeholder="Search for a chat room..."
      />
      <FlatList
        data={chatRooms}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.chatRoom}
            onPress={() =>
              navigation.navigate('RoomScreen', {roomName: item.name})
            }
            onLongPress={() => handleLongPress(item.name)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  chatRoom: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#DCF8C6',
    borderRadius: 5,
  },
});
