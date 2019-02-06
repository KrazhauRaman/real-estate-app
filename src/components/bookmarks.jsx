/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import BackArrow from '../ui/back-arrow';
import ListItem from '../ui/list-item';
import { setBackAddress } from '../redux/main-actions';
import styles from '../css/bookmarks.css';

class Bookmarks extends PureComponent {
  // saving current address for "back" button on flat pages
  componentDidMount() {
    const { setBackAddressAction, location } = this.props;

    if (location.state) {
      const item = document.querySelector(
        `.restore-${location.state}`,
      );
      if (item) {
        item.scrollIntoView();
      }
    }

    setBackAddressAction('/bookmarks');
  }

  // creating list of flats from saved bookmarks
  generateListOfBookmarks() {
    const { bookmarksList } = this.props;
    const listOfAvailableFlats = [];

    bookmarksList.forEach((flat) => {
      const {
        title,
        summary,
        img_url,
        id,
        price_formatted,
      } = flat;
      listOfAvailableFlats.push(
        <ListItem
          title={title}
          summary={summary}
          thumbUrl={img_url}
          key={id}
          id={id}
          price={price_formatted}
        />,
      );
    });

    return listOfAvailableFlats;
  }

  render() {
    return (
      <div className={styles.bookmarks}>
        <div className={styles.bookmarks__header}>
          <Link to="/">
            <BackArrow title="back" />
          </Link>
        </div>
        <div className={styles.bookmarks__flatList}>
          {this.generateListOfBookmarks()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  bookmarksList: store.bookmarks.bookmarks,
});

const mapDispatchToProps = dispatch => ({
  setBackAddressAction: newAddress => dispatch(setBackAddress(newAddress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);


Bookmarks.propTypes = {
  bookmarksList: PropTypes.arrayOf(PropTypes.object),
  setBackAddressAction: PropTypes.func,
  location: PropTypes.shape({}).isRequired,
};

Bookmarks.defaultProps = {
  bookmarksList: [],
  setBackAddressAction: null,
};
