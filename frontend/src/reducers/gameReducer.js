import {ADD_SYMBOL, JUMP_TO_HISTORY, RESET, TOGGLE_ORDER} from '../actions';

function calculateWinner(squares) {
    // Check row
    for (let i = 0; i < 20; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            if (squares[20 * i + j]
                && squares[20 * i + j] === squares[20 * i + j + 1]
                && squares[20 * i + j] === squares[20 * i + j + 2]
                && squares[20 * i + j] === squares[20 * i + j + 3]
                && squares[20 * i + j] === squares[20 * i + j + 4]
                && (squares[20 * i + j + 5] === null || squares[20 * i + j - 1] === null))
                return {
                    playerWin: squares[20 * i + j],
                    position: [20 * i + j, 20 * i + j + 1, 20 * i + j + 2, 20 * i + j + 3, 20 * i + j + 4]
                };
        }
    }

    // Check column
    for (let i = 0; i < 20; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            if (squares[20 * j + i]
                && squares[20 * j + i] === squares[20 * j + i + 20]
                && squares[20 * j + i] === squares[20 * j + i + 40]
                && squares[20 * j + i] === squares[20 * j + i + 60]
                && squares[20 * j + i] === squares[20 * j + i + 80]
                && (squares[20 * j + i + 100] === null || squares[20 * j + i - 20] === null))
                return {
                    playerWin: squares[20 * j + i],
                    position: [20 * j + i, 20 * j + i + 20, 20 * j + i + 40, 20 * j + i + 60, 20 * j + i + 80]
                };
        }
    }

    // Check primary diagonal line
    for (let i = 0; i < 400; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            if (squares[i + 21 * j]
                && squares[i + 21 * j] === squares[i + 21 * j + 21]
                && squares[i + 21 * j] === squares[i + 21 * j + 42]
                && squares[i + 21 * j] === squares[i + 21 * j + 63]
                && squares[i + 21 * j] === squares[i + 21 * j + 84]
                && (squares[i + 21 * j + 105] === null || squares[i + 21 * j - 21] === null))
                return {
                    playerWin: squares[i + 21 * j],
                    position: [i + 21 * j, i + 21 * j + 21, i + 21 * j + 42, i + 21 * j + 63, i + 21 * j + 84]
                };
        }
    }

    // Check subsidiary diagonal line
    for (let i = 0; i < 400; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            if (squares[i + 19 * j]
                && squares[i + 19 * j] === squares[i + 19 * j + 19]
                && squares[i + 19 * j] === squares[i + 19 * j + 38]
                && squares[i + 19 * j] === squares[i + 19 * j + 57]
                && squares[i + 19 * j] === squares[i + 19 * j + 76]
                && (squares[i + 19 * j + 95] === null || squares[i + 19 * j - 19] === null))
                return {
                    playerWin: squares[i + 19 * j],
                    position: [i + 19 * j, i + 19 * j + 19, i + 19 * j + 38, i + 19 * j + 57, i + 19 * j + 76]
                };
        }
    }

    return null;
}

const initialState = {
    history: [{
        squares: Array(20 * 20).fill(null),
        clicked: null
    }],
    stepNumber: 0,
    xIsNext: true,
    winner: null,
    ascendingOrder: true
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SYMBOL: {
            const {history, stepNumber, xIsNext, winner, ascendingOrder} = state;
            const historyA = history.slice(0, stepNumber + 1);
            const current = historyA[historyA.length - 1];
            const squares = current.squares.slice();

            if (winner || squares[action.index]) {
                return state;
            }
            squares[action.index] = xIsNext ? 'X' : 'O';
            return {
                history: history.concat([{
                    squares,
                    clicked: [action.row, action.col]
                }]),
                stepNumber: history.length,
                xIsNext: !xIsNext,
                winner: calculateWinner(squares),
                ascendingOrder,
            };
        }

        case JUMP_TO_HISTORY: {
            return {
                ...state,
                stepNumber: action.step,
                xIsNext: !((action.step % 2))
            };
        }

        case RESET: {
            return {
                history: [
                    {
                        squares: Array(20 * 20).fill(null),
                        clicked: null
                    }
                ],
                stepNumber: 0,
                xIsNext: true,
                winner: null,
                ascendingOrder: true
            };
        }

        case TOGGLE_ORDER: {
            const {ascendingOrder} = state;
            return {
                ...state,
                ascendingOrder: !ascendingOrder
            };
        }
        default:
            return state;
    }
};

export default gameReducer;