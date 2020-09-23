<template>
    <div id="app">
        <img src="./assets/logo.png" />
        <h1>{{ msg }}</h1>
        <h2>Tasks</h2>
        <div class="task-list-container">
            <ol>
                <task-item v-for="task in tasks" v-bind:task="task" v-bind:key="task.id"></task-item>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            tasks: [],
        };
    },
    mounted() {
        fetch('http://localhost:8080/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.tasks = data.tasks;
            });
    },
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.task-list-container {
    max-width: 400px;
    margin: auto;
}
</style>
