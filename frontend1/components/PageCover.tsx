import React, { Component } from "react";

export class PageCover extends Component {
  render() {
    return (
      <div
        draggable={false}
        style={{
          height: "100%",
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 100,
        }}
      />
    );
  }
}

export default PageCover;
