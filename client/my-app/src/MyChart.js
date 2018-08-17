import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend,
  AreaSplineSeries, SplineSeries, Navigator, RangeSelector, Tooltip, LineSeries
} from 'react-jsx-highstock';
import { createRandomData,addDataPoint } from './data-helpers';
import socketIOClient from "socket.io-client";

class MyChart extends Component {

  render () {
    return null;
  };
}

export default withHighcharts(MyChart, Highcharts);
