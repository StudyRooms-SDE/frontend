import httpClient from '@/api/httpClient';
import { Session } from '@/models/session';

const sessionEndPoint = {
  getSessions: () => {
    return httpClient.get<Session[]>('/sessions', {});
  },

  getSessionDetails: (id: string) => {
    return httpClient.get<Session>('/sessions/' + id, {});
  },
};

export default sessionEndPoint;
