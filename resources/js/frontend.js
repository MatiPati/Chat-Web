/*
* Chat APP front-end based on VUE-js framework
*
* Coded entirely by Mateusz Ożóg
* Github project: https://github.com/Azurixa/Chat-Web
*
* Covered under MIT licence
*/

window.Vue = require('vue');

Vue.component(
    'chat', require('./components/Chat.vue').default
);

Vue.component(
    'login', require('./components/Login.vue').default
);

const app = new Vue({
    el: '#app'
});