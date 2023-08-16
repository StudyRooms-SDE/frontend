<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSessionStore } from '@/stores/sessionStore';
import { mapState, mapActions } from 'pinia';
import { DateTime } from 'luxon';
import type { RoomResponse } from '@/models/roomResponse';
import type { FileResponse } from '@/models/fileResponse';
import { PrintableSession } from '@/models/session';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet';
import { LatLng, type PointExpression } from 'leaflet';

export default defineComponent({
  name: 'SessionView',
  data: () => ({
    details: {} as PrintableSession,
    room: {} as RoomResponse,
    files: [] as FileResponse[],
    center: [46.06777, 11.12355] as PointExpression,
    marker: null as LatLng | null,
    zoom: 13,
  }),

  setup() {
    return {
      fileInput: ref<HTMLInputElement | null>(null),
    };
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.sessionDetails(this.id);

    const startDate = DateTime.fromFormat(
      this.getSessionDetails!.startTime,
      "yyyy-MM-dd'T'HH:mm:ss",
    ).setLocale('it');

    const endDate = DateTime.fromFormat(
      this.getSessionDetails!.endTime,
      "yyyy-MM-dd'T'HH:mm:ss",
    ).setLocale('it');

    this.details = new PrintableSession(
      this.getSessionDetails!.sessionId,
      '',
      this.getSessionDetails!.subject,
      this.getSessionDetails!.topic,
      startDate.toLocaleString(DateTime.DATE_SHORT),
      startDate.toLocaleString(DateTime.TIME_SIMPLE),
      endDate.toLocaleString(DateTime.TIME_SIMPLE),
      this.getSessionDetails!.createdByUser,
    );

    this.room = this.getSessionDetails!.room;

    this.files = this.getSessionDetails!.files;

    this.marker = new LatLng(
      this.getSessionDetails!.room.latitude,
      this.getSessionDetails!.room.longitude,
    );
  },
  computed: {
    ...mapState(useSessionStore, ['getSessionDetails']),
  },

  methods: {
    ...mapActions(useSessionStore, [
      'sessionDetails',
      'deleteFileAction',
      'uploadFileAction',
      'deleteSessionAction',
      'leaveSessionAction',
    ]),

    downloadFile(url: string) {
      window.open(url, '_blank');
    },

    async deleteFile(fileId: string) {
      await this.deleteFileAction(this.id, fileId);
      this.files = this.getSessionDetails!.files;
    },

    async deleteSession() {
      await this.deleteSessionAction(this.id);
      this.$router.push({ path: '/dashboard' });
    },

    async leaveSession() {
      await this.leaveSessionAction(this.id);
      this.$router.push({ path: '/dashboard' });
    },

    async handleFileChange() {
      console.log(this.fileInput!);
    },

    async uploadFile() {
      const fileToUpload = this.fileInput!.files![0];
      await this.uploadFileAction(this.id, fileToUpload);
      this.files = this.getSessionDetails!.files;
    },
  },
});
</script>

<template>
  <div
    class="container d-flex align-items-center justify-content-center"
    style="flex-direction: column"
  >
    <div class="row">
      <div class="row d-flex align-items-center justify-content-center pt-5 mt-5">
        <div class="col-12 mb-4">
          <div class="card pe-2" style="border-radius: 0.5rem">
            <div class="row">
              <div class="col-2 bg-primary bg-gradient"></div>
              <div class="col-md-5">
                <div class="card-body p-4">
                  <h6>Room</h6>
                  <hr class="mt-0 mb-2 border-primary border-3" />
                  <div class="row pt-1">
                    <div class="col">
                      <h6>Building</h6>
                      <p>{{ room.building }}</p>
                    </div>
                  </div>
                  <div class="row pt-1">
                    <div class="col">
                      <h6>Study Room</h6>
                      <p>{{ room.name }}</p>
                    </div>
                  </div>
                  <div class="row pt-1">
                    <div class="col">
                      <h6>Address</h6>
                      <p>{{ room.address }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-5 pt-4">
                <h6>Session</h6>
                <hr class="mt-0 mb-2 border-primary border-3" />
                <div class="row pt-1">
                  <div class="col">
                    <h6>Subject</h6>
                    <p>{{ details.subject }}</p>
                  </div>
                </div>
                <div class="row pt-1">
                  <div class="col">
                    <h6>Topic</h6>
                    <p>{{ details.topic }}</p>
                  </div>
                </div>
                <div class="row pt-1">
                  <div class="col">
                    <h6>Time</h6>
                    <p>{{ details.date }}, {{ details.startTime }}-{{ details.endTime }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2 bg-primary"></div>
              <div class="col-10">
                <h6>Files</h6>
                <hr class="mt-0 mb-2 border-primary border-3" />
                <table
                  v-if="files.length !== 0"
                  class="table table-striped table-responsive text-center"
                >
                  <tbody>
                    <tr class="align-middle" v-for="(file, i) in files" :key="file.id">
                      <th scope="row">{{ i + 1 }}</th>
                      <td>{{ file.name }}</td>
                      <td>
                        <button @click="downloadFile(file.url)" class="btn btn-secondary align-end">
                          Download
                        </button>
                      </td>
                      <td>
                        <button @click="deleteFile(file.id)" class="btn btn-secondary align-end">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="col text-center pt-2 mt-2">
                  <form class="mb-2" @submit.prevent="uploadFile()">
                    <input ref="fileInput" @change="handleFileChange()" type="file" required />
                    <button type="submit" class="btn btn-secondary">Upload File</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2 bg-primary"></div>

              <div class="col-10 mb-2">
                <h6>Options</h6>
                <hr class="mt-0 mb-2 border-primary border-3" />
                <div v-if="details.createdByUser" class="text-center">
                  <button @click="deleteSession()" class="btn btn-secondary">Delete Session</button>
                </div>
                <div v-else class="text-center">
                  <button @click="leaveSession()" class="btn btn-secondary">Leave Session</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row d-flex align-items-center justify-content-center mb-5 pb-5">
        <div style="height: 300px; width: 400px">
          <l-map ref="map" :zoom="zoom" :center="center">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              name="OpenStreetMap"
            ></l-tile-layer>
            <l-marker v-if="marker !== null" :lat-lng="marker">
              <l-tooltip>
                <div class="text-center">
                  <h6>{{ room.building }}</h6>
                  <p>{{ room.address }}</p>
                </div>
              </l-tooltip>
            </l-marker>
          </l-map>
        </div>
      </div>
    </div>
  </div>
</template>
