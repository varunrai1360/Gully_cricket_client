
import React, { Component } from "react";
import Navbar from "./Navbar";
import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner'
import axios from "axios";
import { connect } from 'react-redux';
import { addPlayer } from '../redux/Actions'
import './Dashboard.css'
import api from '../api.json';
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      openModal: false,
      playerName: '',
      imageUrl: '',
      loading: false,
      errorMessage: '',
    }
  }

  filterList = (e) => {
    e.preventDefault();
  }
  addPlayer = (e) => {
    this.setState(() => ({
      openModal: true
    }))
    e.preventDefault()
  }


  submitPlayer = (e) => {
    this.setState({
      loading: true
    }, this.addPlayerName(e))
  }
  addPlayerName = (e) => {

    var data = { name: this.state.playerName, profilePhotoUrl: this.state.imageUrl, email: this.props.userdata.data.user.email }
    axios.post(api.url+'addPlayer', data)
      .then(response => {
        if (response.data.error == null) {
          this.props.addPlayer(response.data.message)
          this.setState(() => ({
            errorMessage: "",
            loading: false,
            openModal: false,
            playerName:"",
            imageUrl:""
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





    e.preventDefault();
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
        {/*<div style={{backgroundColor:"#f3f7f7"}}>
        <div style={{ position: "absolute", right: "2%", bottom: "6%", zIndex: "1001" }}>
          <div style={{ border: "1px solid black", height: "100px", width: "100px", zIndex: "1000", background: "transparent" }}>
            <i class="fas fa-plus-square" style={{position: "absolute",top:"30%",left:"30%",fontSize:"50px",color:"#00796B"}}></i>
          </div>
        </div>
    </div>*/}

        <div>



          <Modal show={this.state.openModal} centered >



            <Modal.Header className="modal-head" style={{ padding: "10px", fontweight: "500", fontsize: "18px" }}>Add Name & image URL</Modal.Header>

            <Modal.Body className="modalfoot">
              <br />

              <div className="form-group">
                <input className="form-control inpi_login" placeholder="Player Name" type="text" name="name"
                  value={this.state.playerName}
                  onChange={(e) => this.setState({ playerName: e.target.value })}
                  style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871" }}
                />
                <i className="fas fa-user input-icon" style={{ left: "-45.5%", top: "-40px", paddingRight: "3px" }}></i>
              </div>
              <div className="form-group">
                <input className="form-control inpi_login" placeholder="Profile Image URL" type="email" name="emailId"
                  value={this.state.imageUrl}
                  onChange={(e) => this.setState({ imageUrl: e.target.value })}
                  style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871" }}
                />
                <i className="fas fa-camera-retro input-icon" style={{ left: "-45.5%", top: "-40px", paddingRight: "3px" }}></i>
              </div>

              {/* {this.state.goBack ? } */}
              <div>
                {/*this.state.loading ? 
                          <span className=" form-group" style={{color:"#878787"}}><strong>Removing..</strong>&nbsp;<Spinner animation="border" className="login-loader" style={{ justifyContent: "center",alignSelf:"center",width:"2rem",
                          height:"2rem",}}  ></Spinner></span>
                         : <span className=" form-group" style={{color:"#878787"}}>Are you sure you want to remove this renter?</span>
                      */}
              </div>
              <div className=" LFy2Lc">
                <div className="_2K02N8 _2x63a8">

                  <button className=" btn btn-danger" style={{ height: "44px", width: "120px", border: "1px solid #c2c2c2", boxShadow: "0 2px 2px 0 rgb(0 0 0 / 20%)", background: "#E91E63" }} onClick={() => this.setState({ openModal: false })}>Cancel</button>&nbsp;&nbsp;&nbsp;
                  <button className=" btn btn-primary" style={{ height: "44px", width: "120px", border: "1px solid #c2c2c2", boxShadow: "0 2px 2px 0 rgb(0 0 0 / 20%)", background: "#009688" }} disabled={this.state.loading || this.state.playerName.length === 0} onClick={this.submitPlayer}>
                    {this.state.loading ?
                      <Spinner animation="border" className="login-loader"
                        style={{ justifyContent: "center", alignSelf: "center", width: "2rem", height: "2rem" }}>
                      </Spinner>
                      : <span>Add Player</span>}</button>


                </div>
              </div>

              {/* Implement the code for routing of components Here */}



              <br />

            </Modal.Body>

          </Modal>



          <div style={{ paddingRight: "0px", maxWidth: "1240px", display: "flex", justifyContent: "center", flexDirection: "row", margin: "0 auto", alignContent: "center", padding: "0 20px 0 20px", marginTop: "50px" }}>

            <div style={{ marginBottom: "39px", width: "500px" }}>
              <form>
                <div className="col">
                  <div className="form-group">
                    <input className="form-control inpi_login" placeholder="Search Player" type="text" name="search"
                      value={this.state.searchInput}
                      onChange={(e) => this.setState({ searchInput: e.target.value })}
                      style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871", borderRadius: "30px", height: "50px", paddingLeft: "25px" }}
                    />
                    {/*<i class="fas fa-search input-icon" style={{ top: "-42px", paddingRight: "3px",fontSize:"20px" }}></i>*/}
                  </div>
                  {/*<i className="fas fa-envelope input-icon" style={{ left: "-45.5%", top: "-40px", paddingRight: "3px" }}></i>*/}
                  <br />
                  {/*<span className="text-danger " name="emailIdError" style={{}}>{this.state.emailIdError}</span>*/}







                  {/*this.state.loading ? <button className="btn form-control" id="but" type="submit" name="book" disabled={!this.state.buttonActive || this.state.loading} onClick={this.submitBooking}><strong>Logging in..</strong>&nbsp;<Spinner animation="border" className="login-loader" style={{
            justifyContent: "center", alignSelf: "center", width: "2rem",
            height: "2rem",
          }}  ></Spinner></button>

            : <button className="btn form-control" id="but" type="submit" style={{ marginTop: "-20px" }} name="book" disabled={!this.state.buttonActive || this.state.loading} onClick={this.submitBooking}>Log In </button>
        */}


                  <div>
                    <button className="btn  from-control" style={{ position: "absolute", right: "50%", marginRight: "10px", fontWeight: "400", height: "45px", width: "120px", background: "#fff", border: "1px solid #c2c2c2", boxShadow: "0 2px 2px 0 rgb(0 0 0 / 20%)" }} onClick={this.filterList}>Search..!!</button>
                  </div>
                  <div>
                    <button className="btn from-control" style={{ position: "absolute", left: "50%", fontWeight: "400", color: "#fff", marginLeft: "10px", height: "45px", width: "120px", background: "rgb(0, 121, 107)", border: "1px solid #c2c2c2", boxShadow: "0 2px 2px 0 rgb(0 0 0 / 20%)" }} onClick={this.addPlayer}>Add Player !</button>
                  </div>

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

            </div>
          </div>

      <div className="row">
      { this.props.userdata.data.players.map((ele,key)=>(
  <div className="col-sm-4" key={key}>
    <div className="card">
    <img className="card-img-top" style={{width:"100px",height:"100px",borderRadius:"50%",alignSelf:"center"}} src={ele.profilePhotoUrl} alt=""></img>
        <div className="card-body">
        
        <div style={{fontSize:"18px",display: "flex",justifyContent: "center"}}>Name : {ele.name}</div>
        <div style={{fontSize:"14px",display: "flex",justifyContent: "center"}}>Total Run : {ele.totalRunScored}</div>
        <div style={{fontSize:"14px",display: "flex",justifyContent: "center"}}>Average : {ele.average.toFixed(2)}</div>
        <div style={{fontSize:"14px",display: "flex",justifyContent: "center"}}>Total Wickets : {ele.totalWicket}</div>
        <div style={{fontSize:"14px",display: "flex",justifyContent: "center"}}>Team Win Counter : {ele.teamWinCounter}</div>
        <Link className=" stretched-link"to={{pathname: `profiles/${this.props.userdata.data._id}/${ele._id}/${ele.userId}`, }} ></Link>
        </div>
    </div>
  </div>
      ))
      }
  {/*<div class="col-sm-4">
    <div class="card"></div>
  </div>
  <div class="col-sm-4">
    <div class="card"></div>
    </div>*/}
</div>

        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: (data) => { dispatch(addPlayer(data)) }
  }
}

const mapStateToProps = (state) => {
  var k = state.data;
  return {
    userdata: k
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

