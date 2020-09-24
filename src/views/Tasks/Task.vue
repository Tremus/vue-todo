<template>
    <div>
        <nav id="nav">
            <img class="nav-logo" src="../../assets/logo.png" height="40" />
            <button class="back-button" @click="goBack">Back to task list</button>
        </nav>
        <div>Task {{ $route.params.id }}</div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
        },
    },
};
</script>

<style scoped>
nav {
    display: flex;
    padding-left: 2em;
    padding-top: 8px;
    text-align: left;
}
.back-button {
    border: 0;
    background: none;
}
</style>
