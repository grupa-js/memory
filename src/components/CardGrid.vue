<template>
    <div class="card-grid">
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

<style scoped>
.card-grid {
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10vw, 1fr));
    gap: 1vw;
    margin: 0;
    padding: 1vw;
}
</style>
