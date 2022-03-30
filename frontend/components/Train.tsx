import React, { Component } from "react";
import { ethers } from "ethers";
import trainStyles from "../styles/Train.module.scss";
import { Player as PlayerInterface } from "../global/player";
import { Player } from "./Player";
import getPlayersByOwner from "../utils/getPlayersByOwner";
import { getPlayer } from "../utils/getPlayer";
import Alert from "./Alert";
import Confirm from "./Confirm";
import Search from "./Search";

interface Props {
  account: string;
  futNFT: ethers.Contract;
  futNFTTraining: ethers.Contract;
  futNFTMatch: ethers.Contract;
  setLoader: (loader: boolean) => void;
  setPlayerInfo: (player: PlayerInterface) => void;
  setPlayerInfoActivated: (activated: boolean) => void;
}
interface State {
  players: PlayerInterface[];
  cooldown: number;
  confirm: boolean;
  currentPlayer: PlayerInterface;
}

export class Train extends Component<Props, State> {
  players: PlayerInterface[] = [
    {
      age: 34,
      imageURI:
        "https://bafybeicfhmevzs4aso7rqvx7l5ndb2ly7gudjyj5xjkztvohpwxw2za7iy.ipfs.dweb.link/nft.png",
      id: 1,
      level: 20,
      lastUpgrade: Math.floor(new Date().getTime() / 1000) - 43190,
      name: "Lionel Messi",
      preferredPosition: "RWF",
      suitablePositions: ["ST", "CF", "RMF", "CAM"],
    },
    {
      age: 37,
      imageURI:
        "https://bafybeicfhmevzs4aso7rqvx7l5ndb2ly7gudjyj5xjkztvohpwxw2za7iy.ipfs.dweb.link/nft.png",
      id: 2,
      level: 17,
      lastUpgrade: Math.floor(new Date().getTime() / 1000),
      name: "Cristiano Ronaldo",
      preferredPosition: "ST",
      suitablePositions: ["LWF", "CF"],
    },
    {
      age: 37,
      imageURI:
        "https://bafybeicfhmevzs4aso7rqvx7l5ndb2ly7gudjyj5xjkztvohpwxw2za7iy.ipfs.dweb.link/nft.png",
      id: 2,
      level: 17,
      lastUpgrade: Math.floor(new Date().getTime() / 1000),
      name: "Cristiano Ronaldo",
      preferredPosition: "ST",
      suitablePositions: ["LWF", "CF"],
    },
    {
      age: 37,
      imageURI:
        "https://bafybeicfhmevzs4aso7rqvx7l5ndb2ly7gudjyj5xjkztvohpwxw2za7iy.ipfs.dweb.link/nft.png",
      id: 2,
      level: 17,
      lastUpgrade: Math.floor(new Date().getTime() / 1000),
      name: "Cristiano Ronaldo",
      preferredPosition: "ST",
      suitablePositions: ["LWF", "CF"],
    },
    {
      age: 37,
      imageURI:
        "https://bafybeicfhmevzs4aso7rqvx7l5ndb2ly7gudjyj5xjkztvohpwxw2za7iy.ipfs.dweb.link/nft.png",
      id: 2,
      level: 17,
      lastUpgrade: Math.floor(new Date().getTime() / 1000),
      name: "Cristiano Ronaldo",
      preferredPosition: "ST",
      suitablePositions: ["LWF", "CF"],
    },
    {
      age: 37,
      imageURI:
        "https://bafybeicfhmevzs4aso7rqvx7l5ndb2ly7gudjyj5xjkztvohpwxw2za7iy.ipfs.dweb.link/nft.png",
      id: 2,
      level: 17,
      lastUpgrade: Math.floor(new Date().getTime() / 1000),
      name: "Cristiano Ronaldo",
      preferredPosition: "ST",
      suitablePositions: ["LWF", "CF"],
    },
    {
      age: 37,
      imageURI:
        "https://bafybeicfhmevzs4aso7rqvx7l5ndb2ly7gudjyj5xjkztvohpwxw2za7iy.ipfs.dweb.link/nft.png",
      id: 2,
      level: 17,
      lastUpgrade: Math.floor(new Date().getTime() / 1000),
      name: "Cristiano Ronaldo",
      preferredPosition: "ST",
      suitablePositions: ["LWF", "CF"],
    },
    {
      age: 37,
      imageURI:
        "https://bafybeicfhmevzs4aso7rqvx7l5ndb2ly7gudjyj5xjkztvohpwxw2za7iy.ipfs.dweb.link/nft.png",
      id: 2,
      level: 17,
      lastUpgrade: Math.floor(new Date().getTime() / 1000),
      name: "Cristiano Ronaldo",
      preferredPosition: "ST",
      suitablePositions: ["LWF", "CF"],
    },
  ];

