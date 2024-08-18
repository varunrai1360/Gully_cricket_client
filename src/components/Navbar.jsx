
import React, { Component } from "react";
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { logoutauthenticateduser } from '../redux/Actions'

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <Navbar bg="light" expand={false}>
          <Container fluid>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Brand style={{ color: "#78909C" }}>Gully Cricket</Navbar.Brand>

            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
            >
              <Offcanvas.Header closeButton>
                {this.props.userdata.loggedIn ?
                  <Offcanvas.Title id="offcanvasNavbarLabel" style={{ color: "#78909C" }}><i className="fas fa-user-tie"></i>&nbsp;&nbsp;Hi, {this.props.userdata.data.user.name}</Offcanvas.Title>
                  :
                  <Offcanvas.Title id="offcanvasNavbarLabel" style={{ color: "#78909C" }}><i className="fas fa-bicycle"></i>&nbsp;&nbsp;Gully Cricket</Offcanvas.Title>
                }
              </Offcanvas.Header>
              <Offcanvas.Body>
                {this.props.userdata.loggedIn ?
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link to='/' style={{ color: "#78909C", textDecoration: "none", marginBottom: "15px" }}><i className="fas fa-igloo" ></i>&nbsp;&nbsp;&nbsp;Home</Link>
                    <Link to='/addmatch' style={{ color: "#78909C", textDecoration: "none", marginBottom: "15px" }}><i className="fas fa-swatchbook"></i>&nbsp;&nbsp;&nbsp;Add match</Link>
                    <Link to={{ pathname: `/analytics/${this.props.userdata.data._id}` }} style={{ color: "#78909C", textDecoration: "none", marginBottom: "15px" }}><i className="fas fa-chart-line"></i>&nbsp;&nbsp;&nbsp;Analytics</Link>
                    <Link to='/user/profile' style={{ color: "#78909C", textDecoration: "none", marginBottom: "15px" }}><i className="fas fa-hand-spock"></i>&nbsp;&nbsp;&nbsp;My profile</Link>
                    <Link to='/aboutus' style={{ color: "#78909C", textDecoration: "none", marginBottom: "4px" }}><i className="fas fa-magic"></i>&nbsp;&nbsp;&nbsp;About us</Link>
                    <Nav.Link href='/' onClick={() => this.props.logoutuser({})} style={{ color: "#78909C", marginBottom: "0px" }}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;&nbsp;Logout</Nav.Link>
                  </Nav>
                  :
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link to='/login' style={{ color: "#78909C", textDecoration: "none", marginBottom: "18px" }}><i className="fas fa-sign-in-alt"></i>&nbsp;&nbsp;&nbsp;Login</Link>
                    <Link to='/signup' style={{ color: "#78909C", textDecoration: "none", marginBottom: "18px" }}><i className="fas fa-user-plus"></i>&nbsp;&nbsp;&nbsp;Signup</Link>
                    <Link to='/aboutus' style={{ color: "#78909C", textDecoration: "none", marginBottom: "18px" }}><i className="fas fa-magic"></i>&nbsp;&nbsp;&nbsp;About us</Link>
                    <Link to='/' style={{ color: "#78909C", textDecoration: "none", marginBottom: "18px" }}><i className="fas fa-igloo" ></i>&nbsp;&nbsp;&nbsp;Home</Link>
                    <Link to='/addmatch' style={{ color: "#78909C", textDecoration: "none", marginBottom: "18px" }}><i className="fas fa-swatchbook"></i>&nbsp;&nbsp;&nbsp;Add match</Link>
                  </Nav>
                }
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);