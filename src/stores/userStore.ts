import { defineStore } from 'pinia';
import UserEndPoint from '@/api/userEndPoint';
import { User, UserInfo } from '@/models/user';
import { notify } from '@kyvg/vue3-notification';

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

    async deleteUserAction() {
      await UserEndPoint.deleteUser();
      this.user = null;
      this.loggedIn = false;
      notify({
        title: 'Success',
        text: 'User deleted',
        type: 'success',
      });
    },
  },
});
