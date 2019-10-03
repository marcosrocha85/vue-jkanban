import Vue from 'vue';
import VueJKanban from './components/vue-jkanban';

window.Vue = Vue

window.Vue.component('jkanban', VueJKanban);

new window.Vue({
  el: '#app'
})