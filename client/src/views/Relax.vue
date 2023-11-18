<template>
  <div
    class="relax d-flex flex-column align-items-center justify-content-center"
  >
    <div v-if="started && counter > 0" class="counter">{{ counter }}</div>
    <button v-if="!started" @click="start()" class="btn btn-success btn-lg">
      Start
    </button>
    <h3 v-if="started && counter > 0">Please Calm Down</h3>
    <div v-if="started && counter <= 0">
      <img src="@/assets/relax.gif" alt="a" class="gif"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      started: false,
      counter: 3,
    };
  },
  methods: {
    start() {
      this.started = true;
      const interval = setInterval(() => {
        this.counter--;
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 3500);
    },
  },
};
</script>

<style scoped>
.relax {
  height: 90vh;
}
.counter {
  font-size: 100px;
}
.gif {
    background-color: #fff;
}
</style>