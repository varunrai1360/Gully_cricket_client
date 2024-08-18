import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Spinner from 'react-bootstrap/Spinner'
import axios from "axios";
import { aunthenticateUser } from '../redux/Actions'
import Navbar from "./Navbar"
import api from '../api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      password: '',
      emailIdError: '',
      hidden: '',
      errorMessage: '',
      buttonActive: false,
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.validate)
  }
  validate = () => {
    const value = this.state.emailId;
    if (value.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/) && (this.state.password).length > 2) {
      this.setState({
        buttonActive: true
      })
    }
    else {
      this.setState({
        buttonActive: false
      })
    }
  }

  submitBooking = (event) => {
    this.setState({ loading: true }, this.fetchDetails(event))
  }
  fetchDetails = (event) => {
    var data = { email: this.state.emailId, password: this.state.password }
    axios.post(api.url + 'login', data)
      .then(response => {
        if (response.data.error == null) {
          this.props.loginuser(response.data.message)
          this.setState(() => ({
            errorMessage: "",
            loading: false,
          }))
        }
        else {
          this.setState(() => ({
            errorMessage: response.data.error,
            loading: false,
          }))
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






    event.preventDefault();


  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <React.Fragment>
          <header>
            <div style={{
              height: "8px",
              backgroundColor: "#00796B"
            }}></div>
          </header>
          <div style={{ paddingTop: "5px", textAlign: "center" }}>
            <div style={{ padding: "32px 0 14px 0" }}>
              <h2 style={{ fontFamily: "OpenSans, Arial, Helvetica, sans-serif", fontSize: "50px", lineHeight: "1.25", fontWeight: "900", color: "#009688" }}>
                <strong style={{ color: "#000" }}>Gully</strong>Cricket</h2>
            </div>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "600", lineHeight: "1.3333", paddingBottom: "4px", color: "#000", fontFamily: "OpenSans, Arial, Helvetica, sans-serif" }}>Welcome Back</h1>
              <p style={{ fontSize: "1.0rem", fontWeight: "400", lineHeight: "1.75", padding: "0 10px 20px 10px", color: "rgba(0,0,0,0.6)", fontFamily: "OpenSans, Arial, Helvetica, sans-serif" }}>Add your Cricket Match details and see analytics, player wise or team wise & many more. !!</p>
            </div>


            <div style={{ flexDirection: "column" }}>

              <div style={{ paddingRight: "0px", maxWidth: "1240px", display: "flex", justifyContent: "center", flexDirection: "row", margin: "0 auto", alignContent: "center", padding: "0 20px 0 20px" }}>

                <div style={{ marginBottom: "39px", width: "500px" }}>
                  <form>
                    <div className="col">
                      <div className="form-group">
                        <input className="form-control inpi_login" placeholder="Your email" type="email" name="emailId"
                          value={this.state.emailId}
                          onChange={this.handleChange}
                          style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871" }}
                        />
                      </div>
                      <i className="fas fa-envelope input-icon" style={{ left: "-45.5%", top: "-40px", paddingRight: "3px" }}></i>
                      <br />
                      {/*<span className="text-danger " name="emailIdError" style={{}}>{this.state.emailIdError}</span>*/}


                      <div className="form-group" >
                        <input className="form-control inpi_login" placeholder="Your password" type="password" name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871" }}
                        />
                        <i className="fas fa-lock input-icon" style={{ left: "-45.5%", top: "-40px", paddingRight: "2px" }}></i>
                        {/*{this.state.hidden ? <i className="fas fa-eye input-icon" style={{ right: "25px" }} onClick={() => this.setState({
                          hidden: this.state.hidden == true ? false : true
                        })}></i>
                          :
                          <i className="fas fa-eye-slash input-icon" style={{ position:"absolute" }} onClick={() => this.setState({
                            hidden: this.state.hidden == true ? false : true
                          })}></i>
                        }*/}

                        {/*  <span className="text-danger" name="passworderror">{this.state.formErrorMessage.password}</span>*/}
                      </div>
                      <div className="form-check" style={{ alignItems: "center", display: "flex", fontSize: "14px", justifyContent: "flex-end", top: "0px", left: "0px" }}>

                        <Link className="form-check" to="/forget_password" style={{ right: "0px", fontSize: "14px", textDecoration: "none", marginTop: "-12px" }}>Forgot your password?</Link>

                      </div>



                      <br />
                      {this.state.loading ? <button className="btn form-control" id="but" type="submit" name="book" disabled={!this.state.buttonActive || this.state.loading} onClick={this.submitBooking}><strong>Logging in..</strong>&nbsp;<Spinner animation="border" className="login-loader" style={{
                        justifyContent: "center", alignSelf: "center", width: "2rem",
                        height: "2rem",
                      }}  ></Spinner></button>

                        : <button className="btn form-control" id="but" type="submit" style={{ marginTop: "-20px" }} name="book" disabled={!this.state.buttonActive || this.state.loading} onClick={this.submitBooking}>Log In </button>
                      }



                      {/* <button className="btn btn-success from-control"  onClick={this.submitBooking}>Back</button> */}


                      <br />
                      <br />
                      {/* {this.state.goBack ? } */}
                      <div>
                        <span className="text-danger modalfoot">{this.state.errorMessage}</span>
                      </div>
                    </div>
                  </form>


                  <div style={{ alignContent: "center", textAlign: "center" }}>
                    <br />
                  </div>
                  <strong style={{ fontSize: "18px", fontWeight: "400", marginBottom: "" }}>New to GullyCricket?</strong>
                  <Link to="/signup">
                    <strong style={{ fontSize: "17px", fontWeight: "500", marginBottom: "" }}> Create an account</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>

      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginuser: (data) => { dispatch(aunthenticateUser(data)) }
  }
}
const mapStateToProps = (state) => {
  var k = state.data;
  return {
    userdata: k
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
