<template>
  <ExerciseAddEditModal
    v-if="modalAction"
    :action="modalAction"
    :data="currentExerciseData"
    @save-exercise="saveExercise"
    @close="closeModal"
  />
  <ExerciseDeleteModal
    v-if="deletionId"
    :deletionId="deletionId"
    @confirm-delete="confirmDeletion"
  />
  <div class="d-flex justify-content-between">
    <h1 class="my-auto">Exercise Scheduler</h1>
    <div class="my-auto" style="color: black" v-if="info">
      {{ info }}
    </div>
    <div class="my-auto" style="color: red" v-if="error">{{ error }}</div>
    <button
      class="btn btn-success my-auto"
      @click="toggleStart()"
      :disabled="!exercises.length"
    >
      {{ started ? "Stop" : "Start" }}
    </button>
  </div>
  <div class="scheduler d-flex justify-content-evenly">
    <div class="col-md-4 mx-2 h-100 d-inline-block my-5">
      <div class="d-flex justify-content-between">
        <h3>Exercises</h3>

        <button
          type="button"
          @click="openModal('Add')"
          class="btn btn-primary my-auto"
          :disabled="started"
        >
          Add
        </button>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Duration</th>
            <th scope="col">Break</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody :key="ex.id" v-for="ex in exercises">
          <tr class="exercise-container">
            <td>{{ ex.name }}</td>
            <td>{{ ex.duration }}</td>
            <td>{{ ex.break }}</td>
            <td @click="openModal('Edit', ex)">
              <font-awesome-icon icon="fa-solid fa-edit" />
            </td>
            <td @click="openDeleteModal(ex.id)">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!exercises.length">
        <p class="text-center">No Exercises Added Yet!</p>
      </div>
    </div>
    <div class="col-md-6 mx-2">
      <div v-if="!started" class="exercise-start-info">
        {{ displayMessage }}
      </div>
      <div v-if="started" class="exercise-name">
        {{ runningExerciseName }}
      </div>
      <div v-if="started" class="exercise-duration">
        {{ runningExerciseDuration }}
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseAddEditModal from "@/components/ExerciseAddEditModal.vue";
import ExerciseDeleteModal from "@/components/ExerciseDeleteModal.vue";
import { axiosPrivate } from "@/api/axios";
export default {
  components: {
    ExerciseAddEditModal,
    ExerciseDeleteModal,
  },
  data() {
    return {
      exercises: [],
      noOfExercises: 0,
      error: "",
      info: "",
      modalAction: "",
      currentExerciseData: {},
      deletionId: null,
      displayMessage: "Add exercises to start a schedule!",
      started: false,
      runningExerciseName: "",
      runningExerciseDuration: null,
      runningTimeInSeconds: null,
      exerciseQueue: [],
      exerciseTimeout: null,
      sounds: {
        break: new Audio(require(`@/assets/audio/break_bell.mp3`)),
        startExercise: new Audio(require(`@/assets/audio/start_exercise.wav`)),
      },
    };
  },
  mounted() {
    axiosPrivate
      .get(`/api/v1/exercises`)
      .then((response) => {
        if (response.data.length) {
          this.exercises = response.data;
        }
      })
      .catch((error) => console.log(error));
  },
  watch: {
    runningTimeInSeconds(newVal, oldVal) {
      if (newVal === 0) {
        if (this.exerciseQueue.length) {
          this.prepareNextExerciseData();
        } else {
          // Reset when finished
          this.started = false;
          this.runningExerciseName = "";
          this.runningExerciseDuration = null;
          this.runningTimeInSeconds = null;
          this.displayMessage = "Well Done!";
        }
      } else {
        this.exerciseTimeout = setTimeout(() => {
          this.runningTimeInSeconds--;
          this.runningExerciseDuration = this.convertSecondsToStringTime(
            this.runningTimeInSeconds
          );
        }, 1000);
      }
    },
    noOfExercises(newVal) {
      if (!newVal) {
        this.displayMessage = "Add exercises to start a schedule!";
      } else {
        this.displayMessage = "Click the start button to start the schedule.";
      }
    },
  },
  methods: {
    convertSecondsToStringTime(seconds) {
      if (seconds > 60) {
        const minutes = Math.floor(seconds / 60);
        return (
          this.getDoubleDigitString(minutes) +
          ":" +
          this.getDoubleDigitString(seconds % 60)
        );
      } else {
        return "00:" + this.getDoubleDigitString(seconds);
      }
    },
    getDoubleDigitString(value) {
      return value < 10 ? "0" + value : value;
    },
    prepareNextExerciseData() {
      const runningExercise = this.exerciseQueue[0];
      this.runningExerciseName = runningExercise.name;
      this.runningExerciseDuration = runningExercise.duration;
      this.runningTimeInSeconds =
        +this.runningExerciseDuration.split(":")[0] * 60 +
        +this.runningExerciseDuration.split(":")[1];
      if (runningExercise.isBreak) {
        this.sounds.break.play();
      } else {
        this.sounds.startExercise.play();
      }
      this.exerciseQueue.splice(0, 1);
    },
    toggleStart() {
      this.started = !this.started;
      if (this.started) {
        this.exercises.forEach((ex) => {
          this.exerciseQueue.push({
            name: ex.name,
            duration: ex.duration,
            isBreak: false,
          });
          ex.break &&
            this.exerciseQueue.push({
              name: "Break",
              duration: this.convertSecondsToStringTime(ex.break),
              isBreak: true,
            });
        });
        this.prepareNextExerciseData();
      } else {
        this.exerciseQueue = [];
        clearTimeout(this.exerciseTimeout);
      }
    },
    openDeleteModal(exerciseId) {
      this.deletionId = exerciseId;
    },
    confirmDeletion(shouldDelete) {
      if (!shouldDelete) {
        this.deletionId = null;
        return;
      }
      const index = this.exercises.findIndex((ex) => ex.id === this.deletionId);
      if (index !== -1) {
        axiosPrivate
          .delete(`/api/v1/exercises/${this.deletionId}`)
          .then((response) => {
            if (response.status === 204) {
              this.exercises.splice(index, 1);
              this.noOfExercises = this.exercises.length;
            } else {
              this.error = "Error Deleting the exercise!";
              setTimeout(() => {
                this.error = "";
              }, 2000);
            }
          })
          .catch((error) => console.log(error));
      }
      this.deletionId = null;
    },
    openModal(action, exercise) {
      this.modalAction = action;
      if (exercise) {
        this.currentExerciseData = exercise;
      }
    },
    closeModal() {
      this.modalAction = "";
    },
    saveExercise(exercise) {
      this.modalAction = "";
      const existingIndex = this.exercises.findIndex(
        (ex) => ex.id === exercise.id
      );
      if (existingIndex !== -1) {
        axiosPrivate
          .put(
            `/api/v1/exercises/${this.exercises[existingIndex].id}`,
            exercise
          )
          .then((response) => {
            if (response.status === 204) {
              this.exercises[existingIndex].name = exercise.name;
              this.exercises[existingIndex].duration = exercise.duration;
              this.exercises[existingIndex].break = exercise.break;
            } else {
              this.error = "Error Updating the exercise!";
              setTimeout(() => {
                this.error = "";
              }, 2000);
            }
          })
          .catch((error) => console.log(error));
      } else {
        axiosPrivate
          .post(`/api/v1/exercises`, exercise)
          .then((response) => {
            if (response.data.id) {
              this.exercises.push(response.data);
              this.noOfExercises = this.exercises.length;
            } else {
              this.error = "Error Adding the exercise!";
              setTimeout(() => {
                this.error = "";
              }, 2000);
            }
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped>
.scheduler {
  height: 90vh;
}

.exercise-start-info {
  font-size: 70px;
}
.exercise-name {
  font-size: 100px;
}
.exercise-duration {
  font-size: 80px;
}
</style>