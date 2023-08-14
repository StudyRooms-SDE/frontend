<script lang="ts">
import { useSessionStore } from '@/stores/sessionStore';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import { DateTime } from 'luxon';
import { PrintableSession } from '@/models/session';

export default defineComponent({
  name: 'DashboardView',
  data() {
    return {
      printableSessions: [] as PrintableSession[],
    };
  },
  computed: {
    ...mapState(useSessionStore, ['getSessions']),
  },

  methods: {
    ...mapActions(useSessionStore, ['userSessions']),
  },

  async created() {
    const fetchData = async () => {
      await this.userSessions();
    };
    await fetchData();

    this.printableSessions = this.getSessions!.map((session) => {
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
        '',
        startDate.toLocaleString(DateTime.DATE_SHORT),
        startDate.toLocaleString(DateTime.TIME_SIMPLE),
        endDate.toLocaleString(DateTime.TIME_SIMPLE),
        false,
      );
    });
  },
});
</script>

<template>
  <div
    class="container d-flex align-items-center justify-content-center min-vh-100"
    style="flex-direction: column"
  >
    <div class="row" v-if="getSessions?.length === 0">
      <div class="col text-center">
        <h3>There aren't any reservations</h3>
      </div>
    </div>
    <div v-else class="row">
      <div class="col">
        <h3 class="text-center">My sessions</h3>
        <table class="table table-striped table-responsive text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Building</th>
              <th scope="col">Subject</th>
              <th scope="col">Time</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="align-middle"
              v-for="(session, i) in printableSessions"
              :key="session.sessionId"
            >
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ session.date }}</td>
              <td>{{ session.building }}</td>
              <td>{{ session.subject }}</td>
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
    </div>
  </div>
</template>
