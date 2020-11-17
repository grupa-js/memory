import { MutationTree } from "vuex";
import { State } from "./state";

export type Mutations<S = State> = {
    setCards(state: S, payload: { cards: string[] }): void;
};

export const mutations: MutationTree<State> & Mutations = {
    setCards(state, payload) {
        state.cards = payload.cards;
    }
};
