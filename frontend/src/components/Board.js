import React from 'react';
import Square from './Square';
import '../App.css';

export const ComputerTurn = (squares) => {
    for (let i = 0; i < squares.length; i += 1) {
        const pos = Math.random() * (400) + 1;
        if (squares[Math.ceil(pos)] === null) {
            return Math.ceil(pos);
        }
    }
    return -1;
};

class Board extends React.Component {
    renderSquare(i) {
        const {squares, onClick, winningSquares} = this.props;
        return (
            <Square
                value={squares[i]}
                onClick={() => onClick(i)}
                isWinning={winningSquares.includes(i)}
            />
        );
    }

    renderRow(row) {
        const squares = [];
        const offset = row * 20;
        for (let s = 0; s < 20; s += 1) {
            squares.push(
                this.renderSquare(offset + s)
            );
        }
        return (
            <div className="board-row">
                {squares}
            </div>
        )
    }

    render() {
        const rows = [];
        for (let r = 0; r < 20; r += 1) {
            rows.push(
                this.renderRow(r)
            );
        }
        return <div>{rows}</div>;
    }
}

export default Board;
