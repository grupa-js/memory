export interface Card {
    name: string;
    description: string;
    revealed: boolean;
    found: boolean;
    link: string;
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
