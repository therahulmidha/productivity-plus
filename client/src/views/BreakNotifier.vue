<template>
  <h1>Break Notifier</h1>
  <div class="break-notifier">
    <label>Notification Heading</label>
    <textarea
      cols="40"
      placeholder="Take break to give rest to eyes and mind"
      v-model="heading"
    />
    <label>Notification Text</label>
    <textarea
      cols="40"
      placeholder="Drink water and close eyes for 5 mins"
      v-model="text"
    />
    <label>Interval (in minutes)</label>
    <input type="number" v-model="interval" />
    <p>
      <span class="note">Note:</span>Please allow browser notifications to be
      able to receive notifications
    </p>
    <Button text="Save" @click.prevent="saveNotification()"></Button>
    <div style="color: black" v-if="info">
      {{ info }}
    </div>
    <div style="color: red" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { axiosPrivate } from "@/api/axios";

export default {
  components: {
    Button,
  },
  data() {
    return {
      heading: "",
      text: "",
      interval: 0,
      error: "",
      info: "",
      notificationInterval: null,
    };
  },
  mounted() {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    axiosPrivate
      .get(`/api/v1/notification`)
      .then((response) => {
        if (response.data.heading) {
          this.heading = response.data.heading;
          this.text = response.data.text;
          this.interval = response.data.interval;
          notificationInterval = setInterval(() => {
            new Notification(this.heading, {
              body: this.text,
              requireInteraction: true,
            });
          }, +this.interval * 60 * 1000);
        }
      })
      .catch((error) => console.log(error));
  },
  methods: {
    saveNotification() {
      if (!this.heading || !this.text || !this.interval) {
        this.error = "Please fill all the details!";
        return;
      } else if (this.interval < 1) {
        this.error = "Interval should be atleast 1 minute"
      }else {
        this.error = "";
        const { heading, text, interval } = this;
        axiosPrivate
          .put(`/api/v1/notification`, {
            heading,
            text,
            interval,
          })
          .then((response) => {
            this.info = "Notification Data Saved Successfully";
            new Notification("Break Notifications are active now", {
              body: `Heading: ${this.heading}, Text: ${this.text}, Interval: ${this.interval} minutes`,
              requireInteraction: true,
            });
          })
          .catch((error) => {
            console.log(error);
            this.error = "An Error occurred while saving the notification";
          });
      }
      setTimeout(() => {
        this.info = "";
        this.error = "";
      }, 2000);
    },
  },
};
</script>

<style scoped>
.break-notifier {
  display: flex;
  flex-direction: column;
  width: 50vw;
}
.break-notifier * {
  margin: 10px;
  text-align: left;
}

textarea,
input {
  width: 50%;
  resize: none;
}

.note {
  font-weight: bold;
  margin-left: 0;
}
</style>