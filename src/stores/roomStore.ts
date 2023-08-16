import { defineStore } from 'pinia';
import roomEndPoint from '@/api/roomEndPoint';
import { RoomResponse } from '@/models/roomResponse';

export const useRoomStore = defineStore('room', {
  state: () => ({
    rooms: [] as RoomResponse[],
  }),

  getters: {
    getRooms: (state) => {
      return state.rooms;
    },
  },

  actions: {
    async getRoomsAction() {
      const response = await roomEndPoint.getRooms();
      if (response.status === 200) {
        this.rooms = response.data;
      }
    },
  },
});
