import { Card, State } from "./state";
import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { PackageObject } from "./actions-types";

import { shuffle, sleep } from "../utils";

const registryUrl =
    "https://registry.npmjs.com/-/v1/search?text=-component&popularity=1.0&quality=0.5&maintenance=0.2&"; //from=x&size=y

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;
export interface Actions {
    generateCards(
        { commit }: AugmentedActionContext,
        payload: { size: number }
    ): Promise<void>;
    revealCard(
        { state, commit }: AugmentedActionContext,
        payload: { index: number }
    ): Promise<void>;
}
interface Cache {
    timesUsed: number;
    Cards: string[];
}
const cache: Cache = { timesUsed: 0, Cards: [] };

export const actions: ActionTree<State, State> & Actions = {
    async generateCards({ commit }, payload) {
        commit("resetCounter", undefined);
        const from = Math.floor(Math.random() * 49);
        if (cache.Cards.length < payload.size / 2 || cache.timesUsed > 20) {
            cache.Cards = shuffle(
                cache.Cards.slice(0, cache.Cards.length / 2)
            ) as string[];
            const queryUrl =
                registryUrl + `from=${from}&size=${payload.size / 2}`;
            const packages = await (await fetch(queryUrl)).json();
            const Cards = packages.objects.map((pkg: PackageObject) => ({
                name: pkg.package.name,
                description: pkg.package.description.substring(0, 125),
                link: pkg.package.links.npm ?? "#",
                revealed: false,
                found: false
            }));
            cache.Cards.unshift(...Cards);
            // if there are some duplicates just use the new value
            if (new Set(cache.Cards).size < cache.Cards.length)
                cache.Cards = Cards;
            cache.timesUsed = 0;
        }
        const unshuffledCards = JSON.stringify(
            cache.Cards.slice(0, payload.size / 2)
        );
        const cards = shuffle([
            ...JSON.parse(unshuffledCards),
            ...JSON.parse(unshuffledCards)
        ]) as Card[];
        commit("setCards", { cards });
        cache.timesUsed++;
    },
    async revealCard({ state, commit }, payload) {
        if (state.revealed.length < 2) {
            commit("revealCard", { index: payload.index });
            if (state.revealed.length === 2) {
                if (
                    state.cards[state.revealed[0]].name ===
                    state.cards[state.revealed[1]].name
                )
                    commit("clearRevealed", undefined);
                else {
                    await sleep(1000);
                    if (state.revealed.length === 2)
                        commit("hideCards", {
                            indexes: [...state.revealed, payload.index]
                        });
                }
            }
        } else {
            commit("hideCards", {
                indexes: [...state.revealed, payload.index]
            });
            await sleep(100);
            commit("revealCard", { index: payload.index });
        }
    }
};
