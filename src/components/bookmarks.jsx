import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { BackArrow } from '../ui/back-arrow';
import { ListItem } from '../ui/list-item';

class Bookmarks extends Component {
  // создание списка квартир на основе полученных данных
  generateListOfBookmarks() {
    const { bookmarksList } = this.props;
    const listOfAvailableFlats = [];

    bookmarksList.forEach((flat, index) => {
      const {
        title, summary, thumb_url, id,
      } = flat;
      listOfAvailableFlats.push(
        <ListItem title={title} summary={summary} thumbUrl={thumb_url} key={String(index)} id={id} />,
      );
    });

    return listOfAvailableFlats;
  }

  render() {
    return (
      <div className="App">
        <Link to="/">
          <BackArrow title="back" />
        </Link>
        {this.generateListOfBookmarks()}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  bookmarksList: store.bookmarks.bookmarks,
});

export default connect(mapStateToProps)(Bookmarks);


Bookmarks.propTypes = {
  bookmarksList: PropTypes.arrayOf(PropTypes.object),
};

Bookmarks.defaultProps = {
  bookmarksList: [],
};
