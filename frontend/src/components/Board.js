import React from 'react';
import Square from './Square';
import '../App.css';

class Board extends React.Component {
  renderSquare(i, row, col) {
    const { squares, onClick, winningSquares } = this.props;
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i, row, col)}
        isWinning={winningSquares.includes(i)}
      />
    );
  }

  render() {
    const squares = [];
    let num = 0;
    let row = [];

    for (let i = 0; i < 20; i += 1) {
      row = [];
      for (let j = 0; j < 20; j += 1) {
        row.push(this.renderSquare(num, i, j));
        num += 1;
      }
      squares.push(<div className="board-row">{row}</div>);
    }
    return <div>{squares}</div>;
  }
}

export default Board;
