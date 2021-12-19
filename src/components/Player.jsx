import React from "react";

class Player extends React.Component {
  render() {
    return (
      <div className={`player ${this.props.selectedPlayer}`}>
        <div className="player-item" style={{ color: this.props.color }}>
          {this.props.player}
        </div>

        <div className="player-item">
          Current Score is: {this.props.playerCurrentScore}
        </div>
        <div className="player-item total">
          Total Score is: {this.props.playerGlobalScore}
        </div>
      </div>
    );
  }
}

export default Player;
