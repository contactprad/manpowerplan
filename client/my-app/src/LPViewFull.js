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
          q1constraint: '',
          q2constraint: '',
          q3constraint: '',
          q4constraint:'',
          q1temptotal:'',
          q2temptotal:'',
          q3tempttotal:'',
          q4temptotal:'',
          salconse:'',
          salconsse:'',
          salregse:'',
          salregsse:'',
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
      sendPayload.item = this.state.name;
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
          console.log(body.result);
          that.setState({optimal: body.result});
          that.setState({q1constraint: body.q1constraint});
          that.setState({q2constraint: body.q2constraint});
          that.setState({q2constraint: body.q3constraint});
          that.setState({q2constraint: body.q4constraint});
          that.setState({q1temptotal: body.q1temptotal});
          that.setState({q2temptotal: body.q2temptotal});
          that.setState({q3tempttotal: body.q3tempttotal});
          that.setState({q4temptotal: body.q4temptotal});
          that.setState({salconse: body.salconse});
          that.setState({salconsse: body.salconsse});
          that.setState({salregse: body.salregse});
          that.setState({salregsse: body.salregsse});
          that.setState({delta1: body.delta1});
          that.setState({delta2: body.delta2});
          that.setState({delta3: body.delta3});
          
        });
  
    }
    //
  render() {
      return (
        <div class="rowC">
        <div>
        <form onSubmit={this.handleSubmit}>
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
          <input name = "q3tempotal" value={this.state.q3temptotal} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Contigent proportion(Q4):
          <input name ="q4temptotal" value={this.state.q4temptotal} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Salary for Regular SSE:
          <input name = "salregsse" value={this.state.salregsse} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Salary for Regular SE:
          <input name = "salregse" value={this.state.salregse} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Salary for Contigent SSE :
          <input name = "salconsse" value={this.state.salconsse} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>Salary for Contigent SE:
          <input name ="salconse" value={this.state.salconse} onChange={this.handleChange}/>
          </label>
          <br/>
          <input type="submit" value="Optimal Value" />
        </form></div>
        <div>  
        <form onSubmit={this.handleSubmit}>
        <label>No. of Regular SE
          <input name ="x1" value={this.state.x1} onChange={this.handleChange}/>
          </label>
          <label>No. of Regular SSE
            <input name = "y1" value={this.state.x2} onChange={this.handleChange}/>
          </label>
          <label>No. of Contigent SE in Q1
          <input name = "a1" value={this.state.a1} onChange={this.handleChange}/>
          </label>
          <label>No. of Contigent SE in Q2
          <input name = "a2" value={this.state.a2} onChange={this.handleChange}/>
          </label>
          <label>No. of Contigent SE in Q3
          <input name = "a3" value={this.state.a3} onChange={this.handleChange}/>
          </label>
          <label>No. of Contigent SE in Q4
          <input name = "a4" value={this.state.a4} onChange={this.handleChange}/>
          </label>
          <label>No. of Contigent SSE in Q1
          <input name = "b1" value={this.state.b1} onChange={this.handleChange}/>
          </label>
          <label>No. of Contigent SSE in Q2
          <input name = "b2" value={this.state.b2} onChange={this.handleChange}/>
          </label>
          <label>No. of Contigent SSE in Q3
          <input name = "b3" value={this.state.b3} onChange={this.handleChange}/>
          </label>
          <label>No. of Contigent SSE in Q4
          <input name = "b4" value={this.state.b4} onChange={this.handleChange}/>
          </label>
          <label>Delta1
          <input name = "delta1" value={this.state.delta1} onChange={this.handleChange}/>
          </label>
          <label>Delta2
          <input name = "delta2" value={this.state.delta2} onChange={this.handleChange}/>
          </label>
          <label>Delta3
          <input name = "delta3" value={this.state.delta3} onChange={this.handleChange}/>
          </label>
        </form></div>
        </div>
    );
    }
  }
   export default LPViewFull;
  