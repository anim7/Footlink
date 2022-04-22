import { ethers } from "ethers";
import Image from "next/image";
import React, { Component } from "react";
import depositStyles from "../styles/Deposit.module.scss";

interface Props {
  setDepositTab: (depositTab: boolean) => void;
  id: string;
  setProgress: (progress: number) => void;
  footlink: ethers.Contract;
  account: string;
}
interface State {
  value: number;
  balance: string;
}

export class Deposit extends Component<Props, State> {
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
      <div className={depositStyles.depositContainer}>
        <div className={depositStyles.depositBox} id={this.props.id}>
          <div className={depositStyles.headingContainer}>
            <div></div>
            <h2>Deposit</h2>
            <button
              className={depositStyles.close}
              onClick={() => this.props.setDepositTab(false)}
            >
              ✖
            </button>
          </div>
          <div className={depositStyles.balanceContainer}>
            <Image
              src="/matic.png"
              alt="MATIC"
              height={50}
              width={50}
              draggable={false}
            />
            <p className={depositStyles.balance}>{this.state.balance} MATIC</p>
          </div>
          <div className={depositStyles.setValue}>
            <button
              className={depositStyles.btn}
              onClick={this.handleMinusClick}
            >
              -
            </button>
            <div className={depositStyles.unitImage}>
              <Image src="/matic.png" alt="MATIC" width={30} height={30} />
            </div>
            <input
              className={depositStyles.depositValue}
              type="number"
              name="depositValue"
              id="depositValue"
              value={this.state.value}
              placeholder="0.0"
              onChange={(event) => {
                this.setState({
                  value: parseFloat(event.target.value),
                });
              }}
            />
            <span className={depositStyles.unit}>MATIC</span>
            <button
              className={depositStyles.btn}
              onClick={this.handlePlusClick}
            >
              +
            </button>
          </div>
          <button
            className={depositStyles.deposit}
            disabled={this.state.value == 0 || isNaN(this.state.value)}
          >
            Deposit
          </button>
        </div>
      </div>
    );
  }
}

export default Deposit;
