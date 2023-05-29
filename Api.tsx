import axios from 'axios';
import {SERVER_IP, SERVER_PORT} from '@env';

const apiClient = axios.create({
  baseURL: `http://${SERVER_IP}:${SERVER_PORT}`, // 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

interface User {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

const googleLogin = async (user: User): Promise<boolean> => {
  try {
    console.log('requested', user);
    const response = await apiClient.post('/api/register', {
      id: user.id,
      email: user.email,
      name: user.name,
    });

    if (response.data.success) {
      console.log('Google login successful!');
      // 추가 작업
      return true;
    } else {
      console.log('Google login failed.');
      // 오류 처리
      return false;
    }
  } catch (error) {
    console.error(error);
    // 오류 처리
    return false;
  }
};

const getUsers = async () => {
  try {
    const response = await apiClient.get('/api/users'); // 'users' 엔드포인트에 GET 요청
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default {getUsers, googleLogin};
