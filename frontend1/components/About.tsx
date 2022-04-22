import React, { Component } from "react";
import aboutStyles from "../styles/About.module.scss";

interface Props {}
interface State {}

export class About extends Component<Props, State> {
  render() {
    return (
      <div className={aboutStyles.aboutContainer}>
        <div className={aboutStyles.aboutFootlink}></div>
      </div>
    );
  }
}

export default About;
