import React from 'react';
import {connect} from 'react-redux';
import Board from './Board';
import '../index.css';
import * as action from '../actions/index';

class Game extends React.Component {
    render() {
        const {history, stepNumber, xIsNext, winner, addSymbol, reset, ascendingOrder, toggleOrder} = this.props;
        const current = history[stepNumber];
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
                    <button type="button" className={isBold}>{desc}{row}{col}</button>
                </li>
            );
        });

        if (!ascendingOrder) {
            moves.reverse();
        }

        let status;
        if (winner) {
            status = `Winner: ${winner.playerWin}`;
        } else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={addSymbol}
                        winningSquares={winner ? winner.position : []}
                    />
                </div>
                <div className="game-info">
                    <div className="div-style">{status}</div>
                    <br/>
                    <ol>{moves}</ol>
                    <br/>
                    <div>
                        <button type="button" className="button-style" onClick={toggleOrder}>Change</button>
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
    addSymbol: (index, row, col) => dispatch(action.addSymbol(index, row, col)),
    reset: () => dispatch(action.reset()),
    toggleOrder: () => dispatch(action.toggleOrder()),
    jumpToHistory: (move) => dispatch(action.jumpToHistory(move))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);