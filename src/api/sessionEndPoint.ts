import httpClient from '@/api/httpClient';
import { SessionResponse, SessionDetails } from '@/models/session';

const sessionEndPoint = {
  getSessions: () => {
    return httpClient.get<SessionResponse[]>('/sessions', {});
  },

  getSessionDetails: (id: string) => {
    return httpClient.get<SessionDetails>('/sessions/' + id, {});
  },
};

export default sessionEndPoint;
