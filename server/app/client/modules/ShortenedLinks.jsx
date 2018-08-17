import React from 'react';
import PropTypes from 'prop-types';

const ShortenedLinks = ({ children }) => (
  <div className="links">
    { children }
  </div>
);

ShortenedLinks.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    baseUrl: PropTypes.string,
    code: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    visits: PropTypes.number,
  })).isRequired
};

export default ShortenedLinks;
