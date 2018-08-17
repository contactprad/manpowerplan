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
      phone: '',
      profile: '',
      name: '',
      email: ''
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
    event.preventDefault();
    const target = event.target;

    let sendPayload = this.state.name;
    var options = {
      url: 'http://localhost:8081/manpowerplan/findoptimal',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
      body: sendPayload
    };
    request.post(options, (err, data) => {
        if(err){
          alert("OOps! something went wrong!");
        console.log(err);
      }
        else {
        console.log(data);
      alert("Thanks for Submitting the details! We will contact you shortly");
      }
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <label>
          Input You JSON Parameters(*)
          <textarea name="name" value={this.state.name}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Calculate Optimal Value" />
      </form>
    );
  }
}

export default LPView;
