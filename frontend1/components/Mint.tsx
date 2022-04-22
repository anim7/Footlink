import { ethers } from "ethers";
import React, { Component } from "react";
import mintStyles from "../styles/Mint.module.scss";
import Player from "../types/player";
import axios from "axios";
import Alert from "../types/alert";
import PlayerComponent from "./Player";

interface Props {
  setMintTab: (mintTab: boolean) => void;
  footlink: ethers.Contract;
  setProgress: (progress: number) => void;
  setAlert: (active: boolean, text?: string, type?: Alert) => void;
  storeFile: (file: File) => Promise<string>;
  setPlayerInfoTab: (playerInfoTab: boolean, player: Player) => void;
}
interface State {
  positions: string[];
  maxLevel: number;
  suitablePositions: string[];
  fields: {
    name: boolean;
    dob: boolean;
    preferredPosition: boolean;
    level: boolean;
    image: boolean;
  };
  player: Player;
  textColor: string;
  themeColor: string;
}

export class Mint extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      positions: [],
      maxLevel: 100,
      suitablePositions: [],
      fields: {
        name: false,
        dob: false,
        preferredPosition: false,
        level: false,
        image: false,
      },
      player: {
        name: "",
        dob: 0,
        id: 0,
        imageURI: "",
        lastUpgrade: 0,
        level: 0,
        preferredPosition: "",
        suitablePositions: [],
        themeColor: "white",
        textColor: "white",
      },
      textColor: "#000000",
      themeColor: "#000000",
    };
  }

  componentDidMount = async () => {
    this.props.setProgress(40);
    try {
      this.setState({ positions: await this.props.footlink.getAllPositions() });
    } catch (err) {
      this.props.setProgress(0);
      this.props.setAlert(
        true,
        "Some error occurred in fetching positions!",
        "error"
      );
      return;
    }
    this.props.setProgress(70);
    try {
      this.setState({ maxLevel: await this.props.footlink.maxLevel() });
    } catch (err) {
      this.props.setProgress(0);
      this.props.setAlert(
        true,
        "Some error occurred in fetching max level!",
        "error"
      );
      return;
    }
    this.props.setProgress(100);
  };

  checkFieldFilled = (value: string, labelID: string): boolean => {
    if (value.trim().length == 0) {
      document.getElementById(labelID)!.style.display = "inline-block";
      return false;
    }
    document.getElementById(labelID)!.style.display = "none";
    return true;
  };

  checkPosition = (value: string, positionInvalidLabel: string): boolean => {
    if (!this.state.positions.includes(value.trim().toUpperCase())) {
      document.getElementById(positionInvalidLabel)!.style.display =
        "inline-block";
      return false;
    }
    document.getElementById(positionInvalidLabel)!.style.display = "none";
    return true;
  };

  checkDOB = (
    value: string,
    labelRequiredID: string,
    labelInvalidID: string
  ): boolean => {
    document.getElementById(labelRequiredID)!.style.display = "none";
    document.getElementById(labelInvalidID)!.style.display = "none";
    const filled = this.checkFieldFilled(value, labelRequiredID);
    if (filled) {
      const date = new Date().getTime();
      const dob = new Date(value).getTime();
      if (dob >= date) {
        document.getElementById(labelInvalidID)!.style.display = "inline-block";
        return false;
      }
      document.getElementById(labelInvalidID)!.style.display = "none";
      this.setState({ fields: { ...this.state.fields, dob: true } });
      return true;
    }
    return filled;
  };

  checkPreferredPosition = (
    value: string,
    labelRequired: string,
    positionInvalidLabel: string,
    labelExists: string
  ): boolean => {
    document.getElementById(labelRequired)!.style.display = "none";
    document.getElementById(positionInvalidLabel)!.style.display = "none";
    document.getElementById(labelExists)!.style.display = "none";
    const filled = this.checkFieldFilled(value, labelRequired);
    if (filled) {
      if (this.state.suitablePositions.includes(value.trim().toUpperCase())) {
        document.getElementById(labelExists)!.style.display = "inline-block";
        return false;
      }
      const positionValid = this.checkPosition(value, positionInvalidLabel);
      if (positionValid) {
        document.getElementById(positionInvalidLabel)!.style.display = "none";
        this.setState({
          fields: { ...this.state.fields, preferredPosition: true },
        });
        return true;
      }
      document.getElementById(positionInvalidLabel)!.style.display =
        "inline-block";
      return false;
    }
    return filled;
  };

  checkSuitablePosition = (
    value: string,
    labelExistsID: string,
    labelPrefPosID: string,
    prefPos: string
  ): boolean => {
    document.getElementById(labelExistsID)!.style.display = "none";
    document.getElementById(labelPrefPosID)!.style.display = "none";
    if (
      prefPos.trim().toUpperCase() === value.trim().toUpperCase() &&
      value.trim().length > 0
    ) {
      document.getElementById(labelPrefPosID)!.style.display = "inline-block";
      return false;
    }
    if (this.state.suitablePositions.includes(value.toUpperCase().trim())) {
      document.getElementById(labelExistsID)!.style.display = "inline-block";
      return false;
    }
    return true;
  };

  checkLevel = (
    value: string,
    labelRequiredID: string,
    labelInvalidID: string
  ): boolean => {
    document.getElementById(labelRequiredID)!.style.display = "none";
    document.getElementById(labelInvalidID)!.style.display = "none";
    const filled = this.checkFieldFilled(value, labelRequiredID);
    if (filled) {
      if (parseInt(value) > this.state.maxLevel) {
        document.getElementById(labelInvalidID)!.style.display = "inline-block";
        return false;
      }
      this.setState({ fields: { ...this.state.fields, level: true } });
      return true;
    }
    return filled;
  };

  checkImage = (
    image: File | undefined,
    labelRequiredID: string,
    labelInvalidID: string
  ): boolean => {
    document.getElementById(labelRequiredID)!.style.display = "none";
    document.getElementById(labelInvalidID)!.style.display = "none";
    if (!image) {
      document.getElementById(labelRequiredID)!.style.display = "inline-block";
      return false;
    }
    if (
      image.type !== "image/jpeg" &&
      image.type !== "image/png" &&
      image.type !== "image/jpg" &&
      image.type !== "image/gif" &&
      image.type !== "image/webp"
    ) {
      document.getElementById(labelInvalidID)!.style.display = "inline-block";
      return false;
    }
    this.setState({ fields: { ...this.state.fields, image: true } });
    return true;
  };

  addSuitablePosition = (value: string) => {
    const position = value.trim().toUpperCase();
    if (!this.state.suitablePositions.includes(position)) {
      const positions = this.state.suitablePositions;
      positions.push(position);
      this.setState({ suitablePositions: positions });
    }
  };

  handleRemoveClick = (position: string) => {
    let positions = this.state.suitablePositions;
    positions = positions.filter((pos) => position !== pos);
    this.setState({ suitablePositions: positions });
  };

  handleNextClick = (
    name: string,
    dob: number,
    level: number,
    preferredPosition: string,
    image: File,
    themeColor: string,
    textColor: string
  ) => {
    if (
      this.state.fields.dob &&
      this.state.fields.name &&
      this.state.fields.image &&
      this.state.fields.level &&
      this.state.fields.preferredPosition
    ) {
      this.setState({
        player: {
          name: name,
          dob: dob,
          level: level,
          preferredPosition: preferredPosition,
          suitablePositions: this.state.suitablePositions,
          id: 0,
          imageURI: image.webkitRelativePath,
          lastUpgrade: Math.floor(new Date().getTime() / 1000),
          textColor: themeColor,
          themeColor: textColor,
        },
      });
      const values = document.getElementById("values")!;
      const preview = document.getElementById("preview")!;
      values.style.transform = "translateX(-115%)";
      preview.style.transform = "translateX(-50%)";
    }
  };

  mint = async (
    name: string,
    dob: Date,
    preferredPosition: string,
    level: number,
    image: File,
    themeColor: string,
    textColor: string
  ) => {
    if (
      this.state.fields.dob &&
      this.state.fields.name &&
      this.state.fields.image &&
      this.state.fields.level &&
      this.state.fields.preferredPosition
    ) {
      this.props.setProgress(20);
      let url: string = "";
      try {
        url = await this.props.storeFile(image);
        this.props.setProgress(40);
      } catch (err) {
        this.props.setAlert(
          true,
          "Could not store your image on IPFS",
          "error"
        );
        this.props.setProgress(0);
        return;
      }
      let data = {
        name: "",
        description: "",
        image: "",
      };
      try {
        data.image = await axios.get(url);
        this.props.setProgress(60);
      } catch (err) {
        this.props.setAlert(true, "Error fetching Image URL", "error");
        this.props.setProgress(0);
        return;
      }
      const imageURI = data.image;
      const player: Player = {
        id: 0,
        dob: Math.floor(dob.getTime() / 1000),
        lastUpgrade: Math.floor(new Date().getTime() / 1000),
        level: level,
        name: name,
        preferredPosition: preferredPosition,
        suitablePositions: this.state.suitablePositions,
        imageURI: imageURI,
        themeColor: themeColor,
        textColor: textColor,
      };
      try {
        const tx = await this.props.footlink.mint(player);
        this.props.setProgress(80);
        await tx.wait();
        this.props.setProgress(100);
      } catch (err) {
        this.props.setAlert(true, "Error minting your NFT!", "error");
        this.props.setProgress(0);
        return;
      }
      this.props.setAlert(true, "NFT successfully minted!", "success");
    }
  };

  render() {
    return (
      <div className={mintStyles.mintContainer}>
        <div className={mintStyles.mintBox} id="mintBox">
          <div className={mintStyles.headingContainer}>
            <div></div>
            <h2>Mint</h2>
            <button
              className={mintStyles.close}
              onClick={() => this.props.setMintTab(false)}
            >
              ✖
            </button>
          </div>
          <div className={mintStyles.body}>
            <div className={mintStyles.values} id="values">
              <div className={mintStyles.group}>
                <span className={mintStyles.label}>Name</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. Lionel Messi"
                  className={mintStyles.input}
                  onChange={(evt) => {
                    const filled = this.checkFieldFilled(
                      evt.target.value,
                      "nameRequired"
                    );
                    this.setState({
                      fields: { ...this.state.fields, name: filled },
                    });
                  }}
                />
                <label
                  htmlFor="name"
                  className={mintStyles.warning}
                  id="nameRequired"
                >
                  *This field is required
                </label>
              </div>
              <div className={mintStyles.group}>
                <span className={mintStyles.label}>Date of Birth</span>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className={mintStyles.input}
                  onChange={(evt) => {
                    this.checkDOB(
                      evt.target.value,
                      "dobRequired",
                      "dobInvalid"
                    );
                  }}
                />
                <label
                  htmlFor="dob"
                  className={mintStyles.warning}
                  id="dobRequired"
                >
                  *This field is required
                </label>
                <label
                  htmlFor="dob"
                  id="dobInvalid"
                  className={mintStyles.warning}
                >
                  *Invalid Date of Birth
                </label>
              </div>
              <div className={mintStyles.group}>
                <span className={mintStyles.label}>Preferred Position</span>
                <input
                  type="text"
                  name="preferredPosition"
                  id="preferredPosition"
                  className={mintStyles.input}
                  placeholder="e.g. RWF"
                  onChange={(evt) => {
                    this.checkPreferredPosition(
                      evt.target.value,
                      "preferredPositionRequired",
                      "preferredPositionInvalid",
                      "preferredPositionExists"
                    );
                  }}
                />
                <label
                  htmlFor="preferredPosition"
                  className={mintStyles.warning}
                  id="preferredPositionRequired"
                >
                  *This field is required
                </label>
                <label
                  htmlFor="preferredPosition"
                  className={mintStyles.warning}
                  id="preferredPositionInvalid"
                >
                  *Invalid Position
                </label>
                <label
                  htmlFor="preferredPosition"
                  className={mintStyles.warning}
                  id="preferredPositionExists"
                >
                  *This position is already included in suitable positions
                </label>
              </div>
              <div className={mintStyles.group}>
                <span className={mintStyles.label}>Suitable Positions</span>
                <div className={mintStyles.suitablePositionsBox}>
                  <input
                    type="text"
                    name="suitablePosition"
                    id="suitablePosition"
                    className={mintStyles.input}
                    placeholder="e.g. RWF"
                    onChange={(evt) => {
                      document.getElementById(
                        "suitablePositionRequired"
                      )!.style.display = "none";
                      document.getElementById(
                        "suitablePositionExists"
                      )!.style.display = "none";
                      document.getElementById(
                        "suitablePositionIsPreferredPosition"
                      )!.style.display = "none";
                      this.checkPosition(
                        evt.target.value,
                        "suitablePositionInvalid"
                      );
                      this.checkSuitablePosition(
                        evt.target.value,
                        "suitablePositionExists",
                        "suitablePositionIsPreferredPosition",
                        (
                          document.getElementById(
                            "preferredPosition"
                          )! as HTMLInputElement
                        ).value
                      );
                    }}
                  />
                  <button
                    className={mintStyles.addSuitablePosition}
                    onClick={() => {
                      let ok = true;
                      const value = (
                        document.getElementById(
                          "suitablePosition"
                        )! as HTMLInputElement
                      ).value;
                      const check = (val: string) => {
                        document.getElementById(
                          "suitablePositionRequired"
                        )!.style.display = "none";
                        document.getElementById(
                          "suitablePositionInvalid"
                        )!.style.display = "none";
                        document.getElementById(
                          "suitablePositionExists"
                        )!.style.display = "none";
                        document.getElementById(
                          "suitablePositionIsPreferredPosition"
                        )!.style.display = "none";
                        if (val.trim().length === 0) {
                          document.getElementById(
                            "suitablePositionRequired"
                          )!.style.display = "inline-block";
                          ok = false;
                          return;
                        }
                        const b1 = this.checkSuitablePosition(
                          val,
                          "suitablePositionExists",
                          "suitablePositionIsPreferredPosition",
                          (
                            document.getElementById(
                              "preferredPosition"
                            )! as HTMLInputElement
                          ).value
                        );
                        const b2 = this.checkPosition(
                          value,
                          "suitablePositionInvalid"
                        );
                        ok = ok && b1 && b2;
                      };
                      check(value);
                      if (ok) {
                        this.addSuitablePosition(value);
                        (
                          document.getElementById(
                            "suitablePosition"
                          )! as HTMLInputElement
                        ).value = "";
                      }
                    }}
                  >
                    +
                  </button>
                </div>
                <label
                  htmlFor="suitablePosition"
                  className={mintStyles.warning}
                  id="suitablePositionRequired"
                >
                  *This field is required
                </label>
                <label
                  htmlFor="suitablePosition"
                  className={mintStyles.warning}
                  id="suitablePositionInvalid"
                >
                  *Invalid Position
                </label>
                <label
                  htmlFor="suitablePosition"
                  className={mintStyles.warning}
                  id="suitablePositionExists"
                >
                  *This position has already been added
                </label>
                <label
                  htmlFor="suitablePosition"
                  className={mintStyles.warning}
                  id="suitablePositionIsPreferredPosition"
                >
                  *This is the same as preferred position
                </label>
                <div className={mintStyles.suitablePositions}>
                  {this.state.suitablePositions.map((position, key) => {
                    return (
                      <div
                        className={mintStyles.suitablePositionAdded}
                        key={key}
                      >
                        <p>{position}</p>
                        <button
                          onClick={() => this.handleRemoveClick(position)}
                        >
                          ✖
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={mintStyles.group}>
                <span className={mintStyles.label}>Base Level</span>
                <input
                  type="number"
                  name="level"
                  id="level"
                  className={mintStyles.input}
                  placeholder="e.g. 24"
                  onChange={(evt) => {
                    this.checkLevel(
                      evt.target.value,
                      "levelRequired",
                      "levelInvalid"
                    );
                  }}
                />
                <label
                  htmlFor="level"
                  className={mintStyles.warning}
                  id="levelRequired"
                >
                  *This field is required
                </label>
                <label
                  htmlFor="level"
                  className={mintStyles.warning}
                  id="levelInvalid"
                >
                  *Invalid value for level
                </label>
              </div>
              <div className={mintStyles.group}>
                <span className={mintStyles.label}>NFT Image</span>
                <input
                  type="file"
                  name="image"
                  id={mintStyles.imageUpload}
                  className={mintStyles.input}
                  accept=".png,.jpg,.jpeg,.jfif,.gif,.webp"
                  onChange={() => {
                    this.checkImage(
                      (
                        document.getElementById(
                          mintStyles.imageUpload
                        )! as HTMLInputElement
                      ).files![0],
                      "imageRequired",
                      "imageInvalid"
                    );
                  }}
                />
                <label
                  htmlFor="image"
                  className={mintStyles.warning}
                  id="imageRequired"
                >
                  *This field is required
                </label>
                <label
                  htmlFor="image"
                  className={mintStyles.warning}
                  id="imageInvalid"
                >
                  *Invalid format for image
                </label>
              </div>
              <div className={mintStyles.colors}>
                <div className={mintStyles.color}>
                  <span>Text Color</span>
                  <div className={mintStyles.colorInputBox}>
                    <input
                      type="color"
                      name="textColor"
                      id="textColor"
                      className={mintStyles.colorInput}
                      onChange={(evt) => {
                        this.setState({ textColor: evt.target.value });
                      }}
                    />
                    <span className={mintStyles.colorText}>
                      {this.state.textColor}
                    </span>
                  </div>
                </div>
                <div className={mintStyles.color}>
                  <span>Theme Color</span>
                  <div className={mintStyles.colorInputBox}>
                    <input
                      type="color"
                      name="themeColor"
                      id="themeColor"
                      className={mintStyles.colorInput}
                      onChange={(evt) => {
                        this.setState({ themeColor: evt.target.value });
                      }}
                    />
                    <span className={mintStyles.colorText}>
                      {this.state.themeColor}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className={mintStyles.submit}
                onClick={() => {
                  this.handleNextClick(
                    (document.getElementById("name")! as HTMLInputElement)
                      .value,
                    Math.floor(
                      new Date(
                        (
                          document.getElementById("dob")! as HTMLInputElement
                        ).value
                      ).getTime() / 1000
                    ),
                    parseInt(
                      (document.getElementById("level")! as HTMLInputElement)
                        .value
                    ),
                    (
                      document.getElementById(
                        "preferredPosition"
                      )! as HTMLInputElement
                    ).value,
                    (
                      document.getElementById(
                        mintStyles.imageUpload
                      )! as HTMLInputElement
                    ).files![0],
                    this.state.themeColor,
                    this.state.textColor
                  );
                }}
                disabled={
                  !this.state.fields.dob ||
                  !this.state.fields.name ||
                  !this.state.fields.image ||
                  !this.state.fields.level ||
                  !this.state.fields.preferredPosition
                }
              >
                Next ▶
              </button>
            </div>
            <div className={mintStyles.preview} id="preview">
              <div className={mintStyles.playerPreview}>
                <PlayerComponent
                  player={this.state.player}
                  setPlayerInfoTab={this.props.setPlayerInfoTab}
                />
              </div>
              <button
                className={mintStyles.submit}
                onClick={() => {
                  this.mint(
                    (document.getElementById("name")! as HTMLInputElement)
                      .value,
                    new Date(
                      (
                        document.getElementById("dob")! as HTMLInputElement
                      ).value
                    ),
                    (
                      document.getElementById(
                        "preferredPosition"
                      )! as HTMLInputElement
                    ).value,
                    parseInt(
                      (document.getElementById("level")! as HTMLInputElement)
                        .value
                    ),
                    (
                      document.getElementById(
                        mintStyles.imageUpload
                      )! as HTMLInputElement
                    ).files![0],
                    this.state.themeColor,
                    this.state.textColor
                  );
                }}
                disabled={
                  !this.state.fields.name ||
                  !this.state.fields.dob ||
                  !this.state.fields.image ||
                  !this.state.fields.level ||
                  !this.state.fields.preferredPosition
                }
              >
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mint;
