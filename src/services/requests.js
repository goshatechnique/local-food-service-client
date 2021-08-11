import api from './api';

export default {
  registration: userData => api().post('/registration', userData),
  authorization: userData => api().post('/authorization', userData),
  delete: id => api().delete('/delete', id),
  getUser: () => api().get('/user'),
  postProduct: product => api().post('/product-create', product),
  getProducts: params =>
    api().post('/products', {
      lat: params.lat,
      lng: params.lng,
      name: params.name,
    }),
};
