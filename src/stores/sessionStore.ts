import { defineStore } from 'pinia';
import { SessionResponse, SessionDetails } from '@/models/session';
import sessionEndPoint from '@/api/sessionEndPoint';

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessions: null as SessionResponse[] | null,
    details: null as SessionDetails | null,
  }),

  getters: {
    getSessions: (state) => state.sessions,
    getSessionDetails: (state) => state.details,
  },

  actions: {
    async userSessions() {
      const response = await sessionEndPoint.getSessions();
      if (response.status === 200) {
        this.sessions = response.data;
      }
    },

    async sessionDetails(sessionId: string) {
      const response = await sessionEndPoint.getSessionDetails(sessionId);
      if (response.status === 200) {
        this.details = response.data;
      }
    },
  },
});
