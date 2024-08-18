
import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Table from 'react-bootstrap/Table'
import api from '../api.json';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis,ResponsiveContainer, Tooltip,Legend,Cell } from 'recharts';
// import { scaleOrdinal } from 'd3-scale';

// import { schemeCategory10 } from 'd3-scale-chromatic';

// const colors = scaleOrdinal(schemeCategory10).range();

const barColors = ["#E91E63", "#2962FF", "#E65100", "#00897B","#5E35B1","#C0CA33","#2E7D32","#4E342E","#D32F2F","#FFB300","#607D8B"]
class Analytics extends Component {
  constructor(props) {
    super(props);


    this.state = {
      playersData: [],
      batting: [],
      bowling: []
    }

  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(api.url+`all/players/${id}`)
      .then(response => {
        if (response.data.error == null) {
          let data = JSON.parse(JSON.stringify(response.data.message[0].players))
          let data2 = JSON.parse(JSON.stringify(response.data.message[0].players))

          data.sort((a, b) => b.totalRunScored - a.totalRunScored)
          data2.sort((a, b) => b.totalWicket - a.totalWicket)

          this.setState(() => ({
            playersData: response.data.message[0].players,
            batting:data,
            bowling:data2,
            loading: false,
          }))
        }
        else {
          this.setState(() => ({
            errorMessage: response.data.error,
            playersData: [],
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



  }
  filters(agr) {
    if (agr == "runScored") {
      let data = this.state.playersData
      data.sort((a, b) => b.totalRunScored - a.totalRunScored)
      this.setState({ playersData: data })
    }
    else if (agr == "notOut") {
      let data = this.state.playersData
      data.sort((a, b) => (b.datewiseSummry.length - b.outCounter) - (a.datewiseSummry.length - a.outCounter))
      this.setState({ playersData: data })
    }
    else if (agr == "average") {
      let data = this.state.playersData
      data.sort((a, b) => (b.average) - (a.average))
      this.setState({ playersData: data })
    }
    else if (agr == "average") {
      let data = this.state.playersData
      data.sort((a, b) => (b.average) - (a.average))
      this.setState({ playersData: data })
    }
    else if (agr == "strikeRate") {
      let data = this.state.playersData
      data.sort((a, b) => (b.strikeRate) - (a.strikeRate))
      this.setState({ playersData: data })
    }
    else if (agr == "foursHit") {
      let data = this.state.playersData
      data.sort((a, b) => (b.totalFours) - (a.totalFours))
      this.setState({ playersData: data })
    }
    else if (agr == "sixesHit") {
      let data = this.state.playersData
      data.sort((a, b) => (b.totalSixes) - (a.totalSixes))
      this.setState({ playersData: data })
    }
    else if (agr == "teamWin") {
      let data = this.state.playersData
      data.sort((a, b) => (b.teamWinCounter) - (a.teamWinCounter))
      this.setState({ playersData: data })
    }
    else if (agr == "wickets") {
      let data = this.state.playersData
      data.sort((a, b) => (b.totalWicket) - (a.totalWicket))
      this.setState({ playersData: data })
    }
    else if (agr == "economy") {
      let data = this.state.playersData
      data.sort((a, b) => (a.totalRunsGone / a.totaloversBowled) - (b.totalRunsGone / b.totaloversBowled))
      this.setState({ playersData: data })
    }
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <br />
        <div><h1 style={{ padding: "0 20px", fontSize: "30px", fontWeight: "700", fontFamily: "OpenSans, Arial, Helvetica, sans-serif", color: "#ef4123", marginBottom: "15px" }}>Filters : </h1></div>


        <div style={{ padding: "0 20px" }} >
          <input type="radio" name="filters" onClick={() => this.filters('runScored')} id="runScored" />
          <label htmlFor="runScored" style={{ margin: "4px" }} >Run's Scored</label>
          &nbsp; &nbsp;
          <input type="radio" name="filters" id="notOut" style={{ margin: "4px" }} onClick={() => this.filters('notOut')} />
          <label htmlFor="notOut" style={{ margin: "4px" }} >Not Out</label>
          &nbsp; &nbsp;
          <input type="radio" style={{ margin: "4px" }} id="average" name="filters" onClick={() => this.filters('average')} />
          <label htmlFor="average" style={{ margin: "4px" }}>Average</label>
          &nbsp; &nbsp;
          <input type="radio" style={{ margin: "4px" }} id="strikeRate" name="filters" onClick={() => this.filters('strikeRate')} />
          <label htmlFor="strikeRate" style={{ margin: "4px" }}>Strike rate</label>
          &nbsp; &nbsp;
          <input type="radio" style={{ margin: "4px" }} name="filters" id="foursHit" onClick={() => this.filters('foursHit')} />
          <label htmlFor="foursHit" style={{ margin: "4px" }}>Fours Hit</label>
          &nbsp; &nbsp;
          <input type="radio" style={{ margin: "4px" }} name="filters" id="sixesHit" onClick={() => this.filters('sixesHit')} />
          <label htmlFor="sixesHit" style={{ margin: "4px" }}>Sixes Hit</label>
          &nbsp; &nbsp;
          <input type="radio" name="filters" id="teamWin" onClick={() => this.filters('teamWin')} />
          <label htmlFor="teamWin" style={{ margin: "4px" }}>Team Win's</label>
          &nbsp; &nbsp;
          <input type="radio" name="filters" id="wickets" onClick={() => this.filters('wickets')} />
          <label htmlFor="wickets" style={{ margin: "4px" }}>Wickets</label>
          &nbsp; &nbsp;
          <input type="radio" name="filters" id="economy" onClick={() => this.filters('economy')} />
          <label htmlFor="economy" style={{ margin: "4px" }}>Economy</label>

        </div>

        <br />
        <br />
        <div style={{ padding: "0 20px" }}>
          <div style={{
            width: "100%",
            maxWidth: "1600px",

            background: "#fff",
            boxShadow: "0 4px 20px rgb(102 102 102 / 30%)",
            borderRadius: "8px",
            overflow: "auto",
          }}>

            <div style={{}}>
              <Table responsive style={{
                verticalAlign: "middle"
              }} striped>
                <thead>
                  <tr style={{
                    display: "revert",
                    background: "#1b3d89", color: "#fff",
                    border: "0px transparent"
                  }}>
                    <th title="Position" >POS</th>
                    <th>Name</th>
                    <th title="Number of Not Outs">NO</th>
                    <th title="Run Scored">Runs</th>
                    <th title="Batting Average">Avg</th>
                    <th title="Batting Strike Rate">SR</th>
                    <th title="Fours hit">4s</th>
                    <th title="Six hit">6s</th>
                    <th title="Team Win Counter">Team Win's</th>
                    <th title="Wicket Taken">Wkts</th>
                    <th title="Runs Conceded in Bowlings">Runs Conceded</th>
                    <th title="Economy">Econ</th>
                  </tr>
                </thead>
                {this.state.playersData.length > 0 ?
                  <tbody>

                    {this.state.playersData.map((item, key) => (<tr key={key}>
                      <td style={{ paddingLeft: "15px" }}>{key + 1}</td>
                      <td><div><img alt={item.userName} src={item.profilePhotoUrl} style={{ width: "40px", height: "40px", borderRadius: "50%" }} /></div><h2 style={{ fontSize: "16px", fontWeight: "700" }}>{item.name}</h2></td>
                      <td>{item.datewiseSummry.length - item.outCounter}</td>
                      <td>{item.totalRunScored}</td>
                      <td>{(item.average).toFixed(2)}</td>
                      <td>{(item.strikeRate).toFixed(2)}</td>
                      <td>{item.totalFours}</td>
                      <td>{item.totalSixes}</td>
                      <td>{item.teamWinCounter}</td>
                      <td>{item.totalWicket}</td>
                      <td>{item.totalRunsGone}</td>
                      {
                        item.totaloversBowled !== 0 ?
                          <td>{(item.totalRunsGone / item.totaloversBowled).toFixed(2)}</td> :
                          <td>0</td>
                      }
                    </tr>))}
                  </tbody>
                  :
                  <tbody>
                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                    <tr>
                      <td className="td-1"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                      <td className="td-5"><span></span></td>
                      <td className="td-2"><span></span></td>
                      <td className="td-3"><span></span></td>
                    </tr>

                  </tbody>

                }
              </Table>
            </div>
          </div>
        </div>
        <br/>
        <div>
        
       
        <div className="row">
        <div className="col-sm-11">
        <div style={{ padding: "0 20px", fontSize: "20px", fontWeight: "700", fontFamily: "OpenSans, Arial, Helvetica, sans-serif", color: "#263238", marginBottom: "15px" }}>
                Total Runs Scored : 
        </div>
        <div className="card" style={{height:"600px"}}>
        <ResponsiveContainer>
        <BarChart
          width={900}
          height={900}
          data={this.state.batting}
          margin={{
            top: 20,
            right: 10,
            left: 10,
            bottom: 100,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="userId" angle={-90} interval={0} textAnchor="end" fontSize={13} />
          <YAxis label={{ value: 'Total Runs', angle: -90, position: 'insideLeft' }}  />
          <Tooltip />
        {/*<Legend  angle={-90} value='custom label' position='insideLeft' style={{textAnchor: 'middle'}}/>*/}
          <Bar dataKey="totalRunScored" fill="#000" label={{ position: 'top' }} >
          {
            this.state.batting.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[Math.floor(Math.random() * 11)]} />
            ))
        }
          </Bar>
        </BarChart>
        </ResponsiveContainer>
        </div>
        </div>
        </div>
        <br/>
        <br/>

        <div className="row">
        <div className="col-sm-11">
        <div style={{ padding: "0 20px", fontSize: "20px", fontWeight: "800", fontFamily: "OpenSans, Arial, Helvetica, sans-serif", color: "#263238", marginBottom: "15px" }}>
                Total Wickets Taken : 
        </div>
        <div className="card" style={{height:"600px"}}>
        <ResponsiveContainer>
        <BarChart
          width={900}
          height={900}
          data={this.state.bowling}
          margin={{
            top: 20,
            right: 10,
            left: 10,
            bottom: 100,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="userId" angle={-90} interval={0} textAnchor="end" fontSize={13}/>
          <YAxis label={{ value: 'Total wickets', angle: -90, position: 'insideLeft' }}  />
          <Tooltip />
        {/*<Legend  angle={-90} value='custom label' position='insideLeft' style={{textAnchor: 'middle'}}/>*/}
          <Bar dataKey="totalWicket" fill="#000" label={{ position: 'top' }} >
          {
            this.state.bowling.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[Math.floor(Math.random() * 11)]} />
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
    );
  }
}
export default Analytics;
