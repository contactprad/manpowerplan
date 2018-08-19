import React, {
  Component
} from 'react';
import logo from './img/logoman1.png'
import './App.css';
import { Container, Row, Col } from 'react-grid-system';
import LPView from './LPView';
import LPViewFull from './LPViewFull';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currVideo: {},
      videos: []
    };
  }

  componentDidMount() {
  }

  render() {
    return (
        <Container>
          <Row>
          <img src={logo} alt="logo" height="30%" width="60%" />
        </Row>
        <br /><br />
          <Row>
            <Col>
            <LPViewFull />
            </Col>
            
          </Row>
        </Container>
    )
  }
}

export default App;
