import React from 'react';
import PropTypes from 'prop-types';

const ShortenedLink = ({ baseUrl, code, title, url, visits }) => (
  <div className="link">
    <img src='/redirect_icon.png' />
    <div className='info'>
      <div className='visits'>
        <span className='count'>{ visits }</span>Visits
      </div>
      <div className='title'>
        { title }
      </div>
      <div className='original'>
        { url }
      </div>
      <a href={`${baseUrl}/${code}`}>{`${baseUrl}/${code}`}</a>
    </div>
  </div>
);

ShortenedLink.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  visits: PropTypes.number.isRequired,
}

export default ShortenedLink;
