<template>
  <div class="header">
    <div><font-awesome-icon icon="fa-solid fa-clock" /></div>
    <h1>Productivity Tools</h1>
    <div class="options"><font-awesome-icon icon="fa-solid fa-bars" /></div>
  </div>
  <hr />
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.header * {
  margin: 10px;
}

.options {
  display: none;
}

@media (min-width: 320px) and (max-width: 480px) {
  .options {
    display: block;
  }
}
</style>