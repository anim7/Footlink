import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import sideStyles from "../styles/Sidebar.module.scss";
import User from "../types/user";

interface Props {
  setDepositTab: (depositTab: boolean) => void;
  setWithdrawTab: (withdrawTab: boolean) => void;
  setMintTab: (minntTab: boolean) => void;
  connected: boolean;
  signedIn: boolean;
  user: User;
}
interface State {}

export class Sidebar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  handleClick = () => {
    document.getElementById("sideContainer")!.style.transform =
      "translateX(-100%)";
    setTimeout(() => {
      document.getElementById("sideBarContainer")!.style.display = "none";
    }, 400);
  };

  render() {
    return (
      <div className={sideStyles.sideBarContainer} id="sideBarContainer">
        <div className={sideStyles.sideContainer} id="sideContainer">
          <div className={sideStyles.headingContainer}>
            <button className={sideStyles.close} onClick={this.handleClick}>
              ◀
            </button>
            <h1 className={sideStyles.heading}>
              <Link href="/">
                <a onClick={this.handleClick}>Footlink</a>
              </Link>
            </h1>
            <div></div>
          </div>
          <ul className={sideStyles.links}>
            {this.props.connected && (
              <li className={sideStyles.link}>
                <Link href="/market">
                  <a onClick={this.handleClick}>
                    <Image
                      src="/market.png"
                      className={sideStyles.icon}
                      alt="Transfer Market"
                      width={25}
                      height={25}
                      draggable={false}
                    />
                    <p>Transfer Market</p>
                    <div></div>
                  </a>
                </Link>
              </li>
            )}
            {this.props.signedIn && (
              <>
                <li className={sideStyles.link}>
                  <Link href="/my_team">
                    <a onClick={this.handleClick}>
                      <Image
                        src="/stadium.png"
                        className={sideStyles.icon}
                        alt={
                          this.props.user?.stadiumName.length > 0
                            ? this.props.user.stadiumName
                            : "My Team"
                        }
                        width={25}
                        height={25}
                        draggable={false}
                      />
                      <p>
                        {this.props.user?.stadiumName.length > 0
                          ? this.props.user.stadiumName
                          : "My Team"}
                      </p>
                      <div></div>
                    </a>
                  </Link>
                </li>
                <li className={sideStyles.link}>
                  <Link href="/match">
                    <a onClick={this.handleClick}>
                      <Image
                        src="/play.png"
                        className={sideStyles.icon}
                        alt="Match"
                        width={25}
                        height={25}
                        draggable={false}
                      />
                      <p>Match</p>
                      <div></div>
                    </a>
                  </Link>
                </li>
                <li className={sideStyles.link}>
                  <button
                    onClick={() => {
                      this.handleClick();
                      this.props.setDepositTab(true);
                    }}
                  >
                    <Image
                      src="/deposit.png"
                      className={sideStyles.icon}
                      alt="Deposit"
                      width={25}
                      height={25}
                      draggable={false}
                    />
                    <p>Deposit</p>
                    <div></div>
                  </button>
                </li>
                <li className={sideStyles.link}>
                  <button
                    onClick={() => {
                      this.handleClick();
                      this.props.setWithdrawTab(true);
                    }}
                  >
                    <Image
                      src="/withdraw.png"
                      className={sideStyles.icon}
                      alt="Withdraw"
                      width={25}
                      height={25}
                      draggable={false}
                    />
                    <p>Withdraw</p>
                    <div></div>
                  </button>
                </li>
                <li className={sideStyles.link}>
                  <button
                    onClick={() => {
                      this.handleClick();
                      this.props.setMintTab(true);
                    }}
                  >
                    <Image
                      src="/mint.png"
                      className={sideStyles.icon}
                      alt="Mint"
                      width={25}
                      height={25}
                      draggable={false}
                    />
                    <p>Mint</p>
                    <div></div>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
