import { defineStore } from 'pinia';
import { SessionResponse, SessionDetails } from '@/models/session';
import sessionEndPoint from '@/api/sessionEndPoint';
import { notify } from '@kyvg/vue3-notification';
import fileEndPoint from '@/api/fileEndPoint';

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

    async deleteSessionAction(sessionId: string) {
      const response = await sessionEndPoint.deleteSession(sessionId);
      if (response.status === 204) {
        notify({
          title: 'Success',
          text: 'Session deleted',
          type: 'success',
        });
      }
    },

    async filesAction(sessionId: string) {
      const response = await fileEndPoint.getFiles(sessionId);
      if (response.status === 200) {
        this.details!.files = response.data;
      }
    },

    async deleteFileAction(sessionId: string, fileId: string) {
      const response = await fileEndPoint.deleteFile(sessionId, fileId);
      if (response.status === 204) {
        await this.filesAction(sessionId);
        notify({
          title: 'Success',
          text: 'File deleted',
          type: 'success',
        });
      }
    },

    async uploadFileAction(sessionId: string, file: File) {
      console.log(file);
      notify({
        title: 'Info',
        text: 'The file is being uploaded. This may take a while',
        type: 'info',
      });
      const response = await fileEndPoint.uploadFile(sessionId, file);
      if (response.status === 201) {
        await this.filesAction(sessionId);
        notify({
          title: 'Success',
          text: 'File uploaded',
          type: 'success',
        });
      }
    },
  },
});
