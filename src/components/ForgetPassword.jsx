
import React, { Component } from "react";
import Navbar from "./Navbar";
import URL from '../api.json';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
      <Navbar/>
       Forget password
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

export default ForgetPassword;
