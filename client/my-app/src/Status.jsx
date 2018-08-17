import React, {
  Component
} from "C:/Users/kumarp/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import socketIOClient from "socket.io-client";

class Status extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:8081",
      currentColor: "secondary",
      active:"NA",
      counter:0,
      inCount:0,
      lastStatus:false,
      statusArray:[],
      activeInLastDay:0
    };
  }

  componentDidMount() {
    const {
      endpoint
    } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      let mylastStatus = data.active;
      console.log("mylastsatus", mylastStatus);
      this.setState({response: true});
      this.setState({counter: data.since});
      this.setState({inCount:data.in});
    if (mylastStatus == 1)  {
    this.setState({ currentColor:"success"});
    this.setState({active:"ACTIVE"});
  }
    else  {
      this.setState({currentColor:"danger"});
      this.setState({active:"IN-ACTIVE"});
    }
    });
  }

  render() {
    const {
      response
    } = this.state;
    return (<div> {
        response ?
          <h4>
            Current Patient Status:
          <Button color={this.state.currentColor} disabled size="lg" block> {this.state.active}</Button>
          </h4> : <h4> Loading Patient Status... </h4>}
      <h4>Patient {this.state.active} Since:<Button color={this.state.currentColor} disabled size="lg" block> {(this.state.counter/60).toFixed(2)} min(s)</Button></h4>
      <h4>Number of Persons In Room:<Button disabled size="lg" block> {this.state.inCount}</Button></h4>
      {/* <h4>Patient Active in Last 24 Hrs: {(this.state.activeInLastDay / 60).toFixed(2)} min(s)</h4> */}
          </div>
    );
  }
}

export default Status;
