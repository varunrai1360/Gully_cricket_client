
import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Table from 'react-bootstrap/Table'
import api from '../api.json';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Cell, PieChart, Pie } from 'recharts';
import spinner from './spinner.gif'
import Spinner from 'react-bootstrap/Spinner'
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { editPlayerProfile } from '../redux/Actions'


const barColors = ["#C62828", "#6A1B9A", "#2962FF", "#006064", "#1B5E20", "#311B92", "#FF1744", "#004D40", "#1E88E5", "#880E4F", "#E65100", "#3E2723"]
const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];
const COLORSWL = ['#41C300', '#FF1744'];

class Playerprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: '',
      batInn: '',
      bowlInn: '',
      bestBowling: '',
      hs: '',
      chart: [],
      pie: [],
      teamWinCounter: [],
      loading: true,
      editModal: false,
      deleteModal: false,
      playerName: "",
      playerProfile: "",
      editErrorMsg: "",
      succesEditMsg: "",
      editLoading: false,
    }
  }


  componentDidMount() {
    const userId = this.props.match.params.userId;
    const id = this.props.match.params.playerId;

    axios.get(api.url + `profiles/analytics/${userId}/${id}`)
      .then(response => {
        if (response.data.error == null) {
          let data = JSON.parse(JSON.stringify(response.data.message[0].players[0].datewiseSummry))
          // data = data.datewiseSummry
          let max = 0
          let Inn = 0
          let bowlIn = 0
          let wicket = 0
          let bestBowling = ''
          let year = '2022'
          let x = {}
          let chartData = []
          let pieChart = []
          let teamWin = []
          for (var i = 0; i < data.length; i++) {
            if (parseInt(data[i].ballfaced) > 0) {
              Inn = Inn + 1
            }
            if (parseInt(data[i].runScored) > max) {
              max = parseInt(data[i].runScored)
            }
            if (parseInt(data[i].overBowled) > 0) {
              bowlIn = bowlIn + 1
            }
            if (parseInt(data[i].wicketTaken) > wicket) {
              wicket = parseInt(data[i].wicketTaken)
              bestBowling = data[i].runsGone + "/" + wicket
            }
            if (year.length == 4) {
              if (data[i].date.substring(0, 4) == year) {
                if (x[parseInt(data[i].date.substring(5, 7))]) {
                  x[parseInt(data[i].date.substring(5, 7))] = parseInt(data[i].runScored) + parseInt(x[parseInt(data[i].date.substring(5, 7))])
                  // console.log(x[parseInt(data[i].date.substring(5,7))])
                }
                else {
                  x[parseInt(data[i].date.substring(5, 7))] = parseInt(data[i].runScored)
                }
              }
            }
            else {
              if (x[parseInt(data[i].date.substring(5, 7))]) {
                x[parseInt(data[i].date.substring(5, 7))] = parseInt(data[i].runScored) + parseInt(x[parseInt(data[i].date.substring(5, 7))])
                console.log(x[parseInt(data[i].date.substring(5, 7))])
              }
              else {
                x[parseInt(data[i].date.substring(5, 7))] = parseInt(data[i].runScored)
              }
            }
          }
          pieChart = [
            { name: '4s', value: parseInt(response.data.message[0].players[0].totalFours) * 4 },
            { name: '6s', value: parseInt(response.data.message[0].players[0].totalSixes) * 6 },
            { name: '1s', value: (parseInt(response.data.message[0].players[0].totalRunScored)) - (parseInt(response.data.message[0].players[0].totalSixes) * 6 + parseInt(response.data.message[0].players[0].totalFours) * 4) }
          ];

          teamWin = [
            { name: 'W', value: parseInt(response.data.message[0].players[0].teamWinCounter) },
            { name: 'L', value: parseInt(response.data.message[0].players[0].datewiseSummry.length) - parseInt(response.data.message[0].players[0].teamWinCounter) },

          ];

          // pieChart.push({})
          // for(var i=1;i<=12;i++){
          //   if(i == 1)
          //     chartData.push({''})
          // }
          chartData.push({ 'Month': 'Jan', 'run': x[1] || 0 })
          chartData.push({ 'Month': 'Feb', 'run': x[2] || 0 })
          chartData.push({ 'Month': 'Mar', 'run': x[3] || 0 })
          chartData.push({ 'Month': 'Apr', 'run': x[4] || 0 })
          chartData.push({ 'Month': 'May', 'run': x[5] || 0 })
          chartData.push({ 'Month': 'Jun', 'run': x[6] || 0 })
          chartData.push({ 'Month': 'Jul', 'run': x[7] || 0 })
          chartData.push({ 'Month': 'Aug', 'run': x[8] || 0 })
          chartData.push({ 'Month': 'Sep', 'run': x[9] || 0 })
          chartData.push({ 'Month': 'Oct', 'run': x[10] || 0 })
          chartData.push({ 'Month': 'Nov', 'run': x[11] || 0 })
          chartData.push({ 'Month': 'Dec', 'run': x[12] || 0 })

          // console.log(chartData,'yes')


          //   let data2 = JSON.parse(JSON.stringify(response.data.message[0].players))

          //   data.sort((a, b) => b.totalRunScored - a.totalRunScored)
          //   data2.sort((a, b) => b.totalWicket - a.totalWicket)

          // console.log('**',response.data.message[0].players[0])
          this.setState(() => ({
            profileData: response.data.message[0].players[0],
            hs: max,
            batInn: Inn,
            bowlInn: bowlIn,
            bestBowling: bestBowling,
            chart: chartData,
            pie: pieChart,
            teamWinCounter: teamWin,
            loading: false,
            playerName: response.data.message[0].players[0].name,
            playerProfile: response.data.message[0].players[0].profilePhotoUrl
          }))
        }
        else {
          this.setState(() => ({
            errorMessage: response.data.error,
            playersData: [],
            loading: false

          }))
        }

      })
      .catch(error => {
        if (error.response) {
          this.setState(() => ({
            errorMessage: error.response.data.message,
            loading: false
          }))
        }
        else {
          this.setState(() => ({
            errorMessage: error.message,
            loading: false
          }))
        }
      })
  }

  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, data }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    // console.log(index,'math')

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}% ${this.state.pie[index].name}`}
      </text>
    );
  };

  teamWinLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, data }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    // console.log(index,'math')

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}% ${this.state.teamWinCounter[index].name}`}
      </text>
    );
  };

  onEditSubmit = (e) => {

    this.setState({ editLoading: true })

    const userId = this.props.match.params.userId;
    const id = this.props.match.params.playerId;
    const data = { name: this.state.playerName, profilePhotoUrl: this.state.playerProfile }

    axios.put(api.url + `edit/player/profile/${userId}/${id}`, data)
      .then(response => {
        if (response.data.error == null) {
          this.props.editPlayerProfile(response.data.message[0])

          let data = this.state.profileData
          data.name = this.state.playerName
          data.profilePhotoUrl = this.state.playerProfile

          this.setState(() => ({
            succesEditMsg: "Changes Saved",
            editErrorMsg: "",
            editLoading: false,
            // editModal: false,
            "profileData": data
          }))
        }
        else {
          this.setState(() => ({
            editLoading: false,
            editErrorMsg: response.data.error,
          }))
        }

      })
      .catch(error => {
        if (error.response) {
          this.setState(() => ({
            successMessage: "",
            editLoading: false,
            editErrorMsg: error.response.data.message
          }))
        }
        else {
          this.setState(() => ({
            successMessage: "",
            editLoading: false,
            editErrorMsg: error.message,
          }))
        }
      })

    e.preventDefault();
  }


  onDelSubmit = (e) => {

    this.setState({ editLoading: true })

    const userId = this.props.match.params.userId;
    const id = this.props.match.params.playerId;
    // const data = { name: this.state.playerName, profilePhotoUrl: this.state.playerProfile }

    axios.delete(api.url + `delete/player/profile/${userId}/${id}`)
      .then(response => {
        if (response.data.error == null) {


          this.props.editPlayerProfile(response.data.message[0])
          this.props.history.push('/')
          // let data = this.state.profileData
          // data.name = this.state.playerName
          // data.profilePhotoUrl = this.state.playerProfile

          // this.setState(() => ({
          //   succesEditMsg: "Changes Saved",
          //   editErrorMsg: "",
          //   editLoading: false,
          //   editModal: false,
          //   "profileData": data
          // }))
        }
        else {
          this.setState(() => ({
            editLoading: false,
            editErrorMsg: response.data.error,
          }))
        }

      })
      .catch(error => {
        if (error.response) {
          this.setState(() => ({
            successMessage: "",
            editLoading: false,
            editErrorMsg: error.response.data.message
          }))
        }
        else {
          this.setState(() => ({
            successMessage: "",
            editLoading: false,
            editErrorMsg: error.message,
          }))
        }
      })

    e.preventDefault();

  }

  render() {
    // console.log(this.props.userdata.data)
    return (
      <React.Fragment>

        <Navbar />
        {
          !this.state.loading
            ?
            <React.Fragment>
              <br />
              <div style={{ display: "block" }}>
                <div style={{ display: "inline-block", float: "left", padding: "20px" }}>
                  <img src={this.state.profileData.profilePhotoUrl} style={{ width: "150px", height: "150px", borderRadius: "10px", boxShadow: "1 0 1 0" }}></img>
                </div>
                <br />
                <div style={{ paddingTop: "0px" }}>
                  <h1 style={{ fontSize: "37px", fontWeight: "1000" }}>{this.state.profileData.name}</h1>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#666" }}>India</h3>
                  {this.props.userdata.data._id == this.props.match.params.userId ? <span>
                    <i style={{ top: "2px", fontSize: "15px", paddingLeft: "0px", cursor: "pointer" }} onClick={() => this.setState({ editModal: true })} className="fas fa-pen input-icon"></i>
                    <i style={{ top: "2px", paddingLeft: "10px", fontSize: "15px", cursor: "pointer" }} onClick={() => this.setState({ deleteModal: true })} className="fas fa-trash input-icon"></i>
                  </span>
                    :
                    <span></span>
                  }

                  <Modal show={this.state.deleteModal} onHide={() => this.setState({ deleteModal: false })} animation={true} centered>
                    <Modal.Header closeButton>
                      <Modal.Title style={{ fontSize: "21px", display: "flex", justifyContent: "center" }}>Remove Player</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div style={{ display: "flex", justifyContent: "center", fontSize: "16.5px" }}>
                        <span style={{ color: "rgb(135, 135, 135)" }}>Are you sure you want to remove this player?</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", padding: "0 0px 0 0px", marginTop: "0px" }}>

                        <form>
                          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", marginBottom: "16px", fontSize: "18px" }}>
                            <Button variant="secondary" style={{ margin: "10px", fontSize: "18px", height: "55px", width: "110px", color: "#000", background: "#ECEFF1", borderColor: "#c2c2c2", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 20%);" }}
                              onClick={() => this.setState({ deleteModal: false })}>
                              Cancel
                            </Button>
                            <Button variant="primary" style={{ margin: "10px", fontSize: "18px", background: "#2962FF", width: "110px", borderColor: "#c2c2c2", height: "55px", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 20%);" }}
                              disabled={this.state.editLoading}
                              onClick={this.onDelSubmit}
                            >
                              {this.state.editLoading ? <React.Fragment><Spinner animation="border" className="login-loader" style={{
                                justifyContent: "center", alignSelf: "center", width: "2rem",
                                height: "2rem",
                              }} ></Spinner></React.Fragment> :
                                <React.Fragment>Remove</React.Fragment>
                              }

                            </Button>
                          </div>
                          <div>
                            <span className="text-danger modalfoot">{this.state.editErrorMsg}</span>
                          </div>
                        </form>
                      </div>
                    </Modal.Body>
                  </Modal>

                  <Modal show={this.state.editModal} onHide={() => this.setState({ editModal: false })} animation={true} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Detail's</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <div>
                          <div style={{ display: "flex", justifyContent: "center", padding: "0 0px 0 0px", marginTop: "0px" }}>
                            <div style={{ width: "350px" }}>
                              <input className="form-control inpi_login" placeholder="Player Name" type="text" name="search"
                                value={this.state.playerName}
                                onChange={(e) => this.setState({ playerName: e.target.value, successMessage: "" })}
                                style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871", borderRadius: "0px", height: "50px", paddingLeft: "9px", borderRadius: "5px" }}
                              />
                              {/* <i className="fas fa-user input-icon" style={{ left: "-1.5%", top: "-40px", paddingRight: "3px" }}></i>*/}
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "center", padding: "0 0px 0 0px", marginTop: "20px" }}>
                            <div style={{ width: "350px" }}>
                              <input className="form-control inpi_login" placeholder="Profile Image" type="text" name="search"
                                value={this.state.playerProfile}
                                onChange={(e) => this.setState({ playerProfile: e.target.value, successMessage: "" })}
                                style={{ fontFamily: "SourceCodePro, monaco, monospace", border: "1px solid #576871", borderRadius: "0px", height: "50px", paddingLeft: "9px", borderRadius: "5px" }}
                              />
                              {/*<i className="fas fa-camera-retro input-icon" style={{ left: "-1.5%", top: "-40px", paddingRight: "3px" }}></i>*/}
                            </div>
                          </div>


                          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", marginBottom: "16px", fontSize: "18px" }}>
                            <Button variant="secondary" style={{ margin: "10px", width: "110px", background: "#D81B60", borderColor: "#D81B60" }}
                              onClick={() => this.setState({ editModal: false })}>
                              Cancel
                            </Button>
                            <Button variant="primary" style={{ margin: "10px", background: "#1976D2", borderColor: "#1976D2", }}
                              disabled={(this.state.profileData.name == this.state.playerName && this.state.profileData.profilePhotoUrl == this.state.playerProfile) || this.state.editLoading}
                              onClick={this.onEditSubmit}
                            >
                              {this.state.editLoading ? <React.Fragment>Saving...<Spinner animation="border" className="login-loader" style={{
                                justifyContent: "center", alignSelf: "center", width: "2rem",
                                height: "2rem",
                              }} ></Spinner></React.Fragment> :
                                <React.Fragment>Save Changes</React.Fragment>
                              }

                            </Button>
                          </div>
                          <span className="text-success modalfoot">{this.state.succesEditMsg}</span>
                          <span className="text-danger modalfoot">{this.state.editErrorMsg}</span>

                        </div>
                      </form>

                    </Modal.Body>

                  </Modal>

                </div>
              </div>
              <div style={{ marginTop: "100px" }}>
                <h1 style={{ fontSize: "20px", fontWeight: "600", padding: "0 20px 10px" }}>Batting Career Summary : </h1>
              </div>
              <div style={{ padding: "0 20px" }}>
                <div>
                  <div >
                    <Table responsive style={{
                      verticalAlign: "middle"
                    }} >
                      <thead>
                        <tr style={{
                          display: "revert",
                          background: "#00796B", color: "#fff",
                          border: "0px transparent"
                        }}>

                          <th title="Number of matches played">M</th>
                          <th title="Innings">Inn</th>
                          <th title="Number of Not Outs">NO</th>
                          <th title="Run Scored">Runs</th>
                          <th title="Highest Score">HS</th>
                          <th title="Total Ball Faced">Balls</th>
                          <th title="Batting Average">Avg</th>
                          <th title="Batting Strike Rate">SR</th>
                          <th title="Fours hit">4s</th>
                          <th title="Six hit">6s</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.profileData.name != undefined ?
                            <tr>
                              <td>{(this.state.profileData.datewiseSummry).length}</td>
                              <td>{this.state.batInn}</td>
                              <td>{(this.state.profileData.datewiseSummry).length - ((this.state.profileData.outCounter))}</td>
                              <td>{this.state.profileData.totalRunScored}</td>
                              <td>{this.state.hs}</td>
                              <td>{this.state.profileData.totalballFaced}</td>
                              <td>{this.state.profileData.average.toFixed(2)}</td>
                              <td>{this.state.profileData.strikeRate.toFixed(2)}</td>
                              <td>{this.state.profileData.totalFours}</td>
                              <td>{this.state.profileData.totalSixes}</td>

                            </tr>
                            :
                            <tr>
                              <td></td>
                            </tr>
                        }
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>



              <div style={{ marginTop: "10px" }}>
                <h1 style={{ fontSize: "20px", fontWeight: "600", padding: "0 20px 10px" }}>Bowling Career Summary : </h1>
              </div>
              <div style={{ padding: "0 20px" }}>
                <div>
                  <div >
                    <Table responsive style={{
                      verticalAlign: "middle"
                    }} >
                      <thead>
                        <tr style={{
                          display: "revert",
                          background: "#00796B", color: "#fff",
                          border: "0px transparent"
                        }}>

                          <th title="Number of matches played">M</th>
                          <th title="Innings">Inn</th>
                          <th title="Number of overs bowled">overs</th>
                          <th title="Run Conceded">Runs</th>
                          <th title="Total Wickets">Wkts</th>
                          <th title="Best Bowling Figure">BBF</th>
                          <th title="Economy">Econ</th>
                          <th title="Bowling Strike Rate">SR</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td>{(this.state.profileData.datewiseSummry).length}</td>
                          <td>{this.state.bowlInn}</td>
                          <td>{this.state.profileData.totaloversBowled}</td>
                          <td>{this.state.profileData.totalRunsGone}</td>
                          {parseInt(this.state.profileData.totalWicket) > 0 ? <td>{this.state.profileData.totalWicket}</td>
                            : <td>-</td>
                          }
                          {this.state.bestBowling ? <td>{this.state.bestBowling}</td> : <td>-</td>
                          }
                          {parseInt(this.state.profileData.totaloversBowled) == 0 ?

                            <td>-</td>
                            : <td>{(parseInt(this.state.profileData.totalRunsGone) / parseInt(this.state.profileData.totaloversBowled)).toFixed(2)}</td>}

                          {parseInt(this.state.profileData.totalWicket) > 0 ? <td>{((parseInt(this.state.profileData.totaloversBowled) * 6) / parseInt(this.state.profileData.totalWicket)).toFixed(2)}</td>
                            :
                            <td>-</td>
                          }

                        </tr>


                      </tbody>
                    </Table>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-11">
                    <div style={{ padding: "0 0px", fontSize: "20px", fontWeight: "800", fontFamily: "OpenSans, Arial, Helvetica, sans-serif", color: "#263238", marginBottom: "15px", marginTop: "20px" }}>
                      Boundaries % :
                    </div>
                    <div className="" style={{ height: "300px" }}>
                      <ResponsiveContainer>
                        <PieChart width={400} height={400} label
                          margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 20,
                          }}
                        >
                          <Pie
                            data={this.state.pie}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            // label={(e)=>
                            //   (((parseInt(e.value)/parseInt(this.state.profileData.totalRunScored))*100).toFixed(1)) + "% by " +e.name
                            // }
                            label={this.renderCustomizedLabel}

                            outerRadius={125}
                            fill="#8884d8"
                            dataKey="value"
                          // label

                          >
                            {this.state.pie.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>



                <div className="row">
                  <div className="col-sm-11">
                    <div style={{ padding: "0 0px", fontSize: "20px", fontWeight: "800", fontFamily: "OpenSans, Arial, Helvetica, sans-serif", color: "#263238", marginBottom: "15px", marginTop: "20px" }}>
                      Win/Loss % :
                    </div>
                    <div className="" style={{ height: "300px" }}>
                      <ResponsiveContainer>
                        <PieChart width={400} height={400} label
                          margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 20,
                          }}
                        >
                          <Pie
                            data={this.state.teamWinCounter}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            // label={(e)=>
                            //   (((parseInt(e.value)/parseInt(this.state.profileData.totalRunScored))*100).toFixed(1)) + "% by " +e.name
                            // }
                            label={this.teamWinLabel}

                            outerRadius={125}
                            fill="#8884d8"
                            dataKey="value"
                          // label

                          >
                            {this.state.teamWinCounter.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORSWL[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-sm-11">
                    <div style={{ padding: "0 0px", fontSize: "20px", fontWeight: "800", fontFamily: "OpenSans, Arial, Helvetica, sans-serif", color: "#263238", marginBottom: "15px" }}>
                      Month Wise Runs :
                    </div>
                    <div className="" style={{ height: "500px" }}>
                      <ResponsiveContainer>
                        <BarChart
                          width={900}
                          height={900}
                          data={this.state.chart}
                          margin={{
                            top: 20,
                            right: 10,
                            left: 10,
                            bottom: 40,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="Month" angle={-90} interval={0} textAnchor="end" fontSize={13} />
                          <YAxis label={{ value: 'Total Runs', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          {/*<Legend  angle={-90} value='custom label' position='insideLeft' style={{textAnchor: 'middle'}}/>*/}
                          <Bar dataKey="run" fill="#000" label={{ position: 'top' }} >
                            {
                              this.state.chart.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={barColors[index]} />
                              ))
                            }
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>



              </div>
            </React.Fragment>
            :
            <React.Fragment>

              <div style={{ display: "block" }}>
                <div style={{ display: "inline-block", float: "left", padding: "20px" }}>
                  <img src={this.state.profileData.profilePhotoUrl} style={{ width: "150px", height: "150px", borderRadius: "10px", boxShadow: "1 0 1 0" }}></img>
                </div>
                <br />
                <div style={{ paddingTop: "0px" }}>
                  <h1 style={{ fontSize: "37px", fontWeight: "1000" }}>{this.props.match.params.playername}</h1>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#666" }}>India</h3>
                </div>
              </div>
              <div style={{ marginTop: "100px" }}>
                <h1 style={{ fontSize: "20px", fontWeight: "600", padding: "0 20px 10px" }}>Batting Career Summary : </h1>
              </div>
              <div style={{ padding: "0 20px" }}>
                <div>
                  <div >
                    <Table responsive style={{
                      verticalAlign: "middle"
                    }} >
                      <thead>
                        <tr style={{
                          display: "revert",
                          background: "#00796B", color: "#fff",
                          border: "0px transparent"
                        }}>

                          <th title="Number of matches played">M</th>
                          <th title="Innings">Inn</th>
                          <th title="Number of Not Outs">NO</th>
                          <th title="Run Scored">Runs</th>
                          <th title="Highest Score">HS</th>
                          <th title="Total Ball Faced">Balls</th>
                          <th title="Batting Average">Avg</th>
                          <th title="Batting Strike Rate">SR</th>
                          <th title="Fours hit">4s</th>
                          <th title="Six hit">6s</th>
                        </tr>
                      </thead>
                    </Table>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "10px" }}>
                <h1 style={{ fontSize: "20px", fontWeight: "600", padding: "0 20px 10px" }}>Bowling Career Summary : </h1>
              </div>
              <div style={{ padding: "0 20px" }}>
                <div>
                  <div >
                    <Table responsive style={{
                      verticalAlign: "middle"
                    }} >
                      <thead>
                        <tr style={{
                          display: "revert",
                          background: "#00796B", color: "#fff",
                          border: "0px transparent"
                        }}>

                          <th title="Number of matches played">M</th>
                          <th title="Innings">Inn</th>
                          <th title="Number of overs bowled">overs</th>
                          <th title="Run Conceded">Runs</th>
                          <th title="Total Wickets">Wkts</th>
                          <th title="Best Bowling Figure">BBF</th>
                          <th title="Economy">Econ</th>
                          <th title="Bowling Strike Rate">SR</th>
                        </tr>
                      </thead>
                    </Table>
                  </div>
                </div>
              </div>


            </React.Fragment>
        }

        {/*<div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
      }}>
      <img src={spinner} alt="loader" style={{width:"100px",height:"100px"}} />
      </div>
    */}




      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editPlayerProfile: (data) => { dispatch(editPlayerProfile(data)) }
  }
}

const mapStateToProps = (state) => {
  var k = state.data;
  return {
    userdata: k
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playerprofile);
