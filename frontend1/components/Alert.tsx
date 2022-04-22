import Image from "next/image";
import React, { Component } from "react";
import alertStyles from "../styles/Alert.module.scss";
import AlertType from "../types/alert";

interface Props {
  text: string;
  type: AlertType;
  visible: boolean;
  setVisibility: (visible: boolean) => void;
  id: string;
}
interface State {
  backgroundColor: string;
  btnBgColor: string;
  imagePath: string;
  imageAlt: string;
}

export class Alert extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      backgroundColor: "rgb(183, 0, 0, 0.6)",
      btnBgColor: "rgb(139, 0, 0, 0.6)",
      imagePath: "/error.png",
      imageAlt: "Error",
    };
  }

  componentDidUpdate = () => {
    if (this.props.type !== this.state.imageAlt.toLowerCase()) {
      this.setStyles();
    }
  };

  setStyles = () => {
    let backgroundColor = "",
      btnBgColor = "",
      imagePath = "",
      imageAlt = "";
    if (this.props.type === "notice") {
      imagePath = "/notice.png";
      imageAlt = "Notice";
      btnBgColor = "rgb(25, 109, 194, 0.6)";
      backgroundColor = "rgb(27, 120, 212, 0.6)";
    } else if (this.props.type === "success") {
      imagePath = "/success.png";
      imageAlt = "Success";
      btnBgColor = "rgb(21, 113, 70, 0.6)";
      backgroundColor = "rgb(25, 135, 84, 0.6)";
    } else if (this.props.type === "warning") {
      imagePath = "/warning.png";
      imageAlt = "Warning";
      backgroundColor = "rgb(235, 188, 0, 0.6)";
      btnBgColor = "rgb(191, 153, 0, 0.6)";
    } else {
      backgroundColor = "rgb(183, 0, 0, 0.6)";
      btnBgColor = "rgb(139, 0, 0, 0.6)";
      imagePath = "/error.png";
      imageAlt = "Error";
    }
    this.setState({
      backgroundColor: backgroundColor,
      btnBgColor: btnBgColor,
      imagePath: imagePath,
      imageAlt: imageAlt,
    });
  };

  render = () => {
    return (
      <div
        className={alertStyles.alertContainer}
        style={{ backgroundColor: this.state.backgroundColor }}
        id={this.props.id}
      >
        {this.props.visible && (
          <>
            <div className={alertStyles.left}>
              <div
                className={alertStyles.symbol}
                style={{ backgroundColor: this.state.btnBgColor }}
              >
                <Image
                  src={this.state.imagePath}
                  alt={this.state.imageAlt}
                  width={30}
                  height={30}
                />
              </div>
              <p className={alertStyles.text}>{this.props.text}</p>
            </div>
            <div className={alertStyles.right}>
              <button
                onClick={() => this.props.setVisibility(false)}
                className={alertStyles.close}
                style={{ backgroundColor: this.state.btnBgColor }}
              >
                ✖
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
}

export default Alert;
