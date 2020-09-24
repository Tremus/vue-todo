<template>
    <div class="page">
        <img src="../assets/logo.png" />
        <h1>Tasks</h1>
        <div class="task-list-container">
            <div style="text-align: right;">
                <input type="checkbox" id="hideCompleted" v-model="hideCompleted" />
                <label for="hideCompleted">Hide completed</label>
            </div>
            <ul class="task-list">
                <Task
                    v-for="task in activeTasks"
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
        <Modal v-if="modal" v-bind:close="toggleModal">
            <Form slot="content" v-bind:postTask="postTask"></Form>
        </Modal>
    </div>
</template>

<script>
import Modal from '../components/Modal';
import Task from '../components/Task';
import Form from '../components/Form';

export default {
    name: 'Home',
    components: { Task, Modal, Form },
    head() {
        return {
            title: 'TODO List',
            link: [{ rel: 'icon', href: require('../assets/logo.png'), type: 'image/png' }],
        };
    },
    data() {
        return {
            tasks: [],
            modal: false,
            hideCompleted: false,
        };
    },
    mounted() {
        this.getTasks();
    },
    methods: {
        getTasks() {
            fetch('http://localhost:3000/api/tasks')
                .then(res => res.json())
                .then(data => {
                    this.tasks = data.tasks;
                });
        },
        patchTask(task) {
            return () => {
                const body = { completed: !task.completed };
                fetch(`http://localhost:3000/api/tasks/${task.id}`, {
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
        postTask(name, description) {
            const body = { name, description };
            fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    ['Content-Type']: 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(res => res.json())
                .then(data => {
                    this.tasks.push(data.task);
                    this.modal = false;
                });
        },
        toggleModal() {
            this.modal = !this.modal;
        },
        toggleHideCompleted() {
            this.hideCompleted = !this.hideCompleted;
        },
    },
    computed: {
        activeTasks() {
            if (!this.hideCompleted) {
                return this.tasks;
            } else {
                return this.tasks.filter(t => !t.completed);
            }
        },
    },
};
</script>

<style scoped>
.task-list-container {
    max-width: 400px;
    margin: auto;
    margin-bottom: 6em;
}
.task-list {
    margin-top: 2em;
}
</style>
