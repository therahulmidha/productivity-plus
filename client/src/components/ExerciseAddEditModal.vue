<template>
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    v-if="modalAction"
    style="display: block"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalAction }} Exercise</h5>
          <button
            type="button"
            class="close btn btn-lg"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input placeholder="Name" class="form-control my-3" v-model="name" />
          <input
            placeholder="Duration (mm:ss)"
            class="form-control my-3"
            v-model="duration"
          />
          <input
            placeholder="Break (seconds)"
            class="form-control my-3"
            v-model="breakTime"
          />
          <div style="color: red" v-if="error">
            {{ error }}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="saveChanges()">
            Save
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="$emit('close')"
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
    action: String,
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      modalAction: this.action,
      id: this.data.id || "",
      name: this.data.name || "",
      duration: this.data.duration || "",
      breakTime: this.data.break || 0,
      error: "",
    };
  },
  methods: {
    saveChanges() {
      if (!this.name || !this.duration) {
        this.error = "Exercise name and duration are mandatory";
        return;
      }
      if (!this.duration.match(/\d\d:\d\d/)) {
        this.error = "Duration should be in format: mm:ss";
        return;
      }
      this.error = "";
      this.$emit("save-exercise", {
        name: this.name,
        duration: this.duration,
        break: this.breakTime,
        id: this.id,
      });
    },
  },
};
</script>

<style scoped>
</style>