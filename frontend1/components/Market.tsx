import React, { Component } from "react";
import marketStyles from "../styles/Market.module.scss";
import Player from "./Player";
import PlayerType from "../types/player";
import Image from "next/image";

interface Props {
  setPlayerInfoTab: (playerInfoTab: boolean, player: PlayerType) => void;
}
interface State {
  listedPlayers: PlayerType[];
}

export class Market extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listedPlayers: [
        {
          name: "Lionel Messi",
          dob: Math.floor(new Date("24-6-1987").getTime() / 1000),
          id: 1,
          imageURI:
            "https://bafybeiam37td4lkemtodxihzkjvmb536nm326co76qlvnotu5xgfii2pz4.ipfs.dweb.link/messi.png",
          lastUpgrade: Math.floor(new Date().getTime() / 1000) - 43300,
          level: 24,
          preferredPosition: "RWF",
          suitablePositions: ["ST", "CF", "AMF"],
          themeColor: "#00ff22",
          textColor: "#00eaff",
        },
        {
          name: "Lionel Messi",
          dob: Math.floor(new Date("24-6-1987").getTime() / 1000),
          id: 2,
          imageURI:
            "https://bafybeiam37td4lkemtodxihzkjvmb536nm326co76qlvnotu5xgfii2pz4.ipfs.dweb.link/messi.png",
          lastUpgrade: Math.floor(new Date().getTime() / 1000) - 43300,
          level: 24,
          preferredPosition: "RWF",
          suitablePositions: ["ST", "CF", "AMF"],
          themeColor: "#00eaff",
          textColor: "#00ff22",
        },
      ],
    };
  }

  componentDidMount = async () => {};

  render = () => {
    return (
      <div className={marketStyles.marketContainer}>
        <div className={marketStyles.listedPlayers}>
          {this.state.listedPlayers.map((player, key) => {
            return (
              <div key={key} className={marketStyles.item}>
                <Player
                  player={player}
                  setPlayerInfoTab={this.props.setPlayerInfoTab}
                />
                <div className={marketStyles.details}>
                  <p className={marketStyles.label}>start price</p>
                  <p className={marketStyles.value}>
                    <Image
                      src="/matic.png"
                      alt="MATIC"
                      width={20}
                      height={20}
                    />
                    0.001 MATIC
                  </p>
                  <p className={marketStyles.label}>Current Bid</p>
                  <p className={marketStyles.value}>
                    <Image
                      src="/matic.png"
                      alt="MATIC"
                      width={20}
                      height={20}
                    />
                    0.5 MATIC
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default Market;
