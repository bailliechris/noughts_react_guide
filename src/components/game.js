import React from 'react';
import Board from './board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      who_is_next: true,
      step_number: 0
    }
  }

  handle_click(i) {
    const history = this.state.history.slice(0, this.state.step_number + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] === null) {
        squares[i] = this.state.who_is_next ? 'X' : 'O';
      this.setState({
          history: history.concat([{squares:squares}]),
          who_is_next: !this.state.who_is_next,
          step_number: history.length
        });           
    }
  }

  jump_to(step) {
    this.setState({
      step_number: step,
      who_is_next: (step%2) === 0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculate_winner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if (winner !== false) {
        status = 'Winner ' + winner;
    }
    else {
        status = 'Next player: ' + (this.state.who_is_next ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            onClick={(i) => this.handle_click(i)}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
  
}

function calculate_winner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}


export default Game;