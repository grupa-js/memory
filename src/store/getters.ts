import { GetterTree } from "vuex";
import { State, Card } from "./state";

export type Getters = {
    cards(state: State): Card[];
};

export const getters: GetterTree<State, State> & Getters = {
    cards(state) {
        return state.cards;
    }
};
