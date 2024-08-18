
import React, { Component } from "react";
import Navbar from "./Navbar";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
      <Navbar/>
       About Us
      </React.Fragment>
    );
  }
}

// const mapStateToProps = (state) => {
//   var k = state.data;
//   return {
//     userdata: k
//   }
// }

export default AboutUs;
