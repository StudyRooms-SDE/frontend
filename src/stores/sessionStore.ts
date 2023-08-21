import { defineStore } from 'pinia';
import { SessionResponse, SessionDetails, SessionRequest } from '@/models/session';
import sessionEndPoint from '@/api/sessionEndPoint';
import { notify } from '@kyvg/vue3-notification';
import fileEndPoint from '@/api/fileEndPoint';

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessions: null as SessionResponse[] | null,
    filteredSessions: null as SessionResponse[] | null,
    details: null as SessionDetails | null,
    subjects: [] as string[],
  }),

  getters: {
    getSessions: (state) => state.sessions,
    getSessionDetails: (state) => state.details,
    getSubjects: (state) => state.subjects,
    getFilteredSessions: (state) => state.filteredSessions,
  },

  actions: {
    async userSessions() {
      const response = await sessionEndPoint.getUserSessions();
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

    async getSubjectsAction() {
      const response = await sessionEndPoint.gteSubjects();
      if (response.status === 200) {
        this.subjects = response.data;
      }
    },

    async getSessionsBySubjectAction(subject: string) {
      const response = await sessionEndPoint.getSessionsBySubject(subject);
      if (response.status === 200) {
        this.filteredSessions = response.data;
      }
    },

    async joinSessionAction(sessionId: string) {
      const response = await sessionEndPoint.joinSession(sessionId);
      if (response.status === 201) {
        notify({
          title: 'Success',
          text: 'Joined session',
          type: 'success',
        });
      }
    },

    async leaveSessionAction(sessionId: string) {
      const response = await sessionEndPoint.leaveSession(sessionId);
      if (response.status === 204) {
        notify({
          title: 'Success',
          text: 'Left session',
          type: 'success',
        });
      }
    },

    async createSessionAction(session: SessionRequest) {
      const response = await sessionEndPoint.createSession(session);
      if (response.status === 201) {
        notify({
          title: 'Success',
          text: 'Session created',
          type: 'success',
        });
      }
    },

    //----------------------- Files -----------------------//
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
