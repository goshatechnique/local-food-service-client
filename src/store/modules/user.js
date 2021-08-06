import { setWithExpiry } from '../../helpers/storage';
import requests from '../../services/requests';

const user = {
  state: {
    currentUser: null,
  },
  mutations: {
    updateCurrentUser: function (state, user) {
      state.currentUser = user;
    },
    logout: function (state) {
      localStorage.removeItem('token');
      state.currentUser = {};
    },
  },
  actions: {
    registration: async function ({ dispatch }, newUser) {
      const response = await requests.registration(newUser);
      if (response.status === 201)
        dispatch('authorization', {
          email: newUser.email,
          password: newUser.password,
        });
    },
    authorization: async function ({ commit }, userData) {
      const { data } = await requests.authorization(userData);
      setWithExpiry('token', data.token);
      commit('updateCurrentUser', {
        id: data?.user?._id,
        email: data?.user?.email,
        country: data?.user?.country,
        city: data?.user?.city,
        accountType: data?.user?.accountType,
      });
    },
    fetchCurrentUser: async function ({ commit }) {
      try {
        const { data } = await requests.getUser();
        commit('updateCurrentUser', data.user);
      } catch (error) {
        console.error('user.js fetchCurrentUser() | Error: ', error);
      }
    },
  },
  getters: {
    user: (state) => state.currentUser,
  },
};

export default user;
