import axios from "axios";
import React, { Component } from "react";
import signupStyles from "../styles/Signup.module.scss";
import Alert from "../types/alert";
import User from "../types/user";

interface Props {
  url: string;
  storeFile: (file: File) => Promise<string>;
  setProgress: (progress: number) => void;
  setAlert: (active: boolean, text?: string, type?: Alert) => void;
  account: string;
  setSignupTab: (signupTab: boolean) => void;
  connectAndSignIn: () => void;
  setUser: (user: User) => void;
}
interface State {}

export class Signup extends Component<Props, State> {
  checkUsername = async (
    username: string,
    requiredLabelID: string,
    existsLabelID: string
  ): Promise<boolean> => {
    const required = document.getElementById(requiredLabelID)!;
    const exists = document.getElementById(existsLabelID)!;
    required.style.display = "none";
    exists.style.display = "none";
    if (username.length === 0) {
      required.style.display = "inline-block";
      return false;
    }
    try {
      await axios.get(`${this.props.url}/api/users/username/${username}`);
      exists.style.display = "inline-block";
      return false;
    } catch (err: any) {
      if (err?.response?.data?.code === 400) {
        return true;
      }
      exists.style.display = "inline-block";
      return false;
    }
  };

  signup = async (
    username: string,
    stadiumName: string,
    pfp: File | undefined,
    about: string,
    usernameRequired: string,
    usernameExists: string
  ) => {
    if (await this.checkUsername(username, usernameRequired, usernameExists)) {
      let imageURI = "";
      if (pfp) {
        try {
          this.props.setProgress(40);
          imageURI = await this.props.storeFile(pfp);
        } catch (err: any) {
          this.props.setProgress(0);
          this.props.setSignupTab(false);
          this.props.setAlert(true, "Could not save image!", "error");
          return;
        }
      }
      this.props.setProgress(70);
      const user: User = {
        address: this.props.account,
        username: username,
        stadiumName: stadiumName,
        image: imageURI,
        about: about,
      };
      console.log(user);
      try {
        await axios.post(`${this.props.url}/api/users`, user);
        const res = await axios.get(
          `${this.props.url}/api/users/address/${this.props.account}`
        );
        const u = res.data;
        this.props.setUser(u);
        this.props.setProgress(100);
        setTimeout(() => {
          this.props.setSignupTab(false);
          this.props.setAlert(true, "Successfully Signed Up!", "success");
          this.props.connectAndSignIn();
        }, 500);
      } catch (err: any) {
        this.props.setProgress(0);
        this.props.setSignupTab(false);
        this.props.setAlert(true, "Could not save user!", "error");
        return;
      }
    }
  };

  render() {
    return (
      <div className={signupStyles.signupContainer}>
        <div className={signupStyles.signupBox} id="signupBox">
          <div className={signupStyles.heading}>
            <div></div>
            <h2>Sign Up</h2>
            <button
              className={signupStyles.close}
              onClick={() => this.props.setSignupTab(false)}
            >
              ✖
            </button>
          </div>
          <div className={signupStyles.group}>
            <span className={signupStyles.label}>Username</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="e.g. citizen"
              className={signupStyles.input}
              onChange={(evt) => {
                this.checkUsername(
                  evt.target.value,
                  "usernameRequired",
                  "usernameExists"
                );
              }}
            />
            <label
              htmlFor="username"
              id="usernameRequired"
              className={signupStyles.warning}
            >
              *This field is required
            </label>
            <label
              htmlFor="username"
              id="usernameExists"
              className={signupStyles.warning}
            >
              *This username already exists
            </label>
          </div>
          <div className={signupStyles.group}>
            <span className={signupStyles.label}>Home</span>
            <input
              type="text"
              name="stadiumName"
              id="stadiumName"
              placeholder="e.g. Camp Nou"
              className={signupStyles.input}
            />
          </div>
          <div className={signupStyles.group}>
            <span className={signupStyles.label}>Profile Image</span>
            <input
              type="file"
              name="pfp"
              id={signupStyles.pfp}
              className={signupStyles.input}
            />
          </div>
          <div className={signupStyles.group}>
            <span className={signupStyles.label}>About</span>
            <textarea
              name="about"
              id={signupStyles.about}
              cols={30}
              rows={8}
              placeholder="Describe yourself..."
              className={signupStyles.input}
            ></textarea>
          </div>
          <button
            className={signupStyles.submit}
            onClick={() => {
              const username = (
                document.getElementById("username")! as HTMLInputElement
              ).value;
              const stadiumName = (
                document.getElementById("stadiumName")! as HTMLInputElement
              ).value;
              const pfp: File | undefined = (
                document.getElementById(signupStyles.pfp)! as HTMLInputElement
              ).files![0];
              const about = (
                document.getElementById(
                  signupStyles.about
                )! as HTMLTextAreaElement
              ).value;
              this.signup(
                username,
                stadiumName,
                pfp,
                about,
                "usernameRequired",
                "usernameExists"
              );
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
