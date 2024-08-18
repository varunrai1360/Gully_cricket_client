
import React, { Component } from "react";
import Spinner from 'react-bootstrap/Spinner'
import Navbar from "./Navbar";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { addScoreCard } from '../redux/Actions'
import api from '../api.json';



class AddMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      openAddmatch: false,
      players: this.props.userdata.data.players,
      checkPlayers: this.props.userdata.data.players,
      teamA: "",
      teamB: "",
      addMatch: {
        matchName: "Team A vs Team B",
        totalrunA: "0",
        totalOversA: "0",
        teamNameA: "A",
        wonMatchA: false,
        totalrunB: "0",
        totalOversB: "0",
        teamNameB: "B",
        wonMatchB: false,
        data1: [{
          runScored: "0",
          ballfaced: "0",
          wicketTaken: "0",
          overBowled: "0",
          runsGone: "0",
          notOut: false,
          fours: "0",
          sixes: "0",
          userId: "",
          date: new Date()
        }],
        data2: [{
          runScored: "0",
          ballfaced: "0",
          wicketTaken: "0",
          overBowled: "0",
          runsGone: "0",
          notOut: false,
          fours: "0",
          sixes: "0",
          userId: "",
          date: new Date()
        }]
      },
      buttonDisabled: true,
      errorMessage: "",
      loading: false,
      successMessage: "",
    }
  }

  change = (team, key, e) => {
    let data = []
    // let player = this.state.players
    // for(var i=0;i<player.length;i++){
    //   if(e.target.value == player[i].userId){
    // let players = this.state
    // player.splice(i,1)
    if (team == 'A') {
      data = this.state.addMatch
      data.data1[key].userId = e.target.value
    }
    else {
      data = this.state.addMatch
      data.data2[key].userId = e.target.value
    }
    //   break;
    // }
    // }
    this.setState({ "addMatch": data })
  }



  onSubmit = (e) => {

    let teamAPlayers = []
    let teamBPlayers = []
    for (var i = 0; i < parseInt(this.state.teamA); i++) {
      teamAPlayers.push({
        runScored: "0",
        ballfaced: "0",
        wicketTaken: "0",
        overBowled: "0",
        runsGone: "0",
        notOut: false,
        fours: "0",
        sixes: "0",
        userId: "",
        date: new Date()
      })
    }

    for (var j = 0; j < parseInt(this.state.teamB); j++) {
      teamBPlayers.push({
        runScored: "0",
        ballfaced: "0",
        wicketTaken: "0",
        overBowled: "0",
        runsGone: "0",
        notOut: false,
        fours: "0",
        sixes: "0",
        userId: "",
        date: new Date()
      })
    }
    let match = this.state.addMatch
    match.data1 = teamAPlayers
    match.data2 = teamBPlayers
    this.setState({ open: false, openAddmatch: true, "addMatch": match, successMessage: "" })
    e.preventDefault()
  }


  addMatch = (e) => {
    // this.setState({
    //   loading: true
    // }, this.addScoreDetails(e))
    this.addScoreDetails(e)
  }


  addScoreDetails = (e) => {
    
    const data1 = this.state.addMatch.data1
    const data2 = this.state.addMatch.data2
var flag1 = 0 , flag2 = 0
for(var i=0;i<data1.length;i++){
  if(data1[i].runScored != 0 && data1[i].ballfaced == 0){
    flag1 = 1
    break;
    // this.setState(() => ({
    //   errorMessage:"Run Scored without facing any ball error",
    //   loading: false,
    // }))
  }
}
for(var i=0;i<data2.length;i++){
  if(data2[i].runScored != 0 && data2[i].ballfaced == 0){
    flag2 = 1
    break;
    // this.setState(() => ({
    //   errorMessage:"Run Scored without facing any ball error",
    //   loading: false,
    // }))
  }
}

if(flag1 || flag2){
  this.setState(() => ({
    errorMessage:"Run Scored without facing any ball error",
  }))
 


}
else{


  this.setState({
    loading: true
  }, this.callAddscoreApi(e))


  // this.callAddscoreApi(e)
}
return ;
// e.preventDefault();
  }

    // let dummy = [{
    //   runScored: "0",
    //   ballfaced: "0",
    //   wicketTaken: "0",
    //   overBowled: "0",
    //   runsGone: "0",
    //   notOut: false,
    //   fours: "0",
    //   sixes: "0",
    //   userId: "",
    //   date: new Date()
    // }]

    callAddscoreApi = (e) =>{
    var data = {
      email: this.props.userdata.data.user.email,
      matchName: this.state.addMatch.matchName,
      totalrunA: this.state.addMatch.totalrunA,
      totalOversA: this.state.addMatch.totalOversA,
      teamNameA: this.state.addMatch.teamNameA,
      wonMatchA: this.state.addMatch.wonMatchA,
      totalrunB: this.state.addMatch.totalrunB,
      totalOversB: this.state.addMatch.totalOversB,
      teamNameB: this.state.addMatch.teamNameB,
      wonMatchB: this.state.addMatch.wonMatchB,
      data1: this.state.addMatch.data1,
      data2: this.state.addMatch.data2
    }

    axios.post(api.url + 'addMatch', data)
      .then(response => {
        if (response.data.error == null) {
          let dummyData = this.state.addMatch
          dummyData.data1 = [{
            runScored: "0",
            ballfaced: "0",
            wicketTaken: "0",
            overBowled: "0",
            runsGone: "0",
            notOut: false,
            fours: "0",
            sixes: "0",
            userId: "",
            date: new Date()
          }]
          dummyData.data2 = [{
            runScored: "0",
            ballfaced: "0",
            wicketTaken: "0",
            overBowled: "0",
            runsGone: "0",
            notOut: false,
            fours: "0",
            sixes: "0",
            userId: "",
            date: new Date()
          }]
          dummyData.matchName = "Team A vs Team B"
          dummyData.totalrunA = "0"
          dummyData.totalOversA = "0"
          dummyData.teamNameA = "A"
          dummyData.wonMatchA = false
          dummyData.totalrunB = "0"
          dummyData.totalOversB = "0"
          dummyData.teamNameB = "B"
          dummyData.wonMatchB = false

          this.props.addScoreCard(response.data.message)

          this.setState(() => ({
            errorMessage: "",
            loading: false,
            addMatch: dummyData,
            openAddmatch: false,
            successMessage: "Sucessfully Added",
            open: true
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
        {this.state.checkPlayers.length < 2 ? <div >
          <br />
          <br />
          <h3 style={{ display: "flex", justifyContent: "center" }}>Please add players before adding match scorecard..!!</h3>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to='/' style={{ color: "#78909C", textDecoration: "none", marginBottom: "15px" }}><button className=" btn btn-primary" style={{ height: "44px", width: "120px", border: "1px solid #c2c2c2", boxShadow: "0 2px 2px 0 rgb(0 0 0 / 20%)", background: "#009688" }}>Add Player

            </button></Link>
          </div>
        </div>
          :
          <div>

            <div >

              <br />


              <Collapse in={this.state.open}>
                <form>
                  <div>
                    <div style={{ display: "flex", justifyContent: "center", padding: "0 0px 0 0px", marginTop: "20px" }}>
                      <div style={{ width: "350px" }}>
                        <input className="form-control inpi_login" placeholder="Number of player's in team A" type="number" name="search"
                          value={this.state.teamA}
                          onChange={(e) => this.setState({ teamA: e.target.value, successMessage: "" })}
                          style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871", borderRadius: "0px", height: "50px", paddingLeft: "10px" }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", padding: "0 0px 0 0px", marginTop: "20px" }}>
                      <div style={{ width: "350px" }}>
                        <input className="form-control inpi_login" placeholder="Number of player's in team B" type="number" name="search"
                          value={this.state.teamB}
                          onChange={(e) => this.setState({ teamB: e.target.value, successMessage: "" })}
                          style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871", borderRadius: "0px", height: "50px", paddingLeft: "10px" }}
                        />
                      </div>
                    </div>

                    {((parseInt(this.state.teamB) + parseInt(this.state.teamA)) > this.state.players.length) ? <span className="text-danger modalfoot" style={{ padding: "17px 15px 1px 5px" }}>Total Number of player's should not exceed total player's added !!</span> :
                      <span className="text-success modalfoot" style={{ padding: "17px 15px 1px 5px" }}>{this.state.successMessage}</span>
                    }
                    <br />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button className="btn from-control" disabled={(this.state.teamA < 1 || this.state.teamB < 1 || ((parseInt(this.state.teamB) + parseInt(this.state.teamA)) > this.state.players.length))} style={{ position: "absolute", fontWeight: "400", color: "#fff", marginLeft: "10px", height: "45px", width: "120px", background: "rgb(0, 121, 107)", border: "1px solid #c2c2c2", boxShadow: "0 2px 2px 0 rgb(0 0 0 / 20%)" }} onClick={this.onSubmit}>Submit</button>
                    </div>
                    <br />

                  </div>
                </form>
              </Collapse>
              <Collapse in={this.state.openAddmatch}>
                <div>
                  <div style={{ display: "flex", justifyContent: "", fontSize: "22px", fontFamily: "fantasy", marginBottom: "13px", fontWeight: "400", marginLeft: "10px" }}>
                    Team A's Innings :
                  </div>
                  <div className="table-responsive-xs" style={{ padding: "0" }}>

                    <Table responsive bordered hover>
                      <thead>

                        <tr style={{ background: "#4a4a4a", color: "#ffffff" }}>
                          <th scope="col" style={{ width: "150px" }}>Player Name</th>
                          <th scope="col" style={{ width: "100px" }}>Runs</th>
                          <th scope="col" style={{ width: "100px" }}>Ball Faced</th>
                          <th scope="col" style={{ width: "100px" }}>wicket</th>
                          <th scope="col" style={{ width: "100px" }}>Overs Bowled</th>
                          <th scope="col" style={{ width: "100px" }}>Runs Gone</th>
                          <th scope="col" style={{ width: "100px" }}>Not out</th>
                          <th scope="col" style={{ width: "100px" }}>4s</th>
                          <th scope="col" style={{ width: "100px" }}>6s</th>
                        </tr>


                      </thead>
                      <tbody>

                        {this.state.addMatch.data1.map((item, key) =>
                          <tr key={key}>
                            <td style={{ width: "150px" }}>
                              <select id="lang" onChange={(e) => this.change('A', key, e)}>
                                <option defaultValue="Select Player">Select Player</option>
                                {this.state.players.map((item, key) => (
                                  <option key={key} value={item.userId}>{item.name}</option>
                                ))
                                }
                              </select>

                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data1[key].runScored} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data1[key].runScored = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data1[key].ballfaced} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data1[key].ballfaced = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data1[key].wicketTaken} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data1[key].wicketTaken = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data1[key].overBowled} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data1[key].overBowled = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data1[key].runsGone} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data1[key].runsGone = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              /></td>
                            <td style={{ width: "100px" }}>
                              {/*<input value={this.state.addMatch.data1[key].notOut} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data1[key].notOut = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            */}

                              <select id="lang" onChange={(e) => {
                                let data = this.state.addMatch
                                data.data1[key].notOut = e.target.value
                                this.setState({ "addMatch": data })
                              }
                              } style={{ width: "100px" }}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                              </select>

                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data1[key].fours} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data1[key].fours = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data1[key].sixes} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data1[key].sixes = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                          </tr>
                        )
                        }
                        <tr style={{ background: "#E3E6E3" }}>
                          <th scope="col" style={{ width: "100px" }}>Total Runs :</th>
                          <td>
                            <input value={this.state.addMatch.totalrunA} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.totalrunA = event.target.value
                              this.setState({ "addMatch": data })
                            }}

                            />
                          </td>
                          <th scope="col" style={{ width: "100px" }}>Total Overs :</th>

                          <td>
                            <input value={this.state.addMatch.totalOversA} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.totalOversA = event.target.value
                              this.setState({ "addMatch": data })
                            }}

                            />
                          </td>

                          <th scope="col" colSpan={2} style={{ width: "100px" }}>Name of Team A :</th>

                          <td>
                            <input value={this.state.addMatch.teamNameA} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.teamNameA = event.target.value
                              this.setState({ "addMatch": data })
                            }}

                            />
                          </td>

                          <th scope="col" colSpan={1.5} style={{ width: "100px" }}>Won :</th>

                          <td>


                            <select id="lang" onChange={(e) => {
                              let data = this.state.addMatch
                              data.wonMatchA = e.target.value
                              this.setState({ "addMatch": data })
                            }
                            }
                              style={{ width: "100px" }}
                            >
                              <option value="false">No</option>
                              <option value="true">Yes</option>
                            </select>


                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    {/*<Table responsive bordered hover  style={{marginTop:"10px"}}>

                      <thead>

                        <tr >
                          <th scope="col" style={{ width: "100px" }}>Total Runs</th>
                          <th scope="col" style={{ width: "100px" }}>Total Overs</th>
                          <th scope="col" style={{ width: "100px" }}>Name of Team A</th>
                          <th scope="col" style={{ width: "100px" }}>Won the match</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ background: "#ecebeb" }}>
                          <td>
                            <input value={this.state.addMatch.totalrunA} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.totalrunA = event.target.value
                              this.setState({ data })
                            }}

                            />
                          </td>


                          <td>
                            <input value={this.state.addMatch.totalOversA} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.totalOversA = event.target.value
                              this.setState({ data })
                            }}

                            />
                          </td>


                          <td>
                            <input value={this.state.addMatch.teamNameA} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.teamNameA = event.target.value
                              this.setState({ data })
                            }}

                            />
                          </td>


                          <td>
                            <input value={this.state.addMatch.wonMatchA} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.wonMatchA = event.target.value
                              this.setState({ data })
                            }}

                            />
                          </td>
                        </tr>
                      </tbody>
                          </Table>*/}
                  </div>


                  <div style={{ display: "flex", justifyContent: "", fontSize: "22px", fontFamily: "fantasy", marginBottom: "13px", fontWeight: "400", marginTop: "40px", marginLeft: "10px" }}>
                    Team B's Innings :
                  </div>
                  <div className="table-responsive-xs" style={{ padding: "0" }}>

                    <Table responsive bordered hover>
                      <thead>

                        <tr style={{ background: "#4a4a4a", color: "#ffffff" }}>
                          <th scope="col" style={{ width: "100px" }}>Player</th>
                          <th scope="col" style={{ width: "100px" }}>Runs</th>
                          <th scope="col" style={{ width: "100px" }}>Ball Faced</th>
                          <th scope="col" style={{ width: "100px" }}>wicket</th>
                          <th scope="col" style={{ width: "100px" }}>Overs Bowled</th>
                          <th scope="col" style={{ width: "100px" }}>Runs Gone</th>
                          <th scope="col" style={{ width: "100px" }}>Not out</th>
                          <th scope="col" style={{ width: "100px" }}>4s</th>
                          <th scope="col" style={{ width: "100px" }}>6s</th>
                        </tr>


                      </thead>
                      <tbody>

                        {this.state.addMatch.data2.map((item, key) =>
                          <tr key={key}>
                            <td style={{ width: "100px" }}>
                              <select id="lang" onChange={(e) => this.change('B', key, e)}>
                                <option defaultValue="Select Player">Select Player</option>
                                {this.state.players.map((item, key) => (
                                  <option key={key} value={item.userId}>{item.name}</option>
                                ))
                                }
                              </select>
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data2[key].runScored} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data2[key].runScored = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data2[key].ballfaced} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data2[key].ballfaced = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data2[key].wicketTaken} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data2[key].wicketTaken = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data2[key].overBowled} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data2[key].overBowled = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data2[key].runsGone} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data2[key].runsGone = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              /></td>
                            <td style={{ width: "100px" }}>
                              <select id="lang" onChange={(e) => {
                                let data = this.state.addMatch
                                data.data2[key].notOut = e.target.value
                                this.setState({ "addMatch": data })
                              }
                              }
                                style={{ width: "100px" }}
                              >
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                              </select>


                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data2[key].fours} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data2[key].fours = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td style={{ width: "100px" }}>
                              <input value={this.state.addMatch.data2[key].sixes} placeholder="0" onChange={(event) => {
                                let data = this.state.addMatch
                                data.data2[key].sixes = event.target.value
                                this.setState({ "addMatch": data })
                              }}
                                style={{ width: "100px" }}
                              />
                            </td>
                          </tr>
                        )
                        }

                        <tr style={{ background: "#E3E6E3" }}>
                          <th scope="col" style={{ width: "100px" }}>Total Runs :</th>
                          <td>
                            <input value={this.state.addMatch.totalrunB} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.totalrunB = event.target.value
                              this.setState({ "addMatch": data })
                            }}

                            />
                          </td>
                          <th scope="col" style={{ width: "100px" }}>Total Overs :</th>

                          <td>
                            <input value={this.state.addMatch.totalOversB} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.totalOversB = event.target.value
                              this.setState({ "addMatch": data })
                            }}

                            />
                          </td>

                          <th scope="col" colSpan={2} style={{ width: "100px" }}>Name of Team B :</th>

                          <td>
                            <input value={this.state.addMatch.teamNameB} placeholder="0" onChange={(event) => {
                              let data = this.state.addMatch
                              data.teamNameB = event.target.value
                              this.setState({ "addMatch": data })
                            }}

                            />
                          </td>

                          <th scope="col" colSpan={1.5} style={{ width: "100px" }}>Won :</th>

                          <td>


                            <select id="lang" onChange={(e) => {
                              let data = this.state.addMatch
                              data.wonMatchB = e.target.value
                              this.setState({ "addMatch": data })
                            }
                            }
                              style={{ width: "100px" }}
                            >
                              <option value="false">No</option>
                              <option value="true">Yes</option>
                            </select>
                          </td>
                        </tr>

                      </tbody>
                    </Table>
                  </div>
                  <div>
                  <span className="text-danger modalfoot">{this.state.errorMessage}</span>
                </div>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "21px" }}>
                    <button className="btn form-control" style={{ width: "150px" }} disabled={this.state.loading} id="but" type="submit" name="book" onClick={this.addMatch}>{this.state.loading ?
                      <Spinner animation="border" className="login-loader"
                        style={{ justifyContent: "center", alignSelf: "center", width: "2rem", height: "2rem" }}>
                      </Spinner>
                      : <span>Submit Details</span>}</button>




                  </div>
                </div>


              </Collapse>
              <br />

            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addScoreCard: (data) => { dispatch(addScoreCard(data)) }
  }
}

const mapStateToProps = (state) => {
  var k = state.data;
  return {
    userdata: k
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMatch);
