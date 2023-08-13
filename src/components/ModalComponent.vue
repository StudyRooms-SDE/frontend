<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ModalComponent',

  data: () => ({
    isVisible: true,
    modalId: '',
    title: '',
    message: '',
    resolvePromise: null as any,
    rejectPromise: null as any,
  }),

  methods: {
    open(data: { modalId: string; title: string; message: string }): Promise<boolean> {
      this.modalId = data.modalId;
      this.title = data.title;
      this.message = data.message;
      this.isVisible = true;
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    close() {
      this.isVisible = false;
    },

    confirm() {
      this.close();
      this.resolvePromise(true);
    },

    cancel() {
      this.close();
      this.resolvePromise(false);
    },
  },
});
</script>

<template>
  <div
    v-if="isVisible"
    class="modal fade"
    id="deleteProfile"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancel">Close</button>
          <button type="button" class="btn btn-primary" @click="confirm">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
