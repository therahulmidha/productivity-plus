<template>
  <div class="container-fluid">
    <Loader v-if="isLoading" />
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import Loader from "./components/Loader.vue";
import { mapState } from "vuex";
import { AUTO_LOGIN_ACTION } from "./store/constants";

export default {
  components: {
    Footer,
    Navbar,
    Loader,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      autoLogout: (state) => state.auth.autoLogout,
    }),
  },
  watch: {
    autoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/login");
      }
    },
  },
  created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  text-align: left;
}
.main-content {
  display: flex;
  min-height: 80vh;
}

</style>
