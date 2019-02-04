/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
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
import styles from '../css/flat-page.css';

class FlatPage extends PureComponent {
  constructor(props) {
    super(props);

    const { match } = this.props;
    this.state = {
      id: match.params.id,
    };

    this.addBookmark = this.addBookmark.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

  // searching for flat in store
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      flatDescription: nextProps.currentFlat(prevState.id),
      isInBookmarks: nextProps.isInBookmarks(prevState.id),
    };
  }

  // saving/removing bookmark
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
    const { backAddress } = this.props;
    return (
      (flatDescription)
        ? (
          <div className={styles.flatPage}>
            <div className={styles.flatPage__navigation}>
              <Link to={backAddress}>
                <BackArrow title="back" />
              </Link>
              {(isInBookmarks)
                ? (
                  <Button
                    title="Remove from bookmarks"
                    onClick={this.deleteBookmark}
                    styles={styles.flatPage__navigation_remove}
                  />
                )
                : (
                  <Button
                    title="Add to bookmarks"
                    onClick={this.addBookmark}
                    styles={styles.flatPage__navigation_add}
                  />
                )}
            </div>
            <div className={styles.flatPage__description}>
              <div className={styles.flatPage__description_text}>
                <span>{`Title: ${flatDescription.title}`}</span>
                <span>{`Summary: ${flatDescription.summary}`}</span>
                <span>{`Price: ${flatDescription.price_formatted}`}</span>
                <span>{`Updated: ${flatDescription.updated_in_days_formatted}`}</span>
              </div>
              <div className={styles.flatPage__description_additional}>
                <img className={styles.flatPage__description_additional_img} src={flatDescription.img_url} alt="" />
                <div className={styles.flatPage__description_additional_text}>
                  <span>{`Bathroom number: ${(flatDescription.bathroom_number) ? flatDescription.bathroom_number : 0}`}</span>
                  <span>{`Bedroom number: ${(flatDescription.bedroom_number) ? flatDescription.bedroom_number : 0}`}</span>
                  <span>{`Car spaces: ${(flatDescription.car_spaces) ? flatDescription.car_spaces : 0}`}</span>
                  <span>{`Comission: ${(flatDescription.commission) ? flatDescription.commission : 0}`}</span>
                  <span>{`Construction year: ${(flatDescription.construction_year) ? flatDescription.construction_year : 'unknown'}`}</span>
                </div>
              </div>
              <a className={styles.flatPage__goToSeller} target="_blank" rel="noreferrer noopener" href={flatDescription.lister_url}>
                <Button title="Go to seller" styles={styles.flatPage__goToSeller_button} />
              </a>
            </div>
          </div>
        )
        : (
          <Redirect to="/bookmarks" />
        )
    );
  }
}


const mapStateToProps = store => ({
  // searching for flat in main store, if nothing found then searching in bookmarks
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
  backAddress: store.main.backAddress,
});


const mapDispatchToProps = dispatch => ({
  saveBookmarkAction: bookmark => dispatch(saveBookmark(bookmark)),
  removeBookmarkAction: id => dispatch(removeBookmark(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(FlatPage);


FlatPage.propTypes = {
  saveBookmarkAction: PropTypes.func,
  removeBookmarkAction: PropTypes.func,
  match: PropTypes.shape({}).isRequired,
  backAddress: PropTypes.string,
};

FlatPage.defaultProps = {
  saveBookmarkAction: null,
  removeBookmarkAction: null,
  backAddress: '/',
};
