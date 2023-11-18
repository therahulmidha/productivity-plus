<template>
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    style="display: block"
    v-if="deletionId"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Exercise</h5>
          <button
            type="button"
            class="close btn btn-lg"
            data-dismiss="modal"
            aria-label="Close"
            @click="deleteExercise(false)"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this exercise?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="deleteExercise(true)"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="deleteExercise(false)"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "ExerciseAddEditModal",
  props: {
    deletionId: String,
  },
  methods: {
    deleteExercise(shouldDelete) {
      this.$emit("confirm-delete", shouldDelete);
    },
  },
};
</script>
  
  <style scoped>
</style>