/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router';
import { BackArrow } from '../ui/back-arrow';
import { Button } from '../ui/button';
import {
  saveBookmark,
  removeBookmark,
} from '../redux/bookmark-actions';

const tempStyle = {
  display: 'flex',
  flexDirection: 'column',
};

class FlatPage extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      id: match.params.id,
    };

    this.addBookmark = this.addBookmark.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      flatDescription: nextProps.currentFlat(prevState.id),
      isInBookmarks: nextProps.isInBookmarks(prevState.id),
    };
  }


  addBookmark() {
    const { saveBookmarkAction } = this.props;
    const { flatDescription } = this.state;

    saveBookmarkAction(flatDescription);
  }

  deleteBookmark() {
    const { removeBookmarkAction } = this.props;
    const { flatDescription } = this.state;

    removeBookmarkAction(flatDescription.id);
  }


  render() {
    const { flatDescription, isInBookmarks } = this.state;
    return (
      (flatDescription)
        ? (
          <div className="App">
            <Link to="/">
              {/* выставить линк относительноместе из которого пришел,
        при прямом входе по ссылке редиректить на мэйн */}
              <BackArrow title="back" />
            </Link>
            {(isInBookmarks)
              ? (
                <Button title="Remove from bookmarks" icon="---star" onClick={this.deleteBookmark} />
              )

              : (
                <Button title="Add to bookmarks" icon="---star" onClick={this.addBookmark} />
              )}
            <div style={tempStyle}>
              <span>{`Title: ${flatDescription.title}`}</span>
              <span>{`Summary: ${flatDescription.summary}`}</span>
              <span>{`Price: ${flatDescription.price_formatted}`}</span>
              <span>{`Updated: ${flatDescription.updated_in_days_formatted}`}</span>
              <img src={flatDescription.img_url} alt="" />
              <span>{`Bathroom number: ${(flatDescription.bathroom_number) ? flatDescription.bathroom_number : 0}`}</span>
              <span>{`Bedroom number: ${(flatDescription.bedroom_number) ? flatDescription.bedroom_number : 0}`}</span>
              <span>{`Car spaces: ${(flatDescription.car_spaces) ? flatDescription.car_spaces : 0}`}</span>
              <span>{`Comission: ${(flatDescription.commission) ? flatDescription.commission : 0}`}</span>
              <span>{`Construction year: ${(flatDescription.construction_year) ? flatDescription.construction_year : 'unknown'}`}</span>
              <a target="_blank" rel="noreferrer noopener" href={flatDescription.lister_url}>Go to seller</a>
            </div>
          </div>
        )
        : (
          <Redirect to="/" />
        )
    );
  }
}


const mapStateToProps = store => ({
  currentFlat: (id) => {
    let currentFlat = store.main.flats.find(flat => flat.id === +id);
    if (currentFlat) {
      return currentFlat;
    }
    currentFlat = store.bookmarks.bookmarks.find(flat => flat.id === +id);
    return currentFlat;
  },
  isInBookmarks: id => (!!(store.bookmarks.bookmarks.find(flat => flat.id === +id))),
  bookmarksList: store.bookmarks.bookmarks,
});


const mapDispatchToProps = dispatch => ({
  saveBookmarkAction: bookmark => dispatch(saveBookmark(bookmark)),
  removeBookmarkAction: id => dispatch(removeBookmark(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(FlatPage);


FlatPage.propTypes = {
  saveBookmarkAction: PropTypes.func,
  removeBookmarkAction: PropTypes.func,
  match: PropTypes.object.isRequired,
};

FlatPage.defaultProps = {
  saveBookmarkAction: null,
  removeBookmarkAction: null,
};
