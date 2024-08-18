import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { aunthenticateUser } from '../redux/Actions'
import Navbar from "./Navbar"
import api from '../api.json';

class Registeration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                password: "",
                emailId: "",
                name: "",
                mobile: "",
            },
            passwordError: "",
            emailIdError: "",
            nameError: "",
            mobileError: "",
            errorMessage: "",
            loading: "",
            emailActive: false,
            passwordActive: false,
            nameActive: false,
            mobileActive: false,
        };
    }



    submitBooking = (event) => {
        this.setState({ loading: true })
        var data = { email: this.state.form.emailId, password: this.state.form.password, name: this.state.form.name, mobile: this.state.form.mobile }
        // let url = '' + "signup";
        axios.post(api.url+'signup', data)
            .then(response => {
                if (response.data.error == null) {
                    this.props.signupUser(response.data.message[0])
                    this.setState(() => ({
                        errorMessage: "",
                        loading: false,
                    }))
                }
                else {
                    this.setState(() => ({
                        loading: false,
                        errorMessage: response.data.error,
                    }))
                }

            })
            .catch(error => {
                if (error.response) {
                    this.setState(() => ({
                        successMessage: "",
                        loading: false,
                        errorMessage: error.response.data.message
                    }))
                }
                else {
                    this.setState(() => ({
                        successMessage: "",
                        loading: false,
                        errorMessage: error.message,
                    }))
                }
            })
        event.preventDefault();


    }


    handleChange = (e) => {
        let form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState(() => ({
            form,
        }))
        this.validate(e.target.name)
    }


    validate = (name) => {
        switch (name) {
            case 'emailId':
                if (!this.state.form.emailId) {

                    this.setState(() => ({
                        emailIdError: "Email Required",
                        emailActive: false
                    }))
                }
                else if (!this.state.form.emailId.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)) {

                    this.setState(() => ({
                        emailIdError: "Email id should be abcd@gmail.com format",
                        emailActive: false
                    }))
                } else {
                    this.setState(() => ({
                        emailIdError: "",
                        emailActive: true
                    }))
                }
                break;

            case 'password':

                if (!this.state.form.password) {

                    this.setState(() => ({
                        passwordError: "Password Required",
                        passwordActive: false,
                    }))
                }
                else if (this.state.form.password.length < 7) {
                    this.setState(() => ({
                        passwordError: "Password length should be greater than 6",
                        passwordActive: false,

                    }))
                } else {
                    this.setState(() => ({
                        passwordError: "",
                        passwordActive: true,

                    }))
                }

                break;


            case 'name':

                if (!this.state.form.name) {

                    this.setState(() => ({
                        nameError: "Name Required",
                        nameActive: false
                    }))
                }
                else {
                    this.setState(() => ({
                        nameError: "",
                        nameActive: true
                    }))
                }

                // if (this.state.emailActive && this.state.passwordActive && this.state.nameActive && this.state.mobileActive) {
                //     this.setState(() => ({
                //         buttonActive: true
                //     }))
                // }
                // else {
                //     this.setState(() => ({
                //         buttonActive: false
                //     }))
                // }

                break;

            case 'mobile':

                if (!this.state.form.mobile) {

                    this.setState(() => ({
                        mobileError: "Mobile Number Required",
                        mobileActive: false
                    }))
                }
                else if (this.state.form.mobile.length === 10) {
                    this.setState(() => ({
                        mobileError: "",
                        mobileActive: true
                    }))
                } else {
                    this.setState(() => ({
                        mobileError: "Mobile Number should be of 10 digit",
                        mobileActive: false
                    }))
                }

                break;

            default: break;
        }
    }

    render() {
        return (

            <React.Fragment>
                <Navbar />
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
                        <p style={{ fontSize: "1.0rem", fontWeight: "400", lineHeight: "1.75", padding: "0 10px 20px 10px", color: "rgba(0,0,0,0.6)", fontFamily: "OpenSans, Arial, Helvetica, sans-serif" }}>Register to manage your gully cricket records through your mobile's...!!</p>
                    </div>


                    <div style={{ flexDirection: "column" }}>

                        <div style={{ paddingRight: "0px", maxWidth: "1240px", display: "flex", justifyContent: "center", flexDirection: "row", margin: "0 auto", alignContent: "center", padding: "0 20px 0 20px" }}>

                            <div style={{ marginBottom: "39px", width: "500px" }}>


                                <form>

                                    <div className="col">

                                        <div className="form-group">

                                            <input className="form-control input error inpi_login" placeholder="Email" type="email" name="emailId"
                                                value={this.state.form.emailId}
                                                onChange={this.handleChange}
                                                style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871" }}
                                                required
                                            />

                                            <i className="fas fa-envelope input-icon" style={{ left: "-45.5%", top: "-40px" }}></i>
                                            {/*<span className="text-danger" name="emailIdError">{this.state.formErrorMessage.emailId}</span>
                                            */}
                                        </div>


                                        <div className="form-group">

                                            <input className="form-control inpi_login" placeholder="Your password" type="password" name="password"
                                                value={this.state.form.password}
                                                onChange={this.handleChange}
                                                style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871" }}
                                                required
                                            />


                                            {/* {this.state.formErrorMessage.emailId? <i style={{ top:"110px"}} class="fas fa-lock lock-icon"></i> :
                                            <i class="fas fa-lock lock-icon"></i> }
                                            {/*<span className="text-danger " name="passworderror">{this.state.formErrorMessage.password}</span>
                                            */}
                                            <i style={{ left: "-45.5%", top: "-40px" }} className="fas fa-lock input-icon"></i>
                                            {/*this.state.hidden ? <i className="fas fa-eye lock-icon" style={{right:"25px"}} onClick={()=>this.setState({
                                                hidden: this.state.hidden == true ? false : true
                                              }) }></i>
                                            :
                                            <i className="fas fa-eye-slash lock-icon" style={{right:"25px"}} onClick={()=>this.setState({
                                                hidden: this.state.hidden == true ? false : true
                                              }) }></i>
                                            */}
                                        </div>
                                        <div className="form-group">

                                            <input className="form-control inpi_login" placeholder="First & Last name" type="text" name="name"
                                                value={this.state.form.name}
                                                onChange={this.handleChange}
                                                style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871" }}
                                                required
                                            />
                                            {/*  {this.state.formErrorMessage.emailId && this.state.formErrorMessage.password ? <i style={{ top:"207px"}} class="fas fa-user input-icon"></i> :
                                            this.state.formErrorMessage.emailId || this.state.formErrorMessage.password ? <i style={{ top:"181px"}} class="fas fa-user input-icon"></i> : 
                                            <i style={{ top:"159px"}} class="fas fa-user input-icon"></i>}
                                           
                                           {/* <span className="text-danger " name="nameerror">{this.state.formErrorMessage.name}</span>
                                        */}
                                            <i style={{ left: "-45.5%", top: "-40px" }} className="fas fa-user input-icon"></i>
                                        </div>
                                        <div className="form-group">

                                            <input className="form-control inpi_login" placeholder="Your mobile" type="text" name="mobile"
                                                value={this.state.form.mobile}
                                                onChange={this.handleChange}
                                                style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871" }}
                                                required
                                            />

                                            {/*  {this.state.formErrorMessage.emailId && this.state.formErrorMessage.password && this.state.formErrorMessage.name ? <i style={{ top:"304px"}} class="fas fa-map-marker-alt input-icon"></i> :
                                            (this.state.formErrorMessage.emailId && this.state.formErrorMessage.password) || (this.state.formErrorMessage.name && this.state.formErrorMessage.password)
                                            || (this.state.formErrorMessage.emailId && this.state.formErrorMessage.name) ? 
                                            <i style={{ top:"280px"}} class="fas fa-map-marker-alt input-icon"></i>:
                                            this.state.formErrorMessage.emailId || this.state.formErrorMessage.password || this.state.formErrorMessage.name? <i style={{ top:"255px"}} class="fas fa-map-marker-alt input-icon"></i> :  
                                            <i style={{ top:"232px"}} class="fas fa-map-marker-alt input-icon"></i>}
                                           <span className="text-danger " name="addresserror">{this.state.formErrorMessage.address}</span>
                                    */}
                                            <i style={{ left: "-45.5%", top: "-40px" }} className="fas fa-mobile-alt input-icon"></i>

                                        </div>

                                        {this.state.emailIdError ? <div style={{ textAlign: "center", alignItems: "center", alignContent: "center" }} className="text-danger" name="addresserror">{this.state.emailIdError}</div> :
                                            this.state.passwordError ? <div style={{ textAlign: "center", alignItems: "center", alignContent: "center" }} className="text-danger " name="addresserror">{this.state.passwordError}</div> :
                                                this.state.nameError ? <div style={{ textAlign: "center", alignItems: "center", alignContent: "center" }} className="text-danger " name="addresserror">{this.state.nameError}</div> :
                                                    this.state.mobileError ? <div style={{ textAlign: "center", alignItems: "center", alignContent: "center" }} className="text-danger " name="addresserror">{this.state.mobileError}</div> : <div className="text-danger " name="addresserror">{this.state.mobileError}</div>}


                                        <br />
                                        {this.state.loading ? <button className="btn form-control" id="but" type="submit" name="book" disabled={!this.state.emailActive || !this.state.passwordActive || !this.state.nameActive || !this.state.mobileActive || this.state.loading} onClick={this.submitBooking}><strong>Signing in..</strong>&nbsp;<Spinner animation="border" className="login-loader" style={{
                                            justifyContent: "center", alignSelf: "center", width: "2rem",
                                            height: "2rem",
                                        }}  ></Spinner></button>
                                            : <button className="btn form-control" id="but" type="submit" name="book" disabled={!this.state.emailActive || !this.state.passwordActive || !this.state.nameActive || !this.state.mobileActive || this.state.loading} onClick={this.submitBooking}>Create An Account</button>
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
                                <strong style={{ fontSize: "18px", fontWeight: "400", marginBottom: "" }}>Existing User?</strong>
                                <Link to="/login">
                                    <strong style={{ fontSize: "17px", fontWeight: "500", marginBottom: "" }}> Log in</strong>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (data) => { dispatch(aunthenticateUser(data)) }
    }
}

const mapStateToProps = (state) => {
    var k = state.data;
    return {
        userdata: k
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registeration);
