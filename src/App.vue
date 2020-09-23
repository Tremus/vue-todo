<template>
    <div id="app">
        <img src="./assets/logo.png" />
        <h1>{{ msg }}</h1>
        <h2>Tasks</h2>
        <div class="task-list-container">
            <ul>
                <Task
                    v-for="task in tasks"
                    v-bind:key="task.id"
                    v-bind:id="task.id"
                    v-bind:name="task.name"
                    v-bind:description="task.description"
                    v-bind:completed="task.completed"
                    v-bind:createdAt="task.createdAt"
                    v-bind:updatedAt="task.updatedAt"
                ></Task>
            </ul>
        </div>
    </div>
</template>

<script>
import Task from './Task';

export default {
    name: 'app',
    components: { Task },
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
