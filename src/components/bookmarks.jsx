import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BackArrow } from '../ui/back-arrow';
import { ListItem } from '../ui/list-item';

class Bookmarks extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/">
          <BackArrow title="back" />
        </Link>
        <ListItem title="FLAT" />
        <ListItem title="FLAT" />
        <ListItem title="FLAT" />
        <ListItem title="FLAT" />
      </div>
    );
  }
}

export default Bookmarks;
