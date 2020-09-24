<template>
    <li class="task">
        <div class="task-completed-container">
            <input type="checkbox" id="checkbox" v-bind:value="completed" v-on:click="patchTask()" />
        </div>
        <div v-bind:class="{ complete: completed }">
            <router-link class="task-name" v-bind="{ to: `/tasks/${id}` }">
                {{ name }}
            </router-link>
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
    text-align: left;
}
.task-name {
    margin-top: 0;
    display: inline-block;
    font-weight: 700;
    font-size: 18px;
}
.task-completed-container {
    padding-right: 1em;
}
.complete {
    text-decoration: line-through;
    opacity: 0.6;
}
</style>
