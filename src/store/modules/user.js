import { setWithExpiry } from '../../helpers/helpers';
import requests from '../../services/requests';

const user = {
  state: {
    currentUser: null,
    currentCoordinates: {
      lat: 0,
      lng: 0,
    },
  },
  mutations: {
    updateCurrentUser: function (state, user) {
      state.currentUser = user;
    },
    logout: function (state) {
      localStorage.removeItem('token');
      state.currentUser = {};
    },
    updateCurrentCoordinates: function (state, coordinates) {
      state.currentCoordinates = {
        lat: coordinates.lat,
        lng: coordinates.lng,
      };
    },
  },
  actions: {
    registration: async function ({ dispatch }, newUser) {
      const response = await requests.registration(newUser);
      if (response.status === 201)
        dispatch('authorization', {
          email: newUser?.email,
          password: newUser?.password,
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
        commit('updateCurrentUser', data?.user);
      } catch (error) {
        throw new Error('user.js fetchCurrentUser() | ', error);
      }
    },
  },
  getters: {
    user: state => state.currentUser,
    currentCoordinates: state => state.currentCoordinates,
  },
};

export default user;
