<template>
    <div class="page">
        <nav id="nav">
            <img class="nav-logo" src="../../assets/logo.png" height="40" />
            <button class="back-button" @click="goBack">Back to task list</button>
        </nav>
        <Modal v-if="modal" v-bind:close="toggleModal">
            <div slot="content">
                <p>Are you sure?</p>
                <button @click="toggleModal">No</button>
                <button @click="deleteTask">Yes</button>
            </div>
        </Modal>
        <div>
            <div v-if="loaded">
                <h1>{{ task.name }}</h1>
                <p>{{ task.description }}</p>
            </div>
            <div v-else>Loading...</div>
        </div>
        <footer>
            <button class="delete-button" v-if="loaded" @click="toggleModal">DELETE</button>
        </footer>
    </div>
</template>

<script>
import Modal from '../../Modal';

export default {
    components: { Modal },
    data() {
        return {
            loaded: false,
            modal: false,
            task: null,
        };
    },
    mounted() {
        this.getTask();
    },
    methods: {
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
        },
        getTask() {
            fetch(`http://localhost:8080/api/tasks/${this.$route.params.id}`)
                .then(res => res.json())
                .then(data => {
                    this.task = data.task;
                    this.loaded = true;
                });
        },
        deleteTask() {
            fetch(`http://localhost:8080/api/tasks/${this.$route.params.id}`, {
                method: 'DELETE',
            }).then(res => {
                if (res.ok) {
                    this.goBack();
                } else {
                    throw new Error(`Unhandled status code ${res.status}`);
                }
            });
        },
        toggleModal() {
            this.modal = !this.modal;
        },
    },
};
</script>

<style scoped>
nav {
    display: flex;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 8px;
    text-align: left;
    max-width: 1000px;
    margin: auto;
    margin-bottom: 4em;
    box-sizing: border-box;
}
footer {
    margin-top: auto;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-bottom: 8px;
    padding-left: 1em;
    padding-right: 1em;
    box-sizing: border-box;
}
.back-button {
    border: 0;
    background: none;
}
.delete-button {
    border: 0;
    background-color: #ff5252;
    color: white;
    border-radius: 6px;
    padding: 8px;
    float: right;
}
</style>
