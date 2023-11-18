<template>
  <button>{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>
<style scoped>
button {
  background-color: #42b983;
  color: #fff;
  border-color: #fff;
  border-radius: 5px;
  width: min-content;
  height: min-content;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  padding: 7px;
}
</style>