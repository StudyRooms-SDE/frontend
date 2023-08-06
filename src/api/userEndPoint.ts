import httpClient from '@/api/httpClient';
import User from '@/models/user';

const userEndPoint = {
  login: (username: string, password: string) => {
    return httpClient.post<void>('/auth/login', { username, password });
  },

  logout: () => {
    return httpClient.get<void>('/auth/logout', {});
  },

  register: (user: User) => {
    console.log(user);
    return httpClient.post<void>('/auth/register', {
      "username": user.username,
      "password": user.password,
      "email": user.email
    });
  },
};

export default userEndPoint;
