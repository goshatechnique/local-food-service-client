import { setWithExpiry } from '../../helpers/helpers';
import requests from '../../services/requests';

const user = {
  state: {
    currentUser: null,
    currentCoordinates: {
      lat: 53.7169,
      lng: 27.9775,
    },
  },
  mutations: {
    updateCurrentUser: function (state, user) {
      state.currentUser = user;
    },
    logout: function (state) {
      localStorage.removeItem('token');
      state.currentUser = null;
      state.currentCoordinates = {
        lat: 53.7169,
        lng: 27.9775,
      };
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
        _id: data?.user?._id,
        email: data?.user?.email,
        phoneNumber: data?.user?.phoneNumber,
        country: data?.user?.country,
        city: data?.user?.city,
        accountType: data?.user?.accountType,
      });
    },
    fetchCurrentUser: async function ({ commit }) {
      try {
        const { data } = await requests.getUser();
        commit('updateCurrentUser', data);
      } catch (error) {
        console.error('user.js fetchCurrentUser() | ', error);
      }
    },
  },
  getters: {
    user: state => state.currentUser,
    currentCoordinates: state => state.currentCoordinates,
    users: state => state.users,
  },
};

export default user;
