import Vue, { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faCheck,
  faClock,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css";

library.add([faClock, faBars, faCheck, faTrash, faEdit]);

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
