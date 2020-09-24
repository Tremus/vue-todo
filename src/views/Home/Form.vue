<template>
    <form novalidate @submit="handleSubmit">
        <input class="form-name" type="text" placeholder="New Task" v-model="name" />
        <textarea class="form-description" placeholder="About the task..." v-model="description" />
        <button type="submit">Submit</button>
    </form>
</template>

<script>
export default {
    name: 'Form',
    props: ['postTask'],
    data() {
        return {
            name: '',
            description: '',
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.postTask(this.name, this.description);
        },
    },
};
</script>

<style scoped>
.form-name {
    width: 100%;
    margin-bottom: 1em;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
}
.form-description {
    width: 100%;
    margin-bottom: 1em;
}
</style>
