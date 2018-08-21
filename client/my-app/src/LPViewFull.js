import React, {
    Component
  } from 'react';
  import ReactDOM from 'react-dom';
  import request from 'superagent/superagent';
import { Container } from 'react-grid-system';
  const formStyle = {
    align: "top"
  };


    class LPViewFull extends Component {
      constructor(props) {
        super(props);
        this.state = {
          q1constraint: '1000',
          q2constraint: '1000',
          q3constraint: '1000',
          q4constraint:'1000',
          q1temptotal:'0.2',
          q2temptotal:'0.2',
          q3temptotal:'0.2',
          q4temptotal:'0.2',
          salconse:'24000',
          salconsse:'43200',
          salregse: '80000',
          salregsse:'144000',
          delta1cons:'100',
          delta2cons: '100',
          delta3cons: '100',
          x1:'',
          x2:'',
          a1:'',
          a2:'',
          a3:'',
          a4:'',
          b1:'',
          b2:'',
          b3:'',
          b4:'',
          delta1:'',
          delta2:'',
          delta3:'',
          optimal:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    handleChange(event) {
      const target = event.target;
      this.setState({
        [target.name]: target.value,
      });
    }

    handleSubmit(event) {
      var that = this;
      event.preventDefault();
      const target = event.target;

      let sendPayload = {}
      sendPayload.q1constraint = this.state.q1constraint;
      sendPayload.q2constraint = this.state.q1constraint;
      sendPayload.q3constraint = this.state.q1constraint;
      sendPayload.q4constraint = this.state.q1constraint;
      sendPayload.q1temptotal = this.state.q1temptotal;
      sendPayload.q2temptotal = this.state.q2temptotal;
      sendPayload.q3temptotal = this.state.q3temptotal;
      sendPayload.q4temptotal = this.state.q4temptotal;
      sendPayload.salconse = this.state.salconse;
      sendPayload.salconsse = this.state.salconsse;
      sendPayload.salregse = this.state.salregse;
      sendPayload.salregsse = this.state.salregsse;
      sendPayload.delta1cons = this.state.delta1cons;
      sendPayload.delta2cons = this.state.delta2cons;
      sendPayload.delta3cons = this.state.delta3cons;

      console.log(sendPayload)
        var request = require("request");

        var options = {
          method: 'POST',
          url: 'http://127.0.0.1:8081/manpowerplan/findoptimal1',
          headers: {
            'Content-Type': 'application/json'
          },
          body: sendPayload,
          json: true
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
          that.setState({optimal: body.result});
          that.setState({x1: body.x1});
          that.setState({y1: body.y1});
          that.setState({a1: body.a1});
          that.setState({a2: body.a2});
          that.setState({a3: body.a3});
          that.setState({a4: body.a4});
          that.setState({b1: body.b1});
          that.setState({b2: body.b2});
          that.setState({b3: body.b3});
          that.setState({b4: body.b4});
          that.setState({delta1: body.d1});
          that.setState({delta2: body.d2});
          that.setState({delta3: body.d3});

        });

    }
    //
  render() {
      return (
        <div class="rowC">
        <div>
          <h1> Please Input Values: </h1>
        <form  onSubmit={this.handleSubmit}>
          <label> Q1 Target:
          <input  name = "q1constraint" value={this.state.q1constraint}  onChange={this.handleChange}/>
          </label>

          <label> Q2 Target:
          <input name = "q2constraint" value={this.state.q2constraint} onChange={this.handleChange}/>
          </label>
          <br/>

          <label>Q3 Target:
          <input name = "q3constraint" value={this.state.q3constraint} onChange={this.handleChange}/>
          </label>

          <br/>
          <label>Q4 Target:
          <input name = "q4constraint" value={this.state.q4constraint} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Contigent proportion(Q1):
          <input name = "q1temptotal" value={this.state.q1temptotal} onChange={this.handleChange}/>
            </label>
          <br/>
          <label>Contigent proportion(Q2) :
          <input name = "q2temptotal" value={this.state.q2temptotal} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Contigent proportion(Q3):
          <input name = "q3temptotal" value={this.state.q3temptotal} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Contigent proportion(Q4):
          <input name ="q4temptotal" value={this.state.q4temptotal} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Salary for Regular SSE (Annual):
          <input name = "salregsse" value={this.state.salregsse} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Salary for Regular SE (Annual):
          <input name = "salregse" value={this.state.salregse} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Salary for Contigent SSE (Quarterly) :
          <input name = "salconsse" value={this.state.salconsse} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Salary for Contigent SE (Quarterly):
          <input name ="salconse" value={this.state.salconse} onChange={this.handleChange}/>
          </label>
          <label>Delta Constraint (Q1):
          <input name ="delta1cons" value={this.state.delta1cons} onChange={this.handleChange}/>
          </label>
          <label>Delta Constraint (Q2):
          <input name ="delta2cons" value={this.state.delta2cons} onChange={this.handleChange}/>
          </label>
          <label>Delta Constraint (Q3):
          <input name ="delta3cons" value={this.state.delta3cons} onChange={this.handleChange}/>
          </label>
          <br/>
          <input type="submit" value="Click Here" style={{backgroundColor: 'lightgrey', "border-radius": '12px'
        , "box-shadow": "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);"
        }
        }
        />
        </form></div>
        <div>
          <h1> Optimal Values: </h1>
        <form onSubmit={this.handleSubmit}>
        <label>Optimal Cost
          <input name ="optimal" style={{backgroundColor: 'lightgrey'}} value={this.state.optimal} readOnly/>
          </label>
        <label>No. of Regular SE
          <input name ="x1" style={{backgroundColor: 'lightgrey'}} value={this.state.x1} readOnly/>
          </label>
          <label>No. of Regular SSE
            <input name = "y1" style={{backgroundColor: 'lightgrey'}} value={this.state.y1} readOnly/>
          </label>
          <label>No. of Contigent SE in Q1
          <input name = "a1" style={{backgroundColor: 'lightgrey'}} value={this.state.a1} readOnly/>
          </label>
          <label>No. of Contigent SE in Q2
          <input name = "a2" style={{backgroundColor: 'lightgrey'}} value={this.state.a2} readOnly/>
          </label>
          <label>No. of Contigent SE in Q3
          <input name = "a3" style={{backgroundColor: 'lightgrey'}} value={this.state.a3} readOnly/>
          </label>
          <label>No. of Contigent SE in Q4
          <input name = "a4" style={{backgroundColor: 'lightgrey'}} value={this.state.a4} readOnly />
          </label>
          <label>No. of Contigent SSE in Q1
          <input name = "b1" style={{backgroundColor: 'lightgrey'}} value={this.state.b1} readOnly/>
          </label>
          <label>No. of Contigent SSE in Q2
          <input name = "b2" style={{backgroundColor: 'lightgrey'}} value={this.state.b2} readOnly/>
          </label>
          <label>No. of Contigent SSE in Q3
          <input name = "b3" style={{backgroundColor: 'lightgrey'}} value={this.state.b3} readOnly/>
          </label>
          <label>No. of Contigent SSE in Q4
          <input name = "b4" style={{backgroundColor: 'lightgrey'}} value={this.state.b4} readOnly/>
          </label>
          <label>Delta1
          <input name = "delta1" style={{backgroundColor: 'lightgrey'}} value={this.state.delta1} readOnly/>
          </label>
          <label>Delta2
          <input name = "delta2" style={{backgroundColor: 'lightgrey'}} value={this.state.delta2} readOnly/>
          </label>
          <label>Delta3
          <input name = "delta3" style={{backgroundColor: 'lightgrey'}} value={this.state.delta3} readOnly/>
          </label>
        </form></div>
        </div>
    );
    }
  }
   export default LPViewFull;
