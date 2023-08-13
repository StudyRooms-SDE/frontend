<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { mapActions, mapState } from 'pinia';
import ModalComponent from '@/components/ModalComponent.vue';

export default defineComponent({
  name: 'ProfileView',
  components: { ModalComponent },

  computed: {
    ...mapState(useUserStore, ['getUser']),
  },
  methods: {
    ...mapActions(useUserStore, ['getUserInfo']),

    async deleteUser() {
      //@ts-ignore
      const response = await this.$refs.confirmDialogue.open({
        modalId: 'deleteProfile',
        title: 'Delete your profile',
        message: 'Are you sure you want to delete your account? This action will be permanent.',
      });
      console.log(response);
      if (response) {
        console.log('Deleting user...');
      } else {
        console.log('Cancelled!');
      }
    },
  },

  mounted() {
    this.getUserInfo()
      .then(() => {
        console.log('Got user info!');
      })
      .catch(() => {});
  },
});
</script>

<template>
  <div class="container py-5">
    <div class="row d-flex justify-content-center align-items-center min-vh-100">
      <div class="col col-lg-8 mb-4 mb-lg-0">
        <div class="card mb-3" style="border-radius: 0.5rem">
          <div class="row g-0">
            <div class="col-md-3 bg-primary bg-gradient"></div>
            <div class="col-md-9">
              <div class="card-body p-4">
                <h6>Information</h6>
                <hr class="mt-0 mb-4" />
                <div class="row pt-1">
                  <div class="col mb-3">
                    <h6>Username</h6>
                    <p>{{ getUser?.username }}</p>
                  </div>
                </div>
                <div class="row pt-1">
                  <div class="col mb-3">
                    <h6>Email</h6>
                    <p>{{ getUser?.email }}</p>
                  </div>
                </div>

                <h6>Options</h6>
                <hr class="mt-0 mb-4" />

                <div class="row pt-1">
                  <div class="col mb-3">
                    <button type="button" class="btn btn-secondary h-100 w-100" @click="deleteUser">
                      Delete your profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalComponent ref="confirmDialogue"></ModalComponent>
</template>
