export const ADD_SYMBOL = 'ADD_SYMBOL';
export const JUMP_TO_HISTORY = 'JUMP_TO_HISTORY';
export const RESET = 'RESET';
export const TOGGLE_ORDER = 'TOGGLE_ORDER';

export const addSymbol = (index, row, col) => ({
    type: ADD_SYMBOL,
    index, row, col
});

export const jumpToHistory = (move) => ({
    type: JUMP_TO_HISTORY,
    move
});

export const reset = () => ({
    type: RESET
});

export const toggleOrder = () => ({
    type: TOGGLE_ORDER
});