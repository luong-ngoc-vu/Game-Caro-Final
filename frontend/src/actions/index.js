export const ADD_SYMBOL = 'ADD_SYMBOL';
export const JUMP_TO_HISTORY = 'JUMP_TO_HISTORY';
export const RESET = 'RESET';
export const TOGGLE_ORDER = 'TOGGLE_ORDER';
export const SAVE_HISTORY = 'SAVE_HISTORY';

export const jumpToHistory = (step) => ({
    type: JUMP_TO_HISTORY,
    step
});

export const reset = () => ({
    type: RESET
});

export const toggleOrder = () => ({
    type: TOGGLE_ORDER
});

export const saveHistory = (i, squares, history) => ({
    type: SAVE_HISTORY,
    i, squares, history
});
