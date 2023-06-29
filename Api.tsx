import axios from 'axios';
import {SERVER_IP, SERVER_PORT} from '@env';

const apiClient = axios.create({
  baseURL: `http://${SERVER_IP}:${SERVER_PORT}`, // Remove /api from here
  headers: {
    'Content-Type': 'application/json',
  },
});

const registerUser = async user => {
  try {
    const response = await apiClient.post('/api/register', user); // Add /api here
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};

const getUsers = async () => {
  try {
    const response = await apiClient.get('/api/users'); // Add /api here
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
};

const checkUser = async id => {
  try {
    const response = await apiClient.get(`/api/checkUser/${id}`); // Add /api here
    return response.data;
  } catch (error) {
    console.error('Error checking user:', error);
    return null;
  }
};

const getChatMessages = async roomId => {
  try {
    const response = await apiClient.get(`/api/chats/getChat/${roomId}`); // Add /api here
    return response.data;
  } catch (error) {
    console.error('Error fetching chat room messages:', error);
    return null;
  }
};

const sendChatMessage = async (userId, roomId, message) => {
  try {
    const response = await apiClient.post('/api/chats/sendChat', {
      // Add /api here
      userId,
      roomId,
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};

const getOrCreateChatRoom = async users => {
  try {
    const response = await apiClient.post('/api/chats/getOrCreateChatRoom', {users}); // Add /api here
    return response.data;
  } catch (error) {
    console.error('Error creating chat room:', error);
    return null;
  }
};

const modifyChatRoomUsers = async (roomId, users) => {
  try {
    const response = await apiClient.put(`/api/chats/modify/${roomId}`, {
      users,
    }); // Add /api here
    return response.data;
  } catch (error) {
    console.error('Error updating chat room info:', error);
    return null;
  }
};

const getUserChatRooms = async userId => {
  try {
    const response = await apiClient.get(`/api/chats/getUserChats/${userId}`); // Add /api here
    return response.data;
  } catch (error) {
    console.error('Error fetching user chat rooms:', error);
    return null;
  }
};

export default {
  registerUser,
  getUsers,
  checkUser,
  getChatMessages,
  sendChatMessage,
  getOrCreateChatRoom,
  modifyChatRoomUsers,
  getUserChatRooms,
};
