<template>
    <div class="card" :class="{ revealed, found }" @click="reveal">
        <a
            :href="found ? link : '#'"
            target="_blank"
            class="card-text"
            :class="{ revealed, found }"
            >{{ revealed ? name : "" }}</a
        ><span class="description">{{ revealed ? description : "" }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import store from "../store";

export default defineComponent({
    methods: {
        async reveal(e: Event) {
            if (!this.revealed && !this.found)
                await store.dispatch("revealCard", { index: this.index });
        }
    },
    name: "memory-card",
    props: {
        index: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String, required: false },
        revealed: { type: Boolean, required: true },
        found: { type: Boolean, required: true },
        link: { type: String, required: false }
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
    position: relative;
}
.card.revealed {
    background-color: rgba(0, 255, 255, 0.4);
}
.card.found {
    background-color: rgba(0, 255, 255, 0.15);
}
.card-text {
    color: #000;
    font-size: 2rem;
    font-weight: 800;
    text-transform: uppercase;
    text-decoration: none;
}
.description {
    position: absolute;
    display: block;
    border-radius: 5px;
    padding: 0.1rem;
    background-color: rgba(255, 255, 255, 0.8);
    color: #000;
    text-align: center;
    left: 0;
    right: 0;
    width: 100%;
    font-size: 1.5rem;
    font-weight: 600;
    top: -1.5rem;
    left: auto;
    visibility: hidden;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
}
.card.revealed:hover .description {
    visibility: visible;
}
</style>
