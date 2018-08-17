import React, {
  Component
} from 'react';
import logo from './img/logoman.png'
import './App.css';
import { Container, Row, Col } from 'react-grid-system';
import LPView from './LPView';
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
          <img src={logo} alt="logo" height="30%" width="30%" />
        </Row>
        <br /><br />
          <Row>
            <Col>
            <LPView />
            </Col>
          </Row>
        </Container>
    )
  }
}

export default App;
