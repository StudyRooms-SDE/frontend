<script lang="ts">
import { User } from '@/models/user';
import { useUserStore } from '@/stores/userStore';
import { mapActions } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegistrationView',

  setup() {
    return {};
  },
  data() {
    return {
      username: '',
      password: '',
      email: '',
    };
  },
  methods: {
    ...mapActions(useUserStore, ['register']),

    handleRegister() {
      this.register(new User(this.username, this.password, this.email))
        .then(() => {
          console.log('Registered!');
          this.$router.push('/');
        })
        .catch(() => {});
    },
  },
});
</script>

<template>
  <div class="container d-flex min-vh-100 justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-md-2"></div>
      <div class="col-md-8 p-0 shadow-lg rounded text-center">
        <form @submit.prevent="handleRegister()" class="border p-5 pb-3 bg-white">
          <h1 class="h4 m-1 mb-3 fw-bold">Enter your information below!</h1>
          <div class="form-floating m-3">
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="username"
              required
            />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating m-3">
            <input
              v-model="email"
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="email@email.com"
              required
            />
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating m-3">
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="password"
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button class="w-100 btn btn-lg btn-secondary mr-3" type="submit">Register</button>
          <div class="text-center bg-white mt-3">
            <router-link to="/" class="btn link-primary">Go back</router-link>
          </div>
        </form>

        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>
