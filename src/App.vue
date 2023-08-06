<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from './stores/userStore';
import { mapActions, mapState } from 'pinia';

export default defineComponent({
  name: 'App',
  computed: {
      ...mapState(useUserStore, ['getLoggedIn'])
  },
  methods: {
    ...mapActions(useUserStore, ['logout'])
  }
});
</script>

<template>
  <nav v-if="getLoggedIn" class="navbar navbar-expand navbar-dark fixed-top bg-dark" aria-label="Second navbar example">
    <div class="container-fluid">
      <router-link to="/dashboard" class="navbar-brand">StudyRooms</router-link>

      <div class="collapse navbar-collapse" id="navbarsExample02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Profile</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown01">
              <!-- <li><router-link class="dropdown-item" to="/dashboard">Settings</router-link></li> -->
              <li> <a class="dropdown-item" href="#"> Settings</a></li>
              <li><a class="dropdown-item" @click="logout()">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
    
  <nav v-else class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">StudyRooms</router-link>
  </div>
</nav>
<notifications position="top right" classes="alert alert-warning" />
  <RouterView />
</template>


