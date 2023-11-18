export default class AuthValidations {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  checkValidations() {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.email
      )
    ) {
      return true;
    }
    return false;
  }
}
