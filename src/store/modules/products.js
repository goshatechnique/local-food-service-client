import requests from '../../services/requests';

const products = {
  state: {
    productsList: [],
    searchString: '',
    pageNumber: 1,
  },
  mutations: {
    updateProductsList: function (state, { products, pageNumber }) {
      if (pageNumber === 1) {
        state.productsList = products;
      } else {
        state.productsList = state.productsList.concat(products);
      }
    },
    addProductManual: function (state, newProduct) {
      state.productsList.push(newProduct);
    },
    deleteProductManual: function (state, id) {
      state.productsList = state.productsList.filter(
        product => product._id !== id,
      );
    },
    updateSearchString: function (state, value) {
      state.searchString = value;
    },
    updatePageNumber: function (state, value) {
      state.pageNumber = value;
    },
  },
  actions: {
    postProduct: async function ({ commit }, newProduct) {
      try {
        const response = await requests.postProduct(newProduct);
        if (response.status === 201) commit('addProductManual', newProduct);
      } catch (error) {
        throw new Error('products.js postProduct() | ', error);
      }
    },
    fetchProducts: async function ({ commit }, params) {
      try {
        const response = await requests.getProducts(params);
        if (response.status === 200)
          commit('updateProductsList', {
            products: response?.data?.products,
            pageNumber: response?.data?.pageNumber,
          });
      } catch (error) {
        throw new Error('products.js postProduct() | ', error);
      }
    },
    deleteProduct: async function ({ commit }, id) {
      await requests.deleteProduct(id);
      commit('deleteProductManual', id);
    },
  },
  getters: {
    productsList: state => state.productsList,
    searchString: state => state.searchString,
    pageNumber: state => state.pageNumber,
  },
};

export default products;
