import React, { Component } from 'react';
import { Link } from 'react-router';

import ShortenedLinks from './ShortenedLinks';
import ShortenedLink from './ShortenedLink';

import getLinks from '../utils/getLinks';

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      links: []
    };
  }

  componentDidMount () {
    getLinks.call(this);
  }

  updateLinks (links) {
    this.setState({ links });
  }

  render () {
    const { children, location: { pathname } } = this.props;
    const { links } = this.state;

    return (
      <div>
        <div className="navigation">
          <ul>
            <li><Link to="/" className="index">All Links</Link></li>
            <li><Link to="/create" className="create">Shorten</Link></li>
          </ul>
          <a href="/logout" className="logout">Logout</a>
        </div>

        { children }

        {
          pathname === '/' && links &&
            <ShortenedLinks>
              {
                links.map((link) => {
                  return (<ShortenedLink {...link} key={link.code} />);
                })
              }
            </ShortenedLinks>
        }

      </div>
    );
  }
}
