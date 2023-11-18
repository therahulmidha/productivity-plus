import {
  SET_USER_TOKEN_MUTATION,
  SET_AUTO_LOGOUT_MUTATION,
} from "../constants";
export default {
  [SET_USER_TOKEN_MUTATION](state, payload) {
    state.token = payload.token;
    state.email = payload.email;
    state.userId = payload.userId;
    state.refreshToken = payload.refreshToken;
    state.expiresIn = payload.expiresIn;
    state.autoLogout = false;
  },
  [SET_AUTO_LOGOUT_MUTATION](state) {
    state.autoLogout = true;
  },
};
