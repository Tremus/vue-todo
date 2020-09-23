import Vue from 'vue';
import App from './App.vue';

Vue.component('task-item', {
    props: ['task'],
    template: '<li>{{ task.name }}</li>',
});

new Vue({
    el: '#app',
    render: h => h(App),
});
