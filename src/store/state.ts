export interface Card {
    name: string;
    revealed: boolean;
    found: boolean;
}

export interface State {
    cards: Card[];
    revealed: number[];
    counter: number;
}

export const state: State = {
    cards: [],
    revealed: [],
    counter: 0
};
