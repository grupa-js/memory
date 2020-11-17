import { MutationTree } from "vuex";
import { Card, State } from "./state";

export type Mutations<S = State> = {
    setCards(state: S, payload: { cards: Card[] }): void;
    revealCard(state: S, payload: { index: number }): void;
    hideCard(state: S, payload: { index: number }): void;
    hideCards(state: S, payload: { indexes: number[] }): void;
    clearRevealed(state: S): void;
    resetCounter(state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
    setCards(state, payload) {
        state.cards = payload.cards;
    },
    revealCard(state, payload) {
        state.cards[payload.index].revealed = true;
        state.revealed.push(payload.index);
    },
    hideCard(state, payload) {
        state.cards[payload.index].revealed = false;
        const i = state.revealed.indexOf(payload.index);
        if (i >= 0) state.revealed.splice(i, 1);
        state.counter++;
    },
    hideCards(state, payload) {
        for (const index of payload.indexes) {
            state.cards[index].revealed = false;
            const i = state.revealed.indexOf(index);
            if (i >= 0) state.revealed.splice(i, 1);
        }
        state.counter++;
    },
    clearRevealed(state) {
        for (const index of state.revealed) {
            state.cards[index].found = true;
        }
        state.revealed = [];
        state.counter++;
    },
    resetCounter(state) {
        state.counter = 0;
    }
};
