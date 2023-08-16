import httpClient from '@/api/httpClient';
import type { RoomResponse } from '@/models/roomResponse';

const roomEndPoint = {
  getRooms: () => httpClient.get<RoomResponse[]>(`/rooms`),
};

export default roomEndPoint;
