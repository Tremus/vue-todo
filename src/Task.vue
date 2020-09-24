<template>
    <li class="task">
        <div class="task-completed-container">
            <input type="checkbox" id="checkbox" v-bind:value="completed" v-on:click="patchTask()" />
        </div>
        <div v-bind:class="{ complete: completed }">
            <h4 class="task-name">{{ name }}</h4>
            <p v-if="description">{{ description }}</p>
        </div>
    </li>
</template>

<script>
export default {
    name: 'Task',
    props: ['id', 'name', 'description', 'completed', 'createdAt', 'updatedAt', 'patchTask'],
};
</script>

<style scoped>
.task {
    display: flex;
}
.task-name {
    margin-top: 0;
}
.task-completed-container {
    padding-right: 1em;
}
.complete {
    text-decoration: line-through;
    opacity: 0.6;
}
</style>
