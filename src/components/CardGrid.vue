<template>
    <div class="card-grid" :class="'size-' + cards.length">
        <memory-card
            v-for="(card, index) in cards"
            :key="index"
            :index="index"
            :name="card.name"
            :revealed="card.revealed"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import store from "../store";

import MemoryCard from "./Card.vue";

export default defineComponent({
    data() {
        const cards = computed(() => store.getters.cards);
        return { cards };
    },
    name: "card-grid",
    components: { "memory-card": MemoryCard }
});
</script>

<style>
.card-grid {
    align-self: center;
    width: 80vw;
    display: grid;
    gap: 1vw;
    margin: 0;
    padding: 1vw;
}
@media screen and (max-width: 1000px) {
    .card-grid {
        width: 98vw;
    }
}
.size-12 {
    grid-template-columns: repeat(auto-fill, minmax(15vw, 1fr));
}
.size-12 .card {
    height: 12vw;
}
.size-24 {
    grid-template-columns: repeat(auto-fill, minmax(12vw, 1fr));
}
.size-24 .card {
    height: 9vw;
}
.size-36 {
    grid-template-columns: repeat(auto-fill, minmax(7vw, 1fr));
}
.size-36 .card {
    height: 9vw;
}
.size-48 {
    grid-template-columns: repeat(auto-fill, minmax(5.5vw, 1fr));
}
.size-48 .card {
    height: 8vw;
}
.size-72 {
    grid-template-columns: repeat(auto-fill, minmax(5.5vw, 1fr));
}
.size-72 .card {
    height: 5vw;
}
.size-144 {
    grid-template-columns: repeat(auto-fill, minmax(5.5vw, 1fr));
}
.size-144 .card {
    height: 3vw;
}
.size-500 {
    grid-template-columns: repeat(auto-fill, minmax(4vw, 1fr));
}
.size-500 .card {
    height: 3vw;
}
</style>
