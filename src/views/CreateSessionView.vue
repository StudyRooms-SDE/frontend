<script lang="ts">
import { SessionRequest } from '@/models/session';
import { useSessionStore } from '@/stores/sessionStore';
import { useRoomStore } from '@/stores/roomStore';
import { mapActions, mapState } from 'pinia';
import { defineComponent, ref } from 'vue';
import { RoomResponse } from '@/models/roomResponse';
import { DateTime } from 'luxon';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { notify } from '@kyvg/vue3-notification';

export default defineComponent({
  name: 'CreateSession',

  components: { VueDatePicker },

  data() {
    return {
      room: null as RoomResponse | null,
      subject: '',
      topic: '',
      dates: ref<Date[]>(),
    };
  },

  methods: {
    ...mapActions(useSessionStore, ['createSessionAction', 'getSubjectsAction']),
    ...mapActions(useRoomStore, ['getRoomsAction']),

    async createSession() {
      if (this.dates === undefined) {
        notify({
          type: 'error',
          title: 'Invalid date',
          text: 'Please select a valid date',
        });
        return;
      }
      const startDate = DateTime.fromJSDate(this.dates[0]);
      const endDate = DateTime.fromJSDate(this.dates[1]);
      if (startDate >= endDate || startDate < DateTime.now()) {
        notify({
          type: 'error',
          title: 'Invalid date',
          text: 'Please select a valid date',
        });
        return;
      }
      const sessionRequest = new SessionRequest(
        this.room!.id,
        this.subject,
        this.topic,
        startDate!.toLocal().toFormat("yyyy-MM-dd'T'HH:mm:ss"),
        endDate!.toLocal().toFormat("yyyy-MM-dd'T'HH:mm:ss"),
      );
      await this.createSessionAction(sessionRequest);

      this.$router.push({ path: '/dashboard' });
    },
  },

  computed: {
    ...mapState(useSessionStore, ['getSubjects']),
    ...mapState(useRoomStore, ['getRooms']),
  },

  async mounted() {
    await this.getSubjectsAction();
    await this.getRoomsAction();

    const startDate = new Date(new Date().setHours(new Date().getHours(), 0, 0, 0));
    const endDate = startDate;
    this.dates = [startDate, endDate];
  },
});
</script>

<template>
  <div class="container d-flex min-vh-100 justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-md-2"></div>
      <div class="col-md-8 p-0 shadow-lg rounded">
        <form @submit.prevent="createSession()" class="border p-5 bg-white">
          <h1 class="h4 m-1 mb-3 fw-bold">Enter the session information</h1>
          <div class="form-group m-3">
            <label for="subjects">Room</label>
            <select class="form-control" id="rooms" v-model="room" required>
              <option v-for="room in getRooms" :key="room.id" :value="room">
                {{ room.building }}, {{ room.name }}
              </option>
            </select>
          </div>
          <div class="form-group m-3">
            <label for="subjects">Subjects</label>
            <select class="form-control" id="subjects" v-model="subject" required>
              <option v-for="subject in getSubjects" :key="subject">{{ subject }}</option>
            </select>
          </div>

          <div class="form-group m-3">
            <label for="topic">Topic</label>
            <input v-model="topic" type="text" class="form-control" id="topic" required />
          </div>
          <div class="form-group m-3">
            <label for="date">Date</label>
            <VueDatePicker
              v-model="dates"
              range
              auto-range="0"
              minutesIncrement="30"
              id="date"
            ></VueDatePicker>
          </div>
          <button class="w-100 btn btn-lg btn-secondary mr-3 mt-3" type="submit">
            Create session
          </button>
        </form>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>
