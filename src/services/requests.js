import api from './api';

export default {
  registration: userData => api().post('/registration', userData),
  authorization: userData => api().post('/authorization', userData),
  getUser: () => api().get('/user'),
  postProduct: product =>
    api().post('/product-create', product, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8;',
      },
    }),
  getProducts: params =>
    api().post('/products', {
      lat: params.lat,
      lng: params.lng,
      name: params.name,
      pageNumber: params.pageNumber,
    }),
  deleteProduct: id =>
    api().delete('/product', {
      data: {
        id: id,
      },
    }),
};
