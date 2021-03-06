import { GetterTree } from "vuex";
import { State, Card } from "./state";

export type Getters = {
    cards(state: State): Card[];
    score(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
    cards(state) {
        return state.cards;
    },
    score(state) {
        return state.counter;
    },
    won(state) {
        if (state.cards.length === 0) return false;
        for (const card of state.cards) {
            if (!card.found) return false;
        }
        return true;
    }
};
