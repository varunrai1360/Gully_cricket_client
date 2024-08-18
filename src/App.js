

import { connect } from 'react-redux';
import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"
import Signup from "./components/Signup";
import AddMatch from "./components/AddMatch";
import UserProfile from "./components/UserProfile";
import AboutUs from "./components/AboutUs";
import Analytics from "./components/Analytics";
import NotFound from "./components/NotFound";
import ForgetPassword from "./components/ForgetPassword";
import Playerprofile from "./components/Playerprofile"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/login" render={() =>
              this.props.userdata.loggedIn ? (
                <Redirect to='/' />
              ) : (
                <Login />
              )
            } />
            <Route exact path="/signup" render={() =>
              this.props.userdata.loggedIn ? (
                <Redirect to='/' />
              ) : (
                <Signup />
              )
            } />
            <Route exact path="/addmatch" render={() =>
              this.props.userdata.loggedIn ? (
                <AddMatch />
              ) : (
                <Redirect to='/login' />
              )
            } />

            <Route exact path="/" render={() =>
              this.props.userdata.loggedIn ? (
                <Dashboard />
              ) : (
                <Redirect to='/login' />
              )
            } />

            <Route exact path="/user/profile" render={() =>
              this.props.userdata.loggedIn ? (
                <UserProfile />
              ) : (
                <Redirect to='/login' />
              )
            } />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/forget_password" component={ForgetPassword} />
            <Route exact path="/analytics/:id" component={Analytics} />
            <Route exact path="/profiles/:userId/:playerId/:playername" component={Playerprofile} />

            <Route exact path="*" component={NotFound} />

          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}



const mapStateToProps = (state) => {
  var k = state.data;
  return {
    userdata: k
  }
}

export default connect(mapStateToProps, null)(App);
