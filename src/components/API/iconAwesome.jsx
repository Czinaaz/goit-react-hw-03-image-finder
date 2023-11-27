import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class IconSearch extends Component {
  render() {
    return (
      <div>
        <p>Finder <FontAwesomeIcon icon={faSearch} /></p>
      </div>
    );
  }
}

export {IconSearch};
