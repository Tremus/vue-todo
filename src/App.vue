<script>
import Home from './views/Home/Home';

const routes = {
    '/': Home,
};

export default {
    name: 'app',
    data() {
        return {
            currentRoute: window.location.pathname,
        };
    },
    computed: {
        ViewComponent() {
            return routes[this.currentRoute];
        },
    },
    render(h) {
        return h(this.ViewComponent);
    },
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
li {
    list-style: none;
}
button {
    cursor: pointer;
}
input,
textarea {
    border: 0;
    padding: 0;
    font-family: inherit;
}
input:focus,
textarea:focus {
    outline: none;
}
</style>
