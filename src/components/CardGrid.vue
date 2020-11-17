<template>
    <div class="card-grid" :class="'size-' + cards.length">
        <memory-card
            v-for="(card, index) in cards"
            :key="index"
            :index="index"
            :name="card.name"
            :description="card.description"
            :revealed="card.revealed"
            :found="card.found"
            :link="card.link"
        />
    </div>
    <div class="win-screen" v-if="won">
        <h1>You successfully revealed all cards in {{ score }} moves!</h1>
        <h3>
            The best possible score for a map of this size would be
            {{ cards.length / 2 }}, but it's only possible with inhuman amount
            of luck!
        </h3>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import store from "../store";

import MemoryCard from "./Card.vue";

export default defineComponent({
    data() {
        const cards = computed(() => store.getters.cards);
        const won = computed(() => store.getters.won);
        const score = computed(() => store.getters.score);
        return { cards, won, score };
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

.size-12 {
    grid-template-columns: repeat(4, 1fr);
}
.size-12 .card {
    height: 10vw;
}
.size-24 {
    grid-template-columns: repeat(6, 1fr);
}
.size-24 .card {
    height: 9vw;
}
.size-36 {
    grid-template-columns: repeat(9, 1fr);
}
.size-36 .card {
    height: 10vw;
}
.size-48 {
    grid-template-columns: repeat(8, 1fr);
}
.size-48 .card {
    height: 10vw;
}
.size-72 {
    grid-template-columns: repeat(8, 1fr);
}
.size-72 .card {
    height: 5vw;
}
.size-144 {
    grid-template-columns: repeat(8, 1fr);
}
.size-144 .card {
    height: 3vw;
}
.size-500 {
    grid-template-columns: repeat(10, 1fr);
}
.size-500 .card {
    height: 3vw;
}
@media screen and (max-width: 650px) {
    .card-grid {
        width: 98vw;
    }
    .size-12 {
        grid-template-columns: repeat(2, 1fr);
    }
    .size-12 .card {
        height: 13vh;
    }
    .size-24 {
        grid-template-columns: repeat(3, 1fr);
    }
    .size-24 .card {
        height: 10vh;
    }
    .size-36 {
        grid-template-columns: repeat(3, 1fr);
    }
    .size-36 .card {
        height: 8vh;
    }
    .size-48 {
        grid-template-columns: repeat(3, 1fr);
    }
    .size-48 .card {
        height: 8vw;
    }
    .size-72 {
        grid-template-columns: repeat(3, 1fr);
    }
    .size-72 .card {
        height: 8vh;
    }
    .size-144 {
        grid-template-columns: repeat(4, 1fr);
    }
    .size-144 .card {
        height: 8vh;
    }
    .size-500 {
        grid-template-columns: repeat(5, 1fr);
    }
    .size-500 .card {
        height: 10vh;
    }
}
@media screen and (max-width: 1200px) and (min-width: 651px) {
    .card-grid {
        width: 95vw;
    }
    .size-12 {
        grid-template-columns: repeat(3, 1fr);
    }
    .size-12 .card {
        height: 20vh;
    }
    .size-24 {
        grid-template-columns: repeat(4, 1fr);
    }
    .size-24 .card {
        height: 12vh;
    }
    .size-36 {
        grid-template-columns: repeat(4, 1fr);
    }
    .size-36 .card {
        height: 8vh;
    }
    .size-48 {
        grid-template-columns: repeat(6, 1fr);
    }
    .size-48 .card {
        height: 8vw;
    }
    .size-72 {
        grid-template-columns: repeat(6, 1fr);
    }
    .size-72 .card {
        height: 8vh;
    }
    .size-144 {
        grid-template-columns: repeat(6, 1fr);
    }
    .size-144 .card {
        height: 8vh;
    }
    .size-500 {
        grid-template-columns: repeat(5, 1fr);
    }
    .size-500 .card {
        height: 8vh;
    }
}
.win-screen {
    position: fixed;
    text-align: center;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.75);
}
</style>
