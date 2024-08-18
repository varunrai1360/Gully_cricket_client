
import React, { Component } from "react";
import Navbar from "./Navbar";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
      <Navbar/>
       Not Found
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

export default NotFound;
