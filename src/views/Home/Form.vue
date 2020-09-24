<template>
    <form novalidate @submit.prevent="handleSubmit">
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
        handleSubmit() {
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
    min-height: 150px;
    margin-bottom: 1em;
    border: 1px solid #a5a5a5;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 6px;
}
</style>
