import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false
window._ = require('lodash');

new Vue({
    render: h => h(App),
}).$mount('#app')