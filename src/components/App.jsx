import React from "react";
import Player from "./Player";
import "./style.css";

const initialState = {
  pointsToWin: 100,
  dice1: 6,
  dice2: 6,
  playerTurn: 0,
  winner: false,
  player1CurrentScore: 0,
  player1GlobalScore: 0,
  player2CurrentScore: 0,
  player2GlobalScore: 0,
  selectedPlayer1: "selected",
  selectedPlayer2: "",
  player1: "Player 1",
  player2: "Player 2",
  color1: "black",
  color2: "black",
  isDisabled: false,
  isTextVisible: false,
};

class App extends React.Component {
  state = { ...initialState };

  handleReset = () => {
    this.setState(initialState);
  };
  rollDice = () => {
    this.setState(
      {
        dice1: Math.floor(Math.random() * 6 + 1),
        dice2: Math.floor(Math.random() * 6 + 1),
      },
      () => {
        this.toCurrentScore();
      }
    );
  };
  winner = () => {
    if (this.state.player1GlobalScore >= this.state.pointsToWin) {
      this.setState({
        player1: "WINNER!!!",
        color1: "red",
        isDisabled: true,
      });
    } else if (this.state.player2GlobalScore >= this.state.pointsToWin) {
      this.setState({
        player2: "WINNER!!!",
        color2: "red",
        isDisabled: true,
      });
    }
  };

  selectedPlayer = () => {
    if (!this.state.playerTurn) {
      if (this.state.selectedPlayer1 === "") {
        this.setState({
          selectedPlayer1: "selected",
          selectedPlayer2: "",
        });
      }
    } else {
      if (this.state.selectedPlayer2 === "") {
        this.setState({
          selectedPlayer2: "selected",
          selectedPlayer1: "",
        });
      }
    }
  };
  toCurrentScore = () => {
    if (!this.state.playerTurn) {
      if (this.state.dice1 === 6 && this.state.dice2 === 6) {
        this.setState(
          {
            player1CurrentScore: 0,
            playerTurn: 1,
            isTextVisible: true,
          },
          () => {
            setTimeout(() => {
              this.setState({ isTextVisible: false });
            }, 3000);
          }
        );
      } else {
        this.setState({
          player1CurrentScore:
            this.state.player1CurrentScore +
            this.state.dice1 +
            this.state.dice2,
        });
      }
    } else {
      if (this.state.dice1 === 6 && this.state.dice2 === 6) {
        this.setState(
          {
            player2CurrentScore: 0,
            playerTurn: 0,
            isTextVisible: true,
          },
          () => {
            setTimeout(() => {
              this.setState({ isTextVisible: false });
            }, 3000);
          }
        );
      } else {
        this.setState({
          player2CurrentScore:
            this.state.player2CurrentScore +
            this.state.dice1 +
            this.state.dice2,
        });
      }
    }
  };
  toGlobalScore = () => {
    if (!this.state.playerTurn) {
      this.setState(
        {
          player1GlobalScore:
            this.state.player1GlobalScore + this.state.player1CurrentScore,
          player1CurrentScore: 0,
          playerTurn: 1,
        },
        () => {
          this.winner();
        }
      );
    } else {
      this.setState(
        {
          player2GlobalScore:
            this.state.player2GlobalScore + this.state.player2CurrentScore,
          player2CurrentScore: 0,
          playerTurn: 0,
        },
        () => {
          this.winner();
        }
      );
    }
  };

  componentDidUpdate = () => {
    this.selectedPlayer();
  };

  render() {
    return (
      <div>
        {this.state.isTextVisible && (
          <div className="six-by-six">
            <iframe
              title="This is a unique title"
              src="https://giphy.com/embed/TfS8MAR9ucLHW"
              width="480"
              height="445"
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
            <h2>You got double 6</h2>
            <h3>You lost all your current score and your turn</h3>
          </div>
        )}
        <div className="container-player">
          <Player
            selectedPlayer={this.state.selectedPlayer1}
            color={this.state.color1}
            player={this.state.player1}
            playerCurrentScore={this.state.player1CurrentScore}
            playerGlobalScore={this.state.player1GlobalScore}
          />
          <Player
            selectedPlayer={this.state.selectedPlayer2}
            color={this.state.color2}
            player={this.state.player2}
            playerCurrentScore={this.state.player2CurrentScore}
            playerGlobalScore={this.state.player2GlobalScore}
          />
        </div>
        <div className="logic-container">
          <div className="roll-dice-hold-container">
            <button
              onClick={() => {
                this.rollDice();
              }}
              disabled={this.state.isDisabled}
            >
              <i className="fas fa-dice fa-lg"></i>
              Roll Dice
            </button>
            <div className="dice">
              <img src={"dice-" + this.state.dice1 + ".png"} alt="dice" />
              <img src={"dice-" + this.state.dice2 + ".png"} alt="dice" />
            </div>
            <button
              onClick={() => {
                this.toGlobalScore();
              }}
              disabled={this.state.isDisabled}
            >
              <i className="fas fa-hand-holding fa-lg"></i> Hold
            </button>
          </div>
          <div className="new-game-container">
            <button
              onClick={() => {
                this.handleReset();
              }}
            >
              <i className="fas fa-plus-circle fa-lg"></i>
              New Game
            </button>
            <label>Adjust Winning Score: </label>
            <input
              type="number"
              value={this.state.pointsToWin}
              onChange={(e) => this.setState({ pointsToWin: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
