import React from "react";
import "./index.scss";

class Header extends React.Component {
  render() {
    return <div className="header-wrapper">{this.props.title}</div>;
  }
}

export default Header;
