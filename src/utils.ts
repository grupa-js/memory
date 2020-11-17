export function shuffle(arr: unknown[]): typeof arr {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
