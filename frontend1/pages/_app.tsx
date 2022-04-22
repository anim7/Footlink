/* eslint-disable @next/next/no-css-tags */
import { ethers } from "ethers";
import Web3Modal, { IProviderOptions } from "web3modal";
import WalletLink from "walletlink";
import { NextComponentType, NextPageContext } from "next";
import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";
import "../styles/globals.scss";
import Head from "next/head";
import Navbar from "../components/Navbar";
import PageCover from "../components/PageCover";
import Sidebar from "../components/Sidebar";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import { abi as footlinkABI } from "../../artifacts/contracts/FootlinkMatch.sol/FootlinkMatch.json";
import Mint from "../components/Mint";
import Alert from "../components/Alert";
import AlertType from "../types/alert";
import axios from "axios";
import User from "../types/user";
import Signup from "../components/Signup";
import { NFTStorage } from "nft.storage";
import PlayerInformation from "../components/PlayerInformation";
import PlayerType from "../types/player";

interface Props {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}
interface State {
  progress: number;
  account: string;
  loading: boolean;
  depositTab: boolean;
  withdrawTab: boolean;
  mintTab: boolean;
  signupTab: boolean;
  footlink: ethers.Contract;
  alertText: string;
  alertType: AlertType;
  alertActive: boolean;
  url: string;
  user: User;
  connected: boolean;
  signedIn: boolean;
  player: PlayerType;
  playerInfoTab: boolean;
}

export class App extends Component<Props, State> {
  address = "0xaCa8392fb3D8FcBadF57D9A3f1f5401b86686D5A";
  constructor(props: Props) {
    super(props);
    const emptyContract = new ethers.Contract(
      "",
      [],
      new ethers.providers.JsonRpcProvider("")
    );
    this.state = {
      progress: 0,
      account: "0x0",
      loading: false,
      depositTab: false,
      withdrawTab: false,
      mintTab: false,
      signupTab: false,
      footlink: emptyContract,
      alertText: "",
      alertType: "error",
      alertActive: false,
      url: "http://127.0.0.1:8000",
      user: {
        id: 0,
        about: "",
        address: "",
        image: "",
        stadiumName: "",
        username: "",
      },
      connected: false,
      signedIn: false,
      player: {
        dob: 0,
        id: 0,
        imageURI: "",
        lastUpgrade: 0,
        level: 0,
        name: "",
        preferredPosition: "",
        suitablePositions: [],
        textColor: "",
        themeColor: "",
      },
      playerInfoTab: false,
    };
  }

  componentDidMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.loadContract();
    setTimeout(async () => {
      await this.loadProfile();
      this.connectAndSignIn();
    }, 500);
  };

  loadWeb3 = async () => {
    const providerOptions: IProviderOptions = {
      walletlink: {
        package: WalletLink,
        options: {
          appName: "Footlink",
          rpc: "https://rpc-mumbai.maticvigil.com",
          darkMode: true,
          chainId: 80001,
        },
      },
    };
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
      providerOptions,
      theme: "dark",
    });
    const instance = await web3Modal.connect();
    (window as any).provider = new ethers.providers.Web3Provider(instance);
  };

  loadBlockchainData = async () => {
    const provider: ethers.providers.Web3Provider = (window as any).provider;
    const accounts = await provider.send("eth_requestAccounts", []);
    (window as any).signer = provider.getSigner();
    this.setState({
      account: accounts[0],
    });
    setInterval(async () => {
      const acc = await provider.send("eth_requestAccounts", []);
      if (acc[0] != this.state.account) {
        window.location.reload();
        window.location.pathname = "/";
        this.setState({ account: acc[0] });
      }
    }, 1000);
  };

  loadContract = async () => {
    const provider: ethers.providers.Web3Provider = (window as any).provider;
    const signer = provider.getSigner();
    const footlink = new ethers.Contract(this.address, footlinkABI, signer);
    this.setState({
      footlink: footlink,
    });
  };

  loadProfile = async () => {
    const address = this.state.account;
    try {
      const res = await axios.get(
        `${this.state.url}/api/users/address/${address}`
      );
      const data = await res.data;
      this.setState({ user: data });
      console.log(this.state.user);
      this.setSignupTab(false);
    } catch (err: any) {
      if (err.response?.data?.code === 400 && address !== "0x0") {
        this.setSignupTab(true);
      }
    }
  };

  connectAndSignIn = () => {
    if (this.state.account.length > 3) {
      this.setState({ connected: true });
    }
    if (this.state.user.address.length > 3) {
      this.setState({ signedIn: true });
    }
  };

  storeFile = async (file: File): Promise<string> => {
    const client = new NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgwNDU3NzRGZkNkYzQwNmFBYTU2RThEM2ZGRGJmRTQ3ZjQ3Q0M5MmYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NzA5MTkzNzMwNywibmFtZSI6ImZ1dG5mdCJ9.a9ZnCTP5bq920TrpSdlNf26kN8lnHRubEScGFJMtmgE",
    });
    const metadata = await client.store({
      name: file.name,
      description: "Footlink player NFT",
      image: file,
    });
    // let imageURI = metadata.data.image.href;
    // imageURI = imageURI.replace("ipfs://", "");
    // imageURI = imageURI.replace("/", ".ipfs.dweb.link/");
    // imageURI = "https://" + imageURI;
    return metadata.data.image.href;
  };

  setProgress = (progress: number) => {
    this.setState({ progress: progress });
    if (progress > 0) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
    }
  };

  setLoading = (loading: boolean) => {
    this.setState({ loading: loading });
  };

  setDepositTab = (depositTab: boolean) => {
    if (depositTab) {
      this.setState({ depositTab: depositTab });
      setTimeout(() => {
        const depositBox = document.getElementById("depositBox")!;
        depositBox.style.transform = "translateX(0)";
      }, 0);
    } else {
      const depositBox = document.getElementById("depositBox")!;
      depositBox.style.transform = "translateX(200%)";
      setTimeout(() => {
        this.setState({ depositTab: depositTab });
      }, 200);
    }
  };

  setWithdrawTab = (withdrawTab: boolean) => {
    if (withdrawTab) {
      this.setState({ withdrawTab: withdrawTab });
      setTimeout(() => {
        const withdrawBox = document.getElementById("withdrawBox")!;
        withdrawBox.style.transform = "translateX(0)";
      }, 0);
    } else {
      const withdrawBox = document.getElementById("withdrawBox")!;
      withdrawBox.style.transform = "translateX(200%)";
      setTimeout(() => {
        this.setState({ withdrawTab: withdrawTab });
      }, 200);
    }
  };

  setMintTab = (mintTab: boolean) => {
    if (mintTab) {
      this.setState({ mintTab: mintTab });
      setTimeout(() => {
        const mintBox = document.getElementById("mintBox")!;
        mintBox.style.transform = "translateX(0)";
      }, 0);
    } else {
      const mintBox = document.getElementById("mintBox")!;
      mintBox.style.transform = "translateX(270%)";
      setTimeout(() => {
        this.setState({ mintTab: mintTab });
      }, 200);
    }
  };

  setAlert = (active: boolean, text?: string, type?: AlertType) => {
    if (active) {
      this.setState({
        alertActive: active,
        alertText: text ? text : "...",
        alertType: type ? type : "error",
      });
      setTimeout(() => {
        document.getElementById("alert")!.style.transform = "translateY(0)";
      }, 0);
    } else {
      document.getElementById("alert")!.style.transform = "translateY(-120%)";
      setTimeout(() => {
        this.setState({
          alertActive: active,
          alertText: "",
          alertType: "error",
        });
      }, 400);
    }
  };

  setSignupTab = (signupTab: boolean) => {
    if (signupTab) {
      this.setState({ signupTab: signupTab });
      setTimeout(() => {
        document.getElementById("signupBox")!.style.opacity = "1";
      }, 0);
    } else {
      if (this.state.signupTab) {
        document.getElementById("signupBox")!.style.opacity = "0";
      }
      setTimeout(() => {
        this.setState({ signupTab: signupTab });
      }, 300);
    }
  };

  setUser = (user: User) => {
    this.setState({ user: user });
  };

  setPlayerInfoTab = (playerInfoTab: boolean, player: PlayerType) => {
    if (playerInfoTab) {
      this.setState({ playerInfoTab: playerInfoTab, player: player });
      setTimeout(() => {
        document.getElementById("playerInfoBox")!.style.opacity = "1";
      }, 0);
    } else {
      document.getElementById("playerInfoBox")!.style.opacity = "0";
      setTimeout(() => {
        this.setState({ playerInfoTab: playerInfoTab, player: player });
      }, 300);
    }
  };

  render = () => {
    return (
      <>
        <Head>
          <title>Footlink</title>
          <meta
            name="description"
            content="Footlink is a football NFT game made for football fans. You can win money by playing this game, by buying and selling NFTs which are football players. You can play matches against other players and if you win you earn money. The better your team the more chances you have of winning."
          />
        </Head>
        {this.state.loading && (
          <LoadingBar
            color="#007bff"
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
        )}
        <Navbar
          account={this.state.account}
          loadWeb3={this.loadWeb3}
          setProgress={this.setProgress}
          setLoading={this.setLoading}
          connected={this.state.connected}
          signedIn={this.state.signedIn}
          setSignupTab={this.setSignupTab}
        />
        <Alert
          text={this.state.alertText}
          setVisibility={this.setAlert}
          visible={this.state.alertActive}
          type={this.state.alertType}
          id="alert"
        />
        {this.state.account.length > 2 && (
          <Sidebar
            setDepositTab={this.setDepositTab}
            setWithdrawTab={this.setWithdrawTab}
            setMintTab={this.setMintTab}
            connected={this.state.connected}
            signedIn={this.state.signedIn}
            user={this.state.user}
          />
        )}
        {this.state.loading && <PageCover />}
        {this.state.depositTab && (
          <Deposit
            setDepositTab={this.setDepositTab}
            id="depositBox"
            setProgress={this.setProgress}
            account={this.state.account}
            footlink={this.state.footlink}
          />
        )}
        {this.state.withdrawTab && (
          <Withdraw
            setWithdrawTab={this.setWithdrawTab}
            setProgress={this.setProgress}
            footlink={this.state.footlink}
            account={this.state.account}
          />
        )}
        {this.state.mintTab && (
          <Mint
            setMintTab={this.setMintTab}
            footlink={this.state.footlink}
            setProgress={this.setProgress}
            setAlert={this.setAlert}
            storeFile={this.storeFile}
            setPlayerInfoTab={this.setPlayerInfoTab}
          />
        )}
        {this.state.signupTab && (
          <Signup
            url={this.state.url}
            storeFile={this.storeFile}
            setProgress={this.setProgress}
            setAlert={this.setAlert}
            account={this.state.account}
            setSignupTab={this.setSignupTab}
            connectAndSignIn={this.connectAndSignIn}
            setUser={this.setUser}
          />
        )}
        {this.state.playerInfoTab && (
          <PlayerInformation
            player={this.state.player}
            setPlayerInfoTab={this.setPlayerInfoTab}
          />
        )}
        <this.props.Component
          {...this.props.pageProps}
          account={this.state.account}
          setProgress={this.setProgress}
          setLoading={this.setLoading}
          footlink={this.state.footlink}
          user={this.state.user}
          setAlert={this.setAlert}
          connected={this.state.connected}
          signedIn={this.state.signedIn}
          setPlayerInfoTab={this.setPlayerInfoTab}
        />
      </>
    );
  };
}

export default App;
