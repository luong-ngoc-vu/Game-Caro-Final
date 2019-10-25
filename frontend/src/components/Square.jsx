import React from 'react';
import '../App.css';

function Square(props) {
  const { isWinning, onClick, value } = props;
  if (isWinning) {
    return (
      <button type="button" className="square winning" onClick={onClick}>
        {value}
      </button>
    );
  }
  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
