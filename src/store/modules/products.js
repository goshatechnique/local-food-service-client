import requests from '../../services/requests';

const products = {
  state: {
    productsList: [],
  },
  mutations: {
    updateProductsList: function (state, products) {
      state.productsList = products;
    },
    addProductManual: function (state, newProduct) {
      state.productsList.push(newProduct);
    },
  },
  actions: {
    postProduct: async function ({ commit }, newProduct) {
      try {
        const response = await requests.postProduct(newProduct);
        if (response.status === 201) commit('addProductManual', newProduct);
      } catch (error) {
        console.error('products.js postProduct() | Error: ', error);
      }
    },
    fetchProducts: async function ({ commit }, params) {
      const response = await requests.getProducts(params);
      commit('updateProductsList', response.data);
    },
  },
  getters: {
    productsList: state => state.productsList,
  },
};

export default products;
