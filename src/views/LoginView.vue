<script lang="ts">
import { useUserStore } from '@/stores/userStore';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginView',

  data() {
    return {
      username: "",
      password: ""
    }
  },

  computed: {
    ...mapState(useUserStore, ['getUser'])
  },
  methods: {
    ...mapActions(useUserStore, ['login']),

    handleLogin() {
      this.login(this.username, this.password)
        .then(() => {
          console.log("Logged in!")
          this.$router.push('/dashboard')
        }).catch(() => { })
    },
  }
})
</script>

<template>
  <div class="container d-flex min-vh-100 justify-content-center align-items-center" style="flex-direction: column;">

    <div class="row w-100 ">
      <div class="col-md-2"></div>
      <div class="col-md-8 p-0 shadow-lg rounded text-center ">

        <form @submit.prevent="handleLogin()" class="border p-5 bg-white ">
          <h1 class="h4 m-1 mb-3 fw-bold">Sign in!</h1>
          <div class="form-floating m-3">
            <input v-model="username" type="text" class="form-control" id="floatingInput" placeholder="username" required>
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating m-3">
            <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="password"
              required>
            <label for="floatingPassword">Password</label>
          </div>
          <button class="w-100 btn btn-lg btn-secondary mr-3" type="submit">Sign in</button>
        </form>

      </div>
      <div class="col-md-2"></div>

    </div>

    <div class="row w-100">
      <div class="col-md-2"></div>

      <div class="col-md-8 bg-primary bg-gradient p-0 shadow-lg rounded">
        <div class="text-center p-5">
          <h1 class="h4 mb-3 fw-bold">Welcome to StudyRooms!</h1>
          <p class="lead">StudyRooms is a platform for students to find study partners and study rooms.</p>

          <h1 class="h4 mb-3 fw-normal">Don't have an account?</h1>
          <router-link to="/register" class="w-100 btn btn-lg btn-secondary">Register</router-link>
        </div>
      </div>
      <div class="col-md-2"></div>

    </div>
  </div>
</template>
