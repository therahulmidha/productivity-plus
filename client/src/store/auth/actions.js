import axios from "@/api/axios";
import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  REGISTER_ACTION,
  AUTH_ACTION,
  SET_USER_TOKEN_MUTATION,
  SHOW_LOADER_MUTATION,
  USER_DATA_LOCAL_STORAGE,
  AUTO_LOGOUT_ACTION,
  SET_AUTO_LOGOUT_MUTATION,
  AUTO_LOGIN_ACTION,
} from "../constants";
let tokenExpirationTimer = "";

export default {
  async [LOGIN_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: "/api/v1/auth/login",
    });
  },
  async [REGISTER_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: "/api/v1/auth/register",
    });
  },
  async [LOGOUT_ACTION](context, payload) {
    context.commit(SET_USER_TOKEN_MUTATION, {
      token: null,
      email: null,
      userId: null,
      refreshToken: null,
      expiresIn: null,
    });
    localStorage.removeItem(USER_DATA_LOCAL_STORAGE);
    if (tokenExpirationTimer) {
      clearTimeout(tokenExpirationTimer);
    }
  },
  async [AUTH_ACTION](context, payload) {
    const { email, password, url } = payload;

    context.commit(SHOW_LOADER_MUTATION, true, { root: true });
    let response;
    try {
      response = await axios.post(url, {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
      context.commit(SHOW_LOADER_MUTATION, false, { root: true });
      throw new Error(error);
    }

    context.commit(SHOW_LOADER_MUTATION, false, { root: true });
    if (response.status === 200 || response.status === 201) {
      let tokenData = {
        token: response.data.token,
        email: response.data.email,
        userId: response.data.userId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      };

      tokenExpirationTimer = setTimeout(() => {
        context.dispatch(AUTO_LOGOUT_ACTION);
      }, +tokenData.expiresIn);

      localStorage.setItem(USER_DATA_LOCAL_STORAGE, JSON.stringify(tokenData));
      context.commit(SET_USER_TOKEN_MUTATION, tokenData);
    } else if (response.status === 404) {
      throw new Error("User Does not exists");
    }
  },
  [AUTO_LOGIN_ACTION](context) {
    let userDataString = localStorage.getItem(USER_DATA_LOCAL_STORAGE);
    if (userDataString) {
      let userData = JSON.parse(userDataString);
      tokenExpirationTimer = setTimeout(() => {
        context.dispatch(AUTO_LOGOUT_ACTION);
      }, +userData.expiresIn);
      context.commit(SET_USER_TOKEN_MUTATION, userData);
    }
  },
  [AUTO_LOGOUT_ACTION](context) {
    context.dispatch(LOGOUT_ACTION);
    context.commit(SET_AUTO_LOGOUT_MUTATION);
  },
};
