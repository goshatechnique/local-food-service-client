import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps';
import vueDebounce from 'vue-debounce';

Vue.config.productionTip = false;
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
  },
});
Vue.use(vueDebounce, {
  lock: true,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
