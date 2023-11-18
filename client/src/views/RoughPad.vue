<template>
  <div class="roughpad-header">
    <h1>Rough Pad</h1>
    <div style="color: black" class="my-auto" v-if="info">
      {{ info }}
    </div>
    <div style="color: red" class="my-auto" v-if="error">
      {{ error }}
    </div>
    <Button text="Save" @click.prevent="saveRoughPad()"></Button>
  </div>
  <textarea v-model="text" />
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
      text: "",
      info: "",
      error: "",
    };
  },
  mounted() {
    axiosPrivate
      .get(`/api/v1/rough-pad`)
      .then((response) => {
        if (response.data.text) {
          this.text = response.data.text;
        }
      })
      .catch((error) => console.log(error));
  },
  methods: {
    saveRoughPad() {
      if (!this.text) {
        return;
      } else {
        this.error = "";
        axiosPrivate
          .put(`/api/v1/rough-pad`, {
            text: this.text,
          })
          .then((response) => {
            this.info = "Data Saved Successfully!";
          })
          .catch((error) => {
            console.log(error);
            this.error = "An Error occurred while saving the data";
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
.roughpad-header {
  display: flex;
  justify-content: space-between;
}

textarea {
  background-color: #fff8b8;
  width: 100%;
  height: 70vh;
  resize: none;
  border: none;
  outline: none;
}
</style>