<template>
    <div id="app">
        <Modal v-if="modal" v-bind:close="toggleModal">
            <p slot="content">hello</p>
        </Modal>
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
                    v-bind:patchTask="patchTask(task)"
                ></Task>
            </ul>
            <button @click="toggleModal()">New Task</button>
        </div>
    </div>
</template>

<script>
import Task from './Task';
import Modal from './Modal';

export default {
    name: 'app',
    components: { Task, Modal },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            tasks: [],
            modal: false,
        };
    },
    mounted() {
        this.getTasks();
    },
    methods: {
        getTasks() {
            fetch('http://localhost:8080/api/tasks')
                .then(res => res.json())
                .then(data => {
                    this.tasks = data.tasks;
                });
        },
        patchTask(task) {
            return () => {
                const body = { completed: !task.completed };
                fetch(`http://localhost:8080/api/tasks/${task.id}`, {
                    method: 'PATCH',
                    headers: {
                        ['Content-Type']: 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                    .then(res => res.json())
                    .then(data => {
                        task.completed = data.task.completed;
                    });
            };
        },
        toggleModal() {
            this.modal = !this.modal;
        },
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
li {
    list-style: none;
}
button {
    cursor: pointer;
}
</style>
