import { defineStore } from 'pinia';
import UserEndPoint from '@/api/userEndPoint';
import { User, UserInfo } from '@/models/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserInfo | null,
    loggedIn: false,
  }),

  getters: {
    getUser: (state) => state.user,
    getLoggedIn: (state) => state.loggedIn,
  },

  actions: {
    async login(username: string, password: string) {
      const response = await UserEndPoint.login(username, password);
      response.status === 200 ? (this.loggedIn = true) : (this.loggedIn = false);
    },

    async logout() {
      await UserEndPoint.logout();
      this.loggedIn = false;
      this.user = null;
    },

    async register(user: User) {
      await UserEndPoint.register(user);
    },

    async getUserInfo() {
      const response = await UserEndPoint.getUserInfo();
      this.user = response.data;
    },
  },
});
