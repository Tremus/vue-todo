<template>
    <div class="modal">
        <div class="modal-vignette" @click="close()"></div>
        <div class="modal-container">
            <div class="modal-content">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: ['close'],
};
</script>

<style scoped>
.modal {
    display: flex;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
}
.modal-vignette {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
}
.modal-container {
    margin: auto;
    vertical-align: middle;
    position: relative;
}
.modal-content {
    background-color: white;
    padding: 1em;
    border-radius: 6px;
    min-width: 200px;
}
</style>
