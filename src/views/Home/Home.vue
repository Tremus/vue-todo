<template>
    <div>
        <Modal v-if="modal" v-bind:close="toggleModal">
            <Form slot="content" v-bind:postTask="postTask"></Form>
        </Modal>
        <img src="../../assets/logo.png" />
        <h1>Tasks</h1>
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
import Modal from '../../Modal';
import Task from './Task';
import Form from './Form';

export default {
    name: 'Home',
    components: { Task, Modal, Form },
    data() {
        return {
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
        postTask(name, description) {
            const body = { name, description };
            fetch('http://localhost:8080/api/tasks', {
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
    },
};
</script>

<style scoped>
.task-list-container {
    max-width: 400px;
    margin: auto;
}
</style>
