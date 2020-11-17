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
            if (!this.revealed)
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

<style>
.card {
    width: 100%;
    height: 10vw;
    background-color: aqua;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}
.card.revealed {
    background-color: rgba(0, 255, 255, 0.2);
}
.card-text {
    font-size: 2rem;
    font-weight: 800;
    text-transform: uppercase;
}
</style>
