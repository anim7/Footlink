import React, { Component } from "react";
import homeStyles from "../styles/Home.module.scss";

interface Props {}
interface State {}

export class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={homeStyles.homeContainer}>
        <div className={homeStyles.heading}>
          <h1 className={homeStyles.title}>Footlink</h1>
          <p className={homeStyles.tagline}>
            Bringing NFT experience to football fans
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
