<template>
    <li>
        <h4>{{ name }}</h4>
        <p>{{ description }}</p>
        <div v-if="completed">Status: complete</div>
        <div v-else>Status: In progress</div>
    </li>
</template>

<script>
export default {
    name: 'Task',
    props: ['id', 'name', 'description', 'completed', 'createdAt', 'updatedAt'],
};
</script>
