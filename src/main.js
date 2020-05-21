import Vue from 'vue'
import App from './App.vue'
import './icons';

// for bootstrap
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  render: h => h(App)
})
