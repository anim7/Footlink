import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import navStyles from "../styles/Navbar.module.scss";

interface Props {
  account: string;
  loadWeb3: () => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  connected: boolean;
  signedIn: boolean;
  setSignupTab: (signupTab: boolean) => void;
}
interface State {}

export class Navbar extends Component<Props, State> {
  render() {
    return (
      <nav className={navStyles.navContainer}>
        <div className={navStyles.leftContainer}>
          <button
            className={navStyles.hamburger}
            onClick={() => {
              document.getElementById("sideBarContainer")!.style.display =
                "block";
              setTimeout(() => {
                document.getElementById("sideContainer")!.style.transform =
                  "translateX(0)";
              }, 0);
            }}
          >
            <span className={navStyles.line}></span>
            <span className={navStyles.line}></span>
            <span className={navStyles.line}></span>
          </button>
          <h1>
            <Link href="/">
              <a className={navStyles.logo}>
                <Image
                  className={navStyles.logoImage}
                  src="/favicon.ico"
                  alt="Footlink Logo"
                  width={40}
                  height={40}
                  draggable={false}
                />
              </a>
            </Link>
          </h1>
          <ul className={navStyles.links}>
            <li className={navStyles.link}>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={navStyles.rightContainer}>
          {this.props.connected && !this.props.signedIn && (
            <button
              className={navStyles.signUp}
              onClick={() => this.props.setSignupTab(true)}
            >
              Sign Up
            </button>
          )}
          <button
            className={navStyles.address}
            onClick={() => {
              this.props.loadWeb3();
              if (this.props.account.length > 3) {
                navigator.clipboard.writeText(this.props.account);
              }
            }}
          >
            {this.props.account.length > 3
              ? this.props.account.substring(0, 5) +
                "..." +
                this.props.account.substring(this.props.account.length - 5)
              : "Connect Wallet"}
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
