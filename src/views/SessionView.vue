<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from '@/stores/sessionStore';
import { mapState, mapActions } from 'pinia';
import { DateTime } from 'luxon';
import type { roomResponse } from '@/models/roomResponse';
import type { fileResponse } from '@/models/fileResponse';
import { PrintableSession } from '@/models/session';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet';
import { LatLng, type PointExpression } from 'leaflet';

export default defineComponent({
  name: 'SessionView',
  data: () => ({
    details: {} as PrintableSession,
    room: {} as roomResponse,
    files: [] as fileResponse[],
    center: [46.06777, 11.12355] as PointExpression,
    marker: null as LatLng | null,
    zoom: 13,
  }),
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
    console.log(this.id);
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
    ...mapActions(useSessionStore, ['sessionDetails']),

    downloadFile(url: string) {
      window.open(url, '_blank');
    },

    deleteFile(fileId: string) {
      console.log('not implemented');
    },

    deleteSession(sessionId: string) {
      console.log('not implemented');
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
                  <hr class="mt-0 mb-2 border-secondary border-3" />
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
                <hr class="mt-0 mb-2 border-secondary border-3" />
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
            <div v-if="files.length !== 0" class="row">
              <div class="col-2 bg-primary"></div>
              <div class="col-10">
                <h6>Files</h6>
                <hr class="mt-0 mb-2 border-secondary border-3" />
                <table class="table table-striped table-responsive text-center">
                  <!-- <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">File Name</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead> -->
                  <tbody>
                    <tr class="align-middle" v-for="(file, i) in files" :key="file.id">
                      <th scope="row">{{ i + 1 }}</th>
                      <td>{{ file.name }}</td>
                      <td>
                        <button @click="downloadFile(file.url)" class="btn btn-primary align-end">
                          Download
                        </button>
                      </td>
                      <td>
                        <button
                          v-if="details.createdByUser"
                          @click="deleteFile(file.id)"
                          class="btn btn-primary align-end"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="details.createdByUser" class="row">
              <div class="col-2 bg-primary"></div>
              <div class="col-10">
                <div class="col-2 bg-primary"></div>
                <div class="col-10 text-center">
                  <button @click="deleteSession(details.sessionId)" class="btn btn-primary">
                    Delete Session
                  </button>
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
                  <h6>{{ room.name }}</h6>
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
