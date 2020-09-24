<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import VueRouter from 'vue-router';

import Home from './views/Home/Home';
import Task from './views/Tasks/Task';

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/tasks/:id', component: Task },
    ],
});

export default {
    name: 'app',
    router,
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
}
body {
    margin: 0;
}
li {
    list-style: none;
}
button {
    cursor: pointer;
}
input,
textarea {
    border: 0;
    padding: 0;
    font-family: inherit;
}
input:focus,
textarea:focus,
button:focus {
    outline: none;
}
</style>
