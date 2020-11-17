<template>
    <game-menu />
    <card-grid />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CardGrid from "./components/CardGrid.vue";
import Menu from "./components/Menu.vue";
export default defineComponent({
    name: "App",
    components: {
        "game-menu": Menu,
        "card-grid": CardGrid
    }
});
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: 0;
}
* {
    box-sizing: border-box;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
