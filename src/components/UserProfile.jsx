
import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { logoutauthenticateduser } from '../redux/Actions'
import { connect } from 'react-redux';
import api from '../api.json';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){
    var data = { email: this.props.userdata.data.user.email, password: this.props.userdata.data.user.password }
    axios.post(api.url+'checkuser', data)
      .then(response => {
          // console.log(response.data,'**')
        if (response.data.error === null) {
          this.props.logoutuser({})
        }

      })
      .catch(error => {
        if (error.response) {
          this.setState(() => ({
            errorMessage: error.response.data.message,
            loading: false,
          }))
        }
        else {
          this.setState(() => ({
            errorMessage: error.message,
            loading: false,
          }))
        }
      })
  }
  render() {
    return (
      <React.Fragment>
      <Navbar/>
       User Profile is in progr...




      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      logoutuser: (data) => { dispatch(logoutauthenticateduser(data)) }
    }
  }

const mapStateToProps = (state) => {
  var k = state.data;
  return {
    userdata: k
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
