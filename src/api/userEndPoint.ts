import httpClient from '@/api/httpClient';
import { User, UserInfo } from '@/models/user';

const userEndPoint = {
  login: (username: string, password: string) => {
    return httpClient.post<void>(
      '/auth/login',
      { username, password },
      {
        withCredentials: true,
        headers: { 'Accept-Cookie': 'true' },
      },
    );
  },

  logout: () => {
    return httpClient.post<void>('/auth/logout', {});
  },

  register: (user: User) => {
    console.log(user);
    return httpClient.post<void>('/auth/register', {
      username: user.username,
      password: user.password,
      email: user.email,
    });
  },

  getUserInfo: () => {
    return httpClient.get<UserInfo>('/me', {});
  },

  deleteUser: () => {
    return httpClient.delete<void>('/me', {});
  }
};

export default userEndPoint;
