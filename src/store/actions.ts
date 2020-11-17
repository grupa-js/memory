import { State } from "./state";
import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { PackageObject } from "./actions-types";

import { shuffle } from "../utils";

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
}

export const actions: ActionTree<State, State> & Actions = {
    async generateCards({ commit }, payload) {
        const from = Math.floor(Math.random() * 25);
        const queryUrl =
            registryUrl + `from=${from}&size=${from + payload.size ** 2 / 2}`;
        const packages = await (await fetch(queryUrl)).json();
        const packageNames = packages.objects.map(
            (pkg: PackageObject) => pkg.package.name
        );
        const cards = shuffle(packageNames);
        commit("setCards", { cards });
    }
};
