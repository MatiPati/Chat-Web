window.Vue = require('vue');

Vue.component(
    'chat', require('./components/Chat.vue').default
);

const app = new Vue({
    el: '#app'
});