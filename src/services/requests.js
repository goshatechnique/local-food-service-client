import api from './api';

export default {
  registration: (userData) => api().post('/registration', userData),
  authorization: (userData) => api().post('/authorization', userData),
  delete: (id) => api().delete('/delete', id),
  getUser: () => api().get('/user'),
};
