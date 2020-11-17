<template>
    <div class="menu">
        <h1>Memory</h1>
        <label for="size-select">Wybierz poziom trudności</label>
        <select v-model="size" @change="generate">
            <option value="12">bardzo małe (6 par)</option>
            <option value="24">małe (12 par)</option>
            <option value="36">średnie (18 par)</option>
            <option value="48">duże (24 pary)</option>
            <option value="72">bardzo duże (36 par)</option>
            <option value="144"
                >naprawdę chce ci się w to bawić? (72 pary)</option
            >
            <option value="500"
                >Mam nadzieję, że tylko testujesz maksymalny rozmiar... (250
                par)</option
            >
        </select>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
    data() {
        return { size: "12" };
    },
    methods: {
        async generate(e?: Event) {
            await store.dispatch("generateCards", {
                size: parseInt(this.size, 10)
            });
        }
    },
    name: "game-menu",
    mounted() {
        this.generate();
    }
});
</script>

<style scoped></style>
