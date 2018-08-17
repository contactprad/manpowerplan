import React, { Component } from 'react';
import request from 'superagent';

import ShortenedLinks from './ShortenedLinks';
import ShortenedLink from './ShortenedLink';

const checkStatus = (res) => {
  if (res.status === 200) {
    return res;
  } else if (res.status === 404) {
    const error = new Error('Please enter a valid URL');
    error.res = res;
    throw error;
  }
};

export default class Create extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: '',
      link: null,
      submitting: false,
      url: '',
    };
  }

  handleSubmit (e) {
    e.preventDefault();

    this.setState({
      submitting: true,
    }, () => {
      request
        .post('/links')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          url: this.refs.url.value
        })
        .then(checkStatus)
        .then(({ body }) => body)
        .then((link) => {
          this.setState({
            link,
            submitting: false,
            url: '',
          });
        })
        .catch(({ message }) => {
          this.setState({
            submitting: false,
            error: message,
          });
        });
      })
  }

  handleChange ({ target: { value }}) {
    this.setState({
      error: '',
      url: value,
    });
  }

  render () {
    const { error, link, submitting, url } = this.state;

    return (
      <div>
        <form>
          <input
            className='text'
            type='text'
            ref='url'
            onChange={this.handleChange.bind(this)}
            value={ url }
          />
          <input
            type='submit'
            onClick={this.handleSubmit.bind(this)}
            value='Shorten'
          />
        </form>
        { submitting && <img className='spinner' src='/spiffygif_46x46.gif' /> }
        <div
          className={`message${error ? ' error' : ''}`}
        >
          { error }
        </div>
        { link &&
          <ShortenedLinks>
            { [link].map((newLink) => <ShortenedLink key={newLink.code} {...newLink} />) }
          </ShortenedLinks>
        }
      </div>
    );
  }
}
