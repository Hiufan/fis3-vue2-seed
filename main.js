import Vue from 'vue'
import router from './router'

const App = Vue.extend({
    template: '<router-view></router-view>'
});

const app = new Vue(Vue.util.extend({
  router
}, App))