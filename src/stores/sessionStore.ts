import { defineStore } from 'pinia';
import { Session } from '@/models/session';
import sessionEndPoint from '@/api/sessionEndPoint';

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessions: null as Session[] | null,
  }),

  getters: {
    getSessions: (state) => state.sessions,
  },

  actions: {
    async userSessions() {
      const response = await sessionEndPoint.getSessions();
      if (response.status === 200) {
        this.sessions = response.data;
      }
    },
  },
});
