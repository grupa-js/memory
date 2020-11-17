<template>
    <div class="card" :class="{ revealed }" @click="reveal">
        <span class="card-text" :class="{ revealed }">{{
            revealed ? name : ""
        }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import store from "../store";

export default defineComponent({
    methods: {
        async reveal(e: Event) {
            await store.dispatch("revealCard", { index: this.index });
        }
    },
    name: "memory-card",
    props: {
        index: { type: Number, required: true },
        name: { type: String, required: true },
        revealed: { type: Boolean, required: false }
    }
});
</script>

<style scoped>
.card {
    min-width: 10vw;
    widows: 100%;
    min-height: 10vw;
    height: 100%;
    background-color: aqua;
}
</style>
