import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function RoomScreen({route, navigation}) {
  const {roomId} = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const userInfo = useSelector(state => state.user.userInfo);
  const userId = userInfo.id; 

  useEffect(() => {
    const messagesRef = firestore
      .collection('chats')
      .doc(roomId)
      .collection('messages');
    const unsubscribe = messagesRef.onSnapshot(snapshot => {
      let msgs = [];
      snapshot.forEach(doc => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const sendMessage = msg => {
    firestore.collection('chats').doc(roomId).collection('messages').add({
      senderId: userId,
      text: msg,
      timestamp: '11'//firestore.FieldValue.serverTimestamp(),
    });
    setMessageText('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{roomId}</Text>
      </View>
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={({item}) => (
          <View
            style={[
              styles.message,
              item.senderId === userId ? styles.myMessage : styles.otherMessage,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={text => setMessageText(text)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage(messageText)}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
  },
  headerTitle: {
    fontSize: 18,
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#d1d1d1',
    backgroundColor: '#f5f5f5',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
