import Image from "next/image";
import React, { Component } from "react";
import matchStyles from "../styles/Match.module.scss";

interface Props {}
interface State {}

export class Match extends Component<Props, State> {
  render() {
    return (
      <div className={matchStyles.matchContainer}>
        <div className={matchStyles.selectLineup}>
          <div className={matchStyles.playground}>
            <div className={matchStyles.attack}>
              <div className={matchStyles.player} id="LWF"></div>
              <div>
                <div className={matchStyles.player} id="ST"></div>
                <div className={matchStyles.player} id="CF"></div>
              </div>
              <div>
                <div className={matchStyles.player} id="ST"></div>
                <div className={matchStyles.player} id="CF"></div>
              </div>
              <div className={matchStyles.player} id="RWF"></div>
            </div>
            <div className={matchStyles.midfield}>
              <div className={matchStyles.player} id="LMF"></div>
              <div className={matchStyles.player} id="CMF1"></div>
              <div>
                <div className={matchStyles.player} id="AMF"></div>
                <div className={matchStyles.player} id="CMF2"></div>
                <div className={matchStyles.player} id="DMF"></div>
              </div>
              <div className={matchStyles.player} id="CMF3"></div>
              <div className={matchStyles.player} id="RMF"></div>
            </div>
            <div className={matchStyles.defence}>
              <div className={matchStyles.player} id="LB"></div>
              <div className={matchStyles.player} id="CB1"></div>
              <div className={matchStyles.player} id="CB2"></div>
              <div className={matchStyles.player} id="CB3"></div>
              <div className={matchStyles.player} id="RB"></div>
            </div>
            <div className={matchStyles.goalKeeper}>
              <div className={matchStyles.player}></div>
            </div>
          </div>
          <div className={matchStyles.settings}>
            <div className={matchStyles.level}>
              <div className={matchStyles.shape}></div>
              <h2 className={matchStyles.value}>80</h2>
              <p className={matchStyles.label}>LVL</p>
            </div>
            <span className={matchStyles.tag}>Select Formation</span>
            <select
              name="formation"
              id="formation"
              className={matchStyles.formation}
            ></select>
            <button className={matchStyles.btn}>Set Lineup</button>
            <p id={matchStyles.playLabel}>Are you ready to face other teams?</p>
            <button className={matchStyles.btn} id={matchStyles.play}>
              Play Now!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Match;
