<script lang="ts">
import { useSessionStore } from '@/stores/sessionStore';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import { DateTime } from 'luxon';
import { PrintableSession, SessionResponse } from '@/models/session';

export default defineComponent({
  name: 'DashboardView',
  data() {
    return {
      printableUserSessions: null as PrintableSession[] | null,
      subject: '',
      printableFilteredSessions: null as PrintableSession[] | null,
    };
  },
  computed: {
    ...mapState(useSessionStore, ['getSessions', 'getFilteredSessions', 'getSubjects']),
  },

  async created() {
    await this.userSessions();

    this.printableUserSessions = this.getSessions!.map((session) => {
      return this.printableSession(session);
    });
  },

  async mounted() {
    await this.getSubjectsAction();
  },

  methods: {
    ...mapActions(useSessionStore, [
      'userSessions',
      'getSubjectsAction',
      'getSessionsBySubjectAction',
      'joinSessionAction',
    ]),

    printableSession(session: SessionResponse): PrintableSession {
      const startDate = DateTime.fromFormat(session.startTime, "yyyy-MM-dd'T'HH:mm:ss").setLocale(
        'it',
      );
      const endDate = DateTime.fromFormat(session.endTime, "yyyy-MM-dd'T'HH:mm:ss").setLocale('it');

      if (startDate.day !== endDate.day) {
        this.$notify({
          title: 'Session error',
          text: 'Session ' + session.subject + ' spans over two days',
          type: 'error',
        });
      }
      return new PrintableSession(
        session.sessionId,
        session.building,
        session.subject,
        session.topic,
        startDate.toLocaleString(DateTime.DATE_SHORT),
        startDate.toLocaleString(DateTime.TIME_SIMPLE),
        endDate.toLocaleString(DateTime.TIME_SIMPLE),
        session.createdByUser,
      );
    },

    async searchSessions() {
      await this.getSessionsBySubjectAction(this.subject);
      this.printableFilteredSessions = this.getFilteredSessions!.filter((session) =>
        this.getSessions!.every((s) => s.sessionId !== session.sessionId),
      )
        .map((session) => {
          return this.printableSession(session);
        })
        .filter(
          (session) =>
            DateTime.fromFormat(session.date, 'dd/MM/yyyy').toMillis() >= DateTime.now().toMillis(),
        );

      if (this.printableFilteredSessions === null || this.printableFilteredSessions.length === 0) {
        this.$notify({
          title: 'Information',
          text: 'No sessions to join found',
          type: 'info',
        });
      }
    },

    async joinSession(sessionId: string) {
      await this.joinSessionAction(sessionId);

      await this.userSessions();

      this.printableUserSessions = this.getSessions!.map((session) => {
        return this.printableSession(session);
      });

      this.printableFilteredSessions = this.getFilteredSessions!.filter(
        (session) => session.sessionId !== sessionId,
      ).map((session) => {
        return this.printableSession(session);
      });
    },
  },
});
</script>

<template>
  <div class="container d-flex align-items-center vh-100 mt-5 pt-5" style="flex-direction: column">
    <div class="row w-100">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="text-center m-2 mb-4">
          <router-link to="/create" class="btn btn-secondary"> Create a new session </router-link>
        </div>
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row w-100" v-if="printableUserSessions === null">
      <div class="col-1"></div>
      <div class="col text-center">
        <h3>There aren't any sessions</h3>
      </div>
      <div class="col-1"></div>
    </div>

    <div v-else class="row w-100">
      <div class="col-2"></div>
      <div class="col bg-white p-5 pt-4 pb-4 shadow-lg">
        <h3 class="text-start">Joined sessions</h3>
        <table class="table table-striped table-responsive text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Building</th>
              <th scope="col">Subject</th>
              <th scope="col">Topic</th>
              <th scope="col">Time</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="align-middle"
              v-for="(session, i) in printableUserSessions"
              :key="session.sessionId"
            >
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ session.date }}</td>
              <td>{{ session.building }}</td>
              <td>{{ session.subject }}</td>
              <td>{{ session.topic }}</td>
              <td>{{ session.startTime }} - {{ session.endTime }}</td>
              <td>
                <button
                  @click="$router.push({ name: 'SessionView', params: { id: session.sessionId } })"
                  class="btn btn-primary align-end"
                >
                  See details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row w-100 pt-5">
      <div class="col-2"></div>
      <div class="col-8 bg-white p-5 pt-4 pb-4 shadow-lg">
        <h3 class="text-start">Join existing sessions based on the subject!</h3>
        <form @submit.prevent="searchSessions()">
          <div class="form-group">
            <label for="subjects">Subjects</label>
            <select class="form-control" id="subjects" v-model="subject" required>
              <option v-for="subject in getSubjects" :key="subject">{{ subject }}</option>
            </select>
          </div>
          <div class="text-center pt-3">
            <button type="submit" class="btn btn-primary btm-lg">Search session to join</button>
          </div>
        </form>
        <div v-if="printableFilteredSessions !== null && printableFilteredSessions!.length !== 0">
          <table class="table table-striped table-responsive text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Building</th>
                <th scope="col">Subject</th>
                <th scope="col">Topic</th>
                <th scope="col">Time</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="align-middle"
                v-for="(session, i) in printableFilteredSessions"
                :key="session.sessionId"
              >
                <th scope="row">{{ i + 1 }}</th>
                <td>{{ session.date }}</td>
                <td>{{ session.building }}</td>
                <td>{{ session.subject }}</td>
                <td>{{ session.topic }}</td>
                <td>{{ session.startTime }} - {{ session.endTime }}</td>
                <td>
                  <button @click="joinSession(session.sessionId)" class="btn btn-primary align-end">
                    Join
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>
