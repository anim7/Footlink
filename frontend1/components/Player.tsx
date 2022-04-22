import Image from "next/image";
import React, { Component } from "react";
import playerStyles from "../styles/Player.module.scss";
import PlayerType from "../types/player";

interface Props {
  player: PlayerType;
  setPlayerInfoTab: (playerInfoTab: boolean, player: PlayerType) => void;
}
interface State {}

export class Player extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render = () => {
    return (
      <div
        className={playerStyles.playerContainer}
        id="playerContainer"
        style={{
          boxShadow: `0 2px 4px 2px ${this.props.player.themeColor}, 2px 3px 20px 2px ${this.props.player.themeColor}`,
        }}
      >
        <div
          className={playerStyles.imageContainer}
          style={{ borderColor: this.props.player.themeColor }}
        >
          <Image
            src={
              this.props.player.imageURI.length > 0
                ? this.props.player.imageURI
                : "/errorLoadingImage.png"
            }
            alt={this.props.player.name}
            width={300}
            height={420}
            draggable={false}
          />
        </div>
        <div
          className={playerStyles.information}
          onClick={() => {
            this.props.setPlayerInfoTab(true, this.props.player);
          }}
        >
          <p style={{ color: this.props.player.textColor }}>
            {this.props.player.name}
          </p>
          <p style={{ color: this.props.player.textColor }}>
            {this.props.player.level}
          </p>
        </div>
      </div>
    );
  };
}

export default Player;
