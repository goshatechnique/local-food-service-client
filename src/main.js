import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;
Vue.use(VueGeolocation);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDke9_thfnuXSroN-i5h62iRCumyjiESN8',
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
