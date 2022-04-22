import { ethers } from "ethers";
import Image from "next/image";
import React, { Component } from "react";
import withdrawStyles from "../styles/Withdraw.module.scss";

interface Props {
  setWithdrawTab: (withdrawTab: boolean) => void;
  setProgress: (progress: number) => void;
  footlink: ethers.Contract;
  account: string;
}
interface State {
  value: number;
  balance: string;
}

export class Withdraw extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      balance: "0",
    };
  }

  componentDidMount = async () => {
    this.props.setProgress(40);
    await this.getBalance();
    this.props.setProgress(100);
  };

  handlePlusClick = () => {
    if (isNaN(this.state.value)) {
      this.setState({ value: 1 });
    } else {
      this.setState({ value: this.state.value + 1 });
    }
    setTimeout(() => {
      const bal = parseFloat(this.state.balance);
      if (bal < this.state.value) {
        this.setState({ value: bal });
      }
    }, 0);
  };

  handleMinusClick = () => {
    if (this.state.value >= 1) {
      this.setState({ value: this.state.value - 1 });
    }
  };

  getBalance = async () => {
    const bal: ethers.BigNumber = await this.props.footlink.ownersToDeposits(
      this.props.account
    );
    this.setState({
      balance: bal.toString(),
    });
  };

  render() {
    return (
      <div className={withdrawStyles.withdrawContainer}>
        <div className={withdrawStyles.withdrawBox} id="withdrawBox">
          <div className={withdrawStyles.headingContainer}>
            <div></div>
            <h2>Withdraw</h2>
            <button
              className={withdrawStyles.close}
              onClick={() => this.props.setWithdrawTab(false)}
            >
              ✖
            </button>
          </div>
          <div className={withdrawStyles.balanceContainer}>
            <Image
              src="/matic.png"
              alt="MATIC"
              height={50}
              width={50}
              draggable={false}
            />
            <p className={withdrawStyles.balance}>{this.state.balance} MATIC</p>
          </div>
          <div className={withdrawStyles.setValue}>
            <button
              className={withdrawStyles.btn}
              onClick={this.handleMinusClick}
            >
              -
            </button>
            <div className={withdrawStyles.unitImg}>
              <Image
                src="/matic.png"
                alt="MATIC"
                height={30}
                width={30}
                draggable={false}
              />
            </div>
            <input
              type="number"
              name="withdrawValue"
              id="withdrawValue"
              value={this.state.value}
              className={withdrawStyles.withdrawValue}
              placeholder="0.0"
              onChange={(event) => {
                this.setState({
                  value: parseFloat(event.target.value),
                });
              }}
            />
            <span className={withdrawStyles.unit}>MATIC</span>
            <button
              className={withdrawStyles.btn}
              onClick={this.handlePlusClick}
            >
              +
            </button>
          </div>
          <button
            className={withdrawStyles.withdraw}
            disabled={
              this.state.value == 0 ||
              isNaN(this.state.value) ||
              this.state.value > parseFloat(this.state.balance)
            }
          >
            Withdraw
          </button>
        </div>
      </div>
    );
  }
}

export default Withdraw;
