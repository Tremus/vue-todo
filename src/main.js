import Vue from 'vue';
import VueRouter from 'vue-router';
import VueHead from 'vue-head';

import App from './App.vue';

Vue.use(VueRouter);
Vue.use(VueHead);

new Vue({
    el: '#app',
    render: h => h(App),
});
