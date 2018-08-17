import React, { Component } from 'C:/Users/kumarp/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend,
  Navigator, Tooltip, LineSeries
} from 'react-jsx-highstock';
import { createRandomData,addDataPoint } from './data-helpers';
import socketIOClient from "socket.io-client";

class Chart1 extends Component {

  constructor (props) {
    super(props);
	this.updateLiveData = this.updateLiveData.bind(this);
    this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this);
    this.handleStopLiveUpdate = this.handleStopLiveUpdate.bind(this);

	const now = Date.now();
    this.state = {
	  res:false,
      data1: createRandomData(now),
	  endpoint: "http://127.0.0.1:8081"
    };
  }

    componentDidMount () {
    this.handleStartLiveUpdate();
  }

    componentWillUnmount() {
    this.chart.destroy();
  }

  updateLiveData () {
    const { data1,res } = this.state;
     this.setState({
	 data1: addDataPoint(data1,res)
     });
  }

  handleStartLiveUpdate (e) {
    e && e.preventDefault();
	const { data1,res,endpoint } = this.state;
	const socket = socketIOClient(endpoint);
	socket.on("FromAPI", res => {let mylastStatus = res.active;this.setState({res:mylastStatus,liveUpdate:this.updateLiveData(mylastStatus)})})
  }

  handleStopLiveUpdate (e) {
    e.preventDefault();
    window.clearInterval(this.state.liveUpdate);
    this.setState({
      liveUpdate: false
    });
  }

  render() {

	const { data1 } = this.state;

    return (
      <div className="Chart1">
        <HighchartsStockChart>
          <Chart zoomType="x" />

          <Title>NeoLabs Smart Monitoring</Title>

          <Legend>
            <Legend.Title>Key</Legend.Title>
          </Legend>

          <Tooltip />

          <XAxis>
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="No_of_people">
            <YAxis.Title>Number of people</YAxis.Title>
            <LineSeries id="p1" name="People Active Status" data={data1} />
          </YAxis>

          <Navigator>
            <Navigator.Series seriesId="People Active Status" />
          </Navigator>
        </HighchartsStockChart>
      </div>


    );
  }
}

export default withHighcharts(Chart1, Highcharts);
