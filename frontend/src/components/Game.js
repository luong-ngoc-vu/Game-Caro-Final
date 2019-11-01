import React from 'react';
import {connect} from 'react-redux';
import Board from './Board';
import '../index.css';
import * as action from '../actions';
import {calculateWinner} from '../reducers/gameReducer';

class Game extends React.Component {
    handleClick(i, row, col) {
        const {history, stepNumber, xIsNext, saveHistory} = this.props;
        const historyA = history.slice(0, stepNumber + 1);
        const current = historyA[historyA.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        saveHistory(i, row, col, squares, history);

    }

    render() {
        const {history, stepNumber, xIsNext, ascendingOrder, reset, jumpToHistory, toggleOrder} = this.props;
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move}` :
                'Go to game start';
            let row = null;
            let col = null;

            if (move) {
                row = `[${history[move].clicked[0]}, `;
                col = `${history[move].clicked[1]}]`;
            }
            const isBold = (move === stepNumber ? 'bold' : '');

            return (
                <li key={move}>
                    <button type="button" className={isBold}
                            onClick={() => jumpToHistory(move)}>{desc}{row}{col}</button>
                </li>
            );
        });

        if (!ascendingOrder) {
            moves.reverse();
        }

        let status;
        if (winner) {
            if (winner.playerWin === 'X')
                winner.playerWin = 'You';
            else if (winner.playerWin === 'O')
                winner.playerWin = 'Computer';
            status = `Winner: ${winner.playerWin}`;
        } else {
            status = `Next player: ${xIsNext ? 'You' : 'Computer'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i, row, col) => this.handleClick(i, row, col)}
                        winningSquares={winner ? winner.position : []}
                    />
                </div>
                <div className="game-info">
                    <div className="div-style">{status}</div>
                    <br/>
                    <ol>{moves}</ol>
                    <br/>
                    <div>
                        <button type="button" className="button-style" onClick={toggleOrder}>Change order</button>
                        <div/>
                        <button type="button" className="button-style" onClick={reset}>Reset</button>
                    </div>
                    <br/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
    winner: state.winner,
    ascendingOrder: state.ascendingOrder,
});

const mapDispatchToProps = (dispatch) => ({
    reset: () => dispatch(action.reset()),
    toggleOrder: () => dispatch(action.toggleOrder()),
    jumpToHistory: (move) => dispatch(action.jumpToHistory(move)),
    saveHistory: (i, row, col, squares, history) => dispatch(action.saveHistory(i, row, col, squares, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);