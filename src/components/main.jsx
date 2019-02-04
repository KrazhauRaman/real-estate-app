/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '../ui/button';
import { Search } from '../ui/search';
import { ListItem } from '../ui/list-item';
import { Loading } from '../ui/loading';
import { Pagination } from '../ui/pagination';
import {
  getFlats,
  toggleLoading,
  setCurrentPage,
  setFlatsQuantity,
  setLocation,
  setBackAddress,
} from '../redux/main-actions';
import styles from '../css/main.css';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      flatsQuantity: 20,
      flatsLocation: '',
      flatsList: [],
      currentPage: 1,
      maxPages: 0,
      isThereFlats: false,
      isNoResult: false,
    };
    this.getFlatsList = this.getFlatsList.bind(this);
    this.getMoreFlats = this.getMoreFlats.bind(this);
    this.changeLocationHandler = this.changeLocationHandler.bind(this);
    this.enterKeyPressHandler = this.enterKeyPressHandler.bind(this);
    this.pageSwitchHandler = this.pageSwitchHandler.bind(this);
    this.locationSelectHandler = this.locationSelectHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      flatsList: nextProps.flatsList,
      maxPages: (nextProps.maxPages > 20) ? 20 : nextProps.maxPages,
      isLoading: nextProps.isLoading,
      isThereFlats: (nextProps.flatsList.length > 0),
      currentPage: nextProps.currentPage,
      flatsQuantity: nextProps.flatsQuantity,
      isNoResult: nextProps.isNoResult,
    };
  }

  componentDidMount() {
    const { isThereFlats } = this.state;
    const { setBackAddressAction } = this.props;

    if (isThereFlats) {
      this.scrollToFlats();
    }

    setBackAddressAction('/');
  }

  // getting flats list in selected city, data for request comes from store
  // if there is switching to a new page in pagination, page will scroll to start of flats list
  getFlatsList() {
    const { getFlatsAction, toggleLoadingAction } = this.props;
    toggleLoadingAction();
    getFlatsAction(this.scrollToFlats);
  }


  getMoreFlats() {
    const { setFlatsQuantityAction } = this.props;
    setFlatsQuantityAction(50);

    this.setState({
      flatsQuantity: 50,
    }, () => {
      this.getFlatsList();
    });
  }

  scrollToFlats() {
    window.scrollTo(0, window.innerHeight);
  }

  // users actions handling
  pageSwitchHandler(newPage) {
    const { setCurrentPageAction, setFlatsQuantityAction } = this.props;
    setCurrentPageAction(newPage);
    setFlatsQuantityAction(20);

    this.setState({
      currentPage: newPage,
      flatsQuantity: 20,
    }, () => {
      this.getFlatsList();
    });
  }

  changeLocationHandler(e) {
    this.setState({
      flatsLocation: e.currentTarget.value,
    });
  }

  enterKeyPressHandler(e) {
    if (e.key === 'Enter') {
      this.locationSelectHandler();
    }
  }

  locationSelectHandler() {
    const { setLocationAction } = this.props;
    const { flatsLocation } = this.state;
    setLocationAction(flatsLocation);
    this.pageSwitchHandler(1);
  }

  // creating flats lisn on the basis of received data
  generateListOfAvailableFlats() {
    const { flatsList } = this.state;
    const listOfAvailableFlats = [];

    flatsList.forEach((flat, index) => {
      const {
        title,
        summary,
        thumb_url,
        id,
        price_formatted,
      } = flat;

      listOfAvailableFlats.push(
        <ListItem
          title={title}
          summary={summary}
          thumbUrl={thumb_url}
          key={String(index)}
          id={id}
          price={price_formatted}
        />,
      );
    });

    return listOfAvailableFlats;
  }


  render() {
    const {
      isLoading,
      flatsLocation,
      flatsQuantity,
      maxPages,
      currentPage,
      isThereFlats,
      isNoResult,
    } = this.state;
    return (
      <div className="App">
        {(isLoading) && (<Loading />)}
        <div className={styles.mainSearch}>
          <div className={styles.mainSearch__headerBlock}>
            <h1>Find appartments of your dream</h1>
          </div>
          <div className={styles.mainSearch__searchBlock}>
            <div className={styles.mainSearch__searchBlock_searchInputs}>
              <Search
                placeholder="Enter city..."
                onChange={this.changeLocationHandler}
                value={flatsLocation}
                onKeyPress={this.enterKeyPressHandler}
                styles={styles.mainSearch__searchBlock_searchInputs_input}
              />
              <Button
                title=""
                icon={<i className="large material-icons">search</i>}
                onClick={this.locationSelectHandler}
                styles={styles.mainSearch__searchBlock_searchInputs_button}
              />
            </div>
            {(isNoResult) && (
            <div className={styles.mainSearch__searchBlock_noResult}>
              <span className={styles.mainSearch__searchBlock_noResult_span}>No result</span>
            </div>
            )}
          </div>
          <div className={styles.mainSearch__bookmarksBlock}>
            <Link to="/bookmarks">
              <Button
                title="Bookmarks"
                styles={styles.mainSearch__bookmarksBlock_button}
              />
            </Link>
          </div>
        </div>
        <div className={styles.mainListOfFlats}>
          {this.generateListOfAvailableFlats()}
        </div>
        {(flatsQuantity === 20)
          ? ((!isLoading && isThereFlats) && (
            <div className={styles.mainSearch__loadMore}>
              <Button
                title="Load more"
                onClick={this.getMoreFlats}
                styles={styles.mainSearch__loadMore_button}
              />
            </div>))
          : ((!isLoading) && (
            <div className={styles.mainSearch__pagination}>
              <Pagination
                maxPages={maxPages}
                currentPage={currentPage}
                newPageIndexCallback={newPageIndex => this.pageSwitchHandler(newPageIndex)}
              />
            </div>))
            }
      </div>
    );
  }
}


const mapStateToProps = store => ({
  flatsList: store.main.flats,
  maxPages: store.main.maxPages,
  isLoading: store.main.isLoading,
  currentPage: store.main.currentPage,
  location: store.main.location,
  flatsQuantity: store.main.flatsQuantity,
  isNoResult: store.main.isNoResult,
});


const mapDispatchToProps = dispatch => ({
  getFlatsAction: callback => dispatch(getFlats(callback)),
  toggleLoadingAction: () => dispatch(toggleLoading()),
  setCurrentPageAction: page => dispatch(setCurrentPage(page)),
  setFlatsQuantityAction: quantity => dispatch(setFlatsQuantity(quantity)),
  setLocationAction: location => dispatch(setLocation(location)),
  setBackAddressAction: newAddress => dispatch(setBackAddress(newAddress)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);


Main.propTypes = {
  getFlatsAction: PropTypes.func,
  toggleLoadingAction: PropTypes.func,
  setCurrentPageAction: PropTypes.func,
  setFlatsQuantityAction: PropTypes.func,
  setLocationAction: PropTypes.func,
  // flatsList: PropTypes.arrayOf(PropTypes.object),
  // maxPages: PropTypes.number,
  // isLoading: PropTypes.bool,
  // currentPage: PropTypes.number,
  // location: PropTypes.string,
  // flatsQuantity: PropTypes.number,
  setBackAddressAction: PropTypes.func,
};

Main.defaultProps = {
  getFlatsAction: null,
  toggleLoadingAction: null,
  setCurrentPageAction: null,
  setFlatsQuantityAction: null,
  setLocationAction: null,
  // flatsList: [],
  // maxPages: 0,
  // isLoading: false,
  // currentPage: 1,
  // location: '',
  // flatsQuantity: 20,
  setBackAddressAction: null,
};
