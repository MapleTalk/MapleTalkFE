import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Api from '../../Api';

const initialFriends = [
  {name: 'Friend 1', status: 'Hello!', id: '1'},
  {name: 'Friend 2', status: 'Have a good day!', id: '2'},
  {name: 'Friend 3', status: 'Keep smiling!', id: '3'},
];

function FriendCard({id, name, status, userInfo}) {
  const navigation = useNavigation(); // Get logged in user's info

  const handlePress = async () => {
    const room = await Api.getOrCreateChatRoom([userInfo.id, id]); // Pass both user IDs
    if (room.success) {
      // Check if room was successfully created
      navigation.navigate('RoomScreen', {name, roomId: room.roomId}); // Pass room information to RoomScreen
    } else {
      console.error('room 생성 실패');
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.friendCard}>
      <Image source={require('./w2.png')} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
}

function Profile({userInfo}) {
  return (
    <View style={styles.profileContainer}>
      <Image source={require('./w2.png')} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.status}>{userInfo.status}</Text>
      </View>
    </View>
  );
}

export default function FriendScreen() {
  const [friends, setFriends] = useState(initialFriends);
  const userInfo = useSelector(state => state.user.userInfo);

  useEffect(() => {
    const fetchUsers = async () => {
      const friendsFromApi = await Api.getUsers();
      setFriends(friendsFromApi);
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <Profile userInfo={userInfo} />
      <FlatList
        data={friends}
        renderItem={({item}) => (
          <FriendCard
            id={item.id}
            name={item.name}
            status={item.status}
            userInfo={userInfo}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  friendCard: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  status: {
    fontSize: 14,
    color: '#888',
  },
  avatar: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
