<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand p-logo" to="/"> Productivity+ </router-link>
    
    <div
      class="collapse navbar-collapse d-flex justify-content-between"
      id="navbarText"
    >
      <ul class="navbar-nav mr-auto" v-if="isAuthenticated">
        <li class="nav-item">
          <router-link to="/relax" class="nav-link">Relax</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/break-notifier" class="nav-link"
            >Break Notifier</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/week-planner" class="nav-link"
            >Week Planner</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/rough-pad" class="nav-link">Rough Pad</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/exercise-scheduler" class="nav-link"
            >Exercise Scheduler</router-link
          >
        </li>
      </ul>
      <ul></ul>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a href="#" @click.prevent="onLogout()" style="text-decoration: none"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { IS_USER_AUTHENTICATED_GETTER, LOGOUT_ACTION } from "@/store/constants";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", {
      isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
    }),
  },
  methods: {
    ...mapActions("auth", {
      logout: LOGOUT_ACTION,
    }),
    onLogout() {
      this.logout();
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.p-logo{
 color: #42b983;
}
</style>