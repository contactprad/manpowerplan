import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent/superagent';
const formStyle = {
  align: "top"
};
class LPView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      optimal: '',
      brit: '',
      yank:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    var that = this;
    event.preventDefault();
    const target = event.target;

    let sendPayload = {}
    sendPayload.item = target.name.value;
    console.log(sendPayload);
      var request = require("request");

      var options = {
        method: 'POST',
        url: 'http://127.0.0.1:8081/manpowerplan/findoptimal',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendPayload),
        JSON:true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log("result is", body);
        let resp = JSON.parse(body)
        that.setState({optimal: resp.result});
        that.setState({brit: resp.x1});
        that.setState({yank: resp.y1});
      });

  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Input You JSON Parameters(*)
          <textarea name="name" value={this.state.name}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Calculate Optimal Value" />
        <br />
        <label> Optimal Cost is: {this.state.optimal}</label>
        <br/>
        <label> Number of Regular Software Engineers Required are: {this.state.brit}</label>
        <br/>
        <label> Number of Regular Senior Software Engineers Required are: {this.state.yank}</label>
      </form>
      <div>
      </div>
      </div>
    );
  }
}

export default LPView;

