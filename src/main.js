// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from '../store'
import Vuex from  'vuex'



Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.use(Vuex);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });


  

new Vue({
  //这里要配置store
router, store:store,
render: function (h) { return h(App) }
}).$mount('#app')