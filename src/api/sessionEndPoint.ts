import httpClient from '@/api/httpClient';
import { SessionResponse, SessionDetails, SessionRequest } from '@/models/session';

const sessionEndPoint = {
  getSessions: () => {
    return httpClient.get<SessionResponse[]>('/sessions');
  },

  getUserSessions: () => {
    return httpClient.get<SessionResponse[]>('/sessions/me', {});
  },

  getSessionDetails: (id: string) => {
    return httpClient.get<SessionDetails>('/sessions/' + id);
  },

  deleteSession: (id: string) => {
    return httpClient.delete<void>('/sessions/' + id);
  },

  gteSubjects: () => {
    return httpClient.get<string[]>('/sessions/subjects');
  },

  getSessionsBySubject: (subject: string) => {
    return httpClient.get<SessionResponse[]>('/sessions?subject=' + subject);
  },

  joinSession: (id: string) => {
    return httpClient.post<void>('/sessions/' + id + '/participate');
  },

  createSession: (session: SessionRequest) => {
    console.log(session);
    return httpClient.post<void>('/sessions', {
      roomId: session.roomId,
      subject: session.subject,
      topic: session.topic,
      startTime: session.startTime,
      endTime: session.endTime,
    });
  },

  leaveSession: (id: string) => {
    return httpClient.post<void>('/sessions/' + id + '/leave');
  },
};

export default sessionEndPoint;
