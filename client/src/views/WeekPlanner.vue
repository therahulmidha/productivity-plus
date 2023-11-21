<template>
  <div>
    <div class="planner-header">
      <h1>Week Planner</h1>
      <div style="color: black" class="my-auto" v-if="info">
        {{ info }}
      </div>
      <div style="color: red" class="my-auto" v-if="error">
        {{ error }}
      </div>
      <Button text="Save" @click="savePlanner()"> </Button>
    </div>
    <div class="week-planner">
      <div :key="day.id" v-for="day in weekData">
        <div class="day-container">
          <div
            class="day"
            :style="{
              backgroundColor: day.color,
              border:
                day.id === weekData.find((w) => w.name === today).id
                  ? `5px solid lightgrey`
                  : ``,
            }"
          >
            {{ day.name }}
          </div>
          <textarea rows="5" v-model="day.text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "@/components/Button.vue";
import { axiosPrivate } from "@/api/axios";

export default {
  components: {
    FontAwesomeIcon,
    Button,
  },
  data() {
    return {
      today: new Date().getDay(),
      weekData: [],
      info: "",
      error: "",
    };
  },
  computed: {},
  mounted() {
    axiosPrivate
      .get(`/api/v1/week-planner`)
      .then((response) => {
        if (response.data.today && response.data.weekData) {
          this.today = response.data.today;
          const order = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 7,
            Notes: 8,
          };
          this.weekData = [
            ...response.data.weekData.filter(
              (el) => order[el.name] >= order[this.today] && el.name !== "Notes"
            ),
            ...response.data.weekData.filter(
              (el) => order[el.name] < order[this.today] && el.name !== "Notes"
            ),
            ...response.data.weekData.filter((el) => el.name === "Notes"),
          ];
        }
      })
      .catch((error) => console.log(error));
  },
  methods: {
    savePlanner() {
      axiosPrivate
        .put(
          `/api/v1/week-planner`,
          this.weekData.map((data) => ({ name: data.name, text: data.text }))
        )
        .then(() => {
          this.info = "Data Saved Successfully";
        })
        .catch((error) => {
          console.log(error);
          this.error = "An Error occurred while saving the data";
        });
    },
  },
};
</script>

<style scoped>
.planner-header {
  display: flex;
  justify-content: space-between;
}
h1 {
  text-align: left;
}
@media (min-width: 320px) and (max-width: 480px) {
  button {
    margin-top: 20px;
    font-size: larger;
    height: 6vh;
    font-weight: bolder;
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
  }
}

.day-container {
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: center;
}
.day {
  width: 10%;
  margin: 10px;
  height: 150%;
  color: #fff;
  padding: 3vh;
  font-weight: bolder;
}

textarea {
  width: 40%;
  height: 150%;
  margin: 10px;
  border: none;
  outline: none;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
  resize: none;
  font-size: large;
}

@media (min-width: 320px) and (max-width: 480px) {
  .day-container {
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: center;
  }
  .day {
    width: 30%;
    height: 50%;
    color: #fff;
    font-size: small;
  }

  textarea {
    width: 80%;
    margin: 5px;
    border-left: 2px solid black;
    border-bottom: 2px solid black;
    resize: none;
  }
}
</style>