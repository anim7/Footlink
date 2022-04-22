import Image from "next/image";
import React, { Component } from "react";
import playerInfoStyles from "../styles/PlayerInformation.module.scss";
import Player from "../types/player";

interface Props {
  player: Player;
  setPlayerInfoTab: (playerInfoTab: boolean, player: Player) => void;
}
interface State {}

export class PlayerInformation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={playerInfoStyles.playerInfoContainer}>
        <div
          className={playerInfoStyles.close}
          onClick={() => {
            this.props.setPlayerInfoTab(false, this.props.player);
          }}
        ></div>
        <div
          className={playerInfoStyles.playerInfoContainerBox}
          id="playerInfoBox"
        >
          <div className={playerInfoStyles.image}>
            <Image
              src={this.props.player.imageURI}
              alt={this.props.player.name}
              width={225}
              height={315}
            />
          </div>
          <div className={playerInfoStyles.info}>
            <div className={playerInfoStyles.group}>
              <span className={playerInfoStyles.label}>Name</span>
              <p className={playerInfoStyles.val}>{this.props.player.name}</p>
            </div>
            <div className={playerInfoStyles.group}>
              <span className={playerInfoStyles.label}>Level</span>
              <p className={playerInfoStyles.val}>{this.props.player.level}</p>
            </div>
            <div className={playerInfoStyles.group}>
              <span className={playerInfoStyles.label}>Preferred Position</span>
              <p className={playerInfoStyles.val}>
                {this.props.player.preferredPosition}
              </p>
            </div>
            <div className={playerInfoStyles.group}>
              <span className={playerInfoStyles.label}>
                Other Suitable Positions
              </span>
              <div className={playerInfoStyles.suitablePositions}>
                {this.props.player.suitablePositions.length > 0 ? (
                  this.props.player.suitablePositions.map((pos, key) => {
                    return (
                      <p className={playerInfoStyles.position} key={key}>
                        {pos}
                      </p>
                    );
                  })
                ) : (
                  <p className={playerInfoStyles.val}>None</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerInformation;
