import React, { Component } from "react";
import { Market as MarketComponent } from "../../components/Market";
import Player from "../../types/player";

interface Props {
  setPlayerInfoTab: (playerInfoTab: boolean, player: Player) => void;
}

export class Market extends Component<Props> {
  render = () => {
    return <MarketComponent setPlayerInfoTab={this.props.setPlayerInfoTab} />;
  };
}

export default Market;