  constructor(props: Props) {
    super(props);
    this.state = {
      players: [],
      cooldown: 43200,
      confirm: false,
      currentPlayer: {
        name: "",
        age: 0,
        id: 0,
        imageURI: "",
        lastUpgrade: 0,
        level: 0,
        preferredPosition: "",
        suitablePositions: [],
      },
    };
  }

  async componentDidMount() {
    this.props.setLoader(true);
    await this.getPlayers();
    this.setState({
      cooldown: (await this.props.futNFTTraining.cooldown()).toNumber(),
    });
  }

  getPlayers = async () => {
    this.props.setLoader(true);
    const playerIds: number[] = await getPlayersByOwner(
      this.props.futNFT,
      this.props.account
    );
    let players: PlayerInterface[] = [];
    playerIds.forEach(async (id) => {
      const player = await getPlayer(this.props.futNFTMatch, id);
      players.push(player);
    });
    setTimeout(() => {
      this.setState({ players: players });
      this.props.setLoader(false);
    }, 1000);
  };

  levelUp = async (playerId: number) => {
    this.props.setLoader(true);
    const provider: ethers.providers.Web3Provider = (window as any).provider;
    const signer = provider.getSigner();
    const fee = await this.props.futNFTTraining.fee();
    try {
      const tx = await this.props.futNFTTraining
        .connect(signer)
        .train(playerId, {
          gasLimit: 2000000,
          gasPrice: 3000000000,
          value: fee,
        });
      await tx.wait();
    } catch (err) {
      console.error(err);
    }
    this.props.setLoader(false);
  };

  handleYesClick = async (player: PlayerInterface) => {
    this.setState({ confirm: false });
    this.props.setLoader(true);
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const lastUpgrade = player.lastUpgrade;
    const cooldown = this.state.cooldown;
    console.log(timestamp);
    console.log(player);
    console.log(cooldown);
    if (timestamp - lastUpgrade >= cooldown) {
      await this.levelUp(player.id);
    } else {
      document.getElementById("cooldownAlert")!.style.display = "inline-block";
    }
    await this.getPlayers();
    setTimeout(() => {
      this.props.setLoader(false);
    }, 1000);
  };

  render() {
    return (
      <>
        <Alert
          id="cooldownAlert"
          message="Cooldown period is not over! Cannot level up!"
          okEnabled={true}
        />
        <Search
          id="trainSearch"
          handleClick={async () => {
            await this.getPlayers();
            this.props.setLoader(true);
            setTimeout(() => {
              const search = (
                document.getElementById("trainSearch")! as HTMLInputElement
              ).value;
              if (search != "") {
                const newPlayers = this.state.players.filter((player) =>
                  player.name.toLowerCase().includes(search.toLowerCase())
                );
                this.setState({ players: newPlayers });
              }
              this.props.setLoader(false);
            }, 1500);
          }}
        />
        {this.state.confirm && (
          <Confirm
            handleYesClick={() => this.handleYesClick(this.state.currentPlayer)}
            handleNoClick={() => this.setState({ confirm: false })}
          />
        )}
        <div className={trainStyles.trainContainer}>
          {this.state.players.map((player, key) => {
            if (player.name.length > 0) {
              return (
                <Player
                  btnId={`trainBtn${key}`}
                  setPlayerInfo={this.props.setPlayerInfo}
                  setPlayerInfoActivated={this.props.setPlayerInfoActivated}
                  key={key}
                  player={player}
                  btnText={"Level Up"}
                  handleClick={() => {
                    this.setState({ confirm: true, currentPlayer: player });
                  }}
                />
              );
            }
          })}
        </div>
      </>
    );
  }
}
