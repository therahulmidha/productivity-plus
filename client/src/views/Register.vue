<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="row justify-content-center">
        <h1 class="col-4">Register</h1>
      </div>
      <div class="error alert-danger" v-if="errors.submitError">
        {{ errors.submitError }}
      </div>
      <form @submit.prevent="onRegister()">
        <div class="form-group my-3">
          <label for="">Email</label>
          <input type="text" class="form-control" v-model.trim="email" />
          <div class="error" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>
        <div class="form-group my-3">
          <label for="">Password</label>
          <input type="password" class="form-control" v-model.trim="password" />
          <div class="error" v-if="errors.password">
            {{ errors.password }}
          </div>
        </div>
        <div class="form-group my-3">
          <label for="">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            v-model.trim="confirmPassword"
          />
          <div class="error" v-if="errors.confirmPassword">
            {{ errors.confirmPassword }}
          </div>
        </div>
        <div class="my-3">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
import Button from "@/components/Button.vue";
import { REGISTER_ACTION } from "@/store/constants";
export default {
  components: {
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errors: {
        email: "",
        password: "",
        confirmPassword: "",
        submitError: "",
      },
    };
  },
  methods: {
    onRegister() {
      if (!this.email) {
        this.errors.email = "Email is required";
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
      ) {
        this.errors.email = "Please enter a valid email";
      } else {
        this.errors.email = "";
      }
      if (!this.password) {
        this.errors.password = "Password is required";
      } else if (this.password.length < 5) {
        this.errors.password = "Password must be atleast 5 characters long";
      } else {
        this.errors.password = "";
      }
      if (!this.confirmPassword) {
        this.errors.confirmPassword = "Please confirm your password";
      } else if (this.confirmPassword !== this.password) {
        this.errors.confirmPassword = "Passwords do not match";
      } else {
        this.errors.confirmPassword = "";
      }

      if (
        this.errors.email ||
        this.errors.password ||
        this.errors.confirmPassword
      ) {
        return;
      }

      this.$store
        .dispatch(`auth/${REGISTER_ACTION}`, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.replace("/relax");
        })
        .catch((error) => {
          this.errors.submitError = error;
        });
    },
  },
};
</script>
  
  <style scoped>
.error {
  color: red;
}
</style>