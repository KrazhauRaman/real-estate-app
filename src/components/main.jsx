/* eslint-disable func-names */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
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
    };
    this.getFlatsList = this.getFlatsList.bind(this);
    this.getMoreFlats = this.getMoreFlats.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
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
    };
  }


  // получение списка квартир в выбранном городе, данные для запроса берутся в сторе
  // если есть переключение на новую страницу, то после загрузки страница скроллится наверх
  getFlatsList() {
    const { getFlatsAction, toggleLoadingAction } = this.props;
    toggleLoadingAction();
    getFlatsAction(this.scrollToTop);
  }


  getMoreFlats() {
    const { setFlatsQuantityAction } = this.props;
    setFlatsQuantityAction(50);

    this.setState({
      flatsQuantity: 50,
    }, function () {
      this.getFlatsList();
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  // обработка действий пользователя
  pageSwitchHandler(newPage) {
    const { setCurrentPageAction, setFlatsQuantityAction } = this.props;
    setCurrentPageAction(newPage);
    setFlatsQuantityAction(20);

    this.setState({
      currentPage: newPage,
      flatsQuantity: 20,
    }, function () {
      this.getFlatsList();
    });
  }

  changeLocation(e) {
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

  // создание списка квартир на основе полученных данных
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
      isLoading, flatsLocation, flatsQuantity, maxPages, currentPage, isThereFlats,
    } = this.state;
    return (
      <div className="App">
        {(isLoading) && (<Loading />)}
        <div className={styles.mainSearch}>
          <div className={styles.mainSearch__headerBlock}>
            <h1>Find appartments of your dream</h1>
          </div>
          <div className={styles.mainSearch__searchBlock}>
            <Search
              placeholder="Enter city..."
              onChange={this.changeLocation}
              value={flatsLocation}
              onKeyPress={this.enterKeyPressHandler}
              // disabled={isLoading}
              styles={styles.mainSearch__searchBlock_input}
            />
            <Button
              title=""
              icon={<i className="large material-icons">search</i>}
              onClick={this.locationSelectHandler}
              // disabled={isLoading}
              styles={styles.mainSearch__searchBlock_button}
            />
          </div>
          <div className={styles.mainSearch__bookmarksBlock}>
            <Link to="/bookmarks">
              <Button title="Bookmarks" styles={styles.mainSearch__bookmarksBlock_button} />
            </Link>
          </div>
        </div>
        <div className={styles.mainListOfFlats}>
          {this.generateListOfAvailableFlats()}
        </div>
        {(flatsQuantity === 20)
          ? ((!isLoading && isThereFlats) && (
            <Button
              title="Load more"
              onClick={this.getMoreFlats}
            />))
          : ((!isLoading) && (
            <Pagination
              maxPages={maxPages}
              currentPage={currentPage}
              newPageIndexCallback={newPageIndex => this.pageSwitchHandler(newPageIndex)}
            />))
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
});


const mapDispatchToProps = dispatch => ({
  getFlatsAction: callback => dispatch(getFlats(callback)),
  toggleLoadingAction: () => dispatch(toggleLoading()),
  setCurrentPageAction: page => dispatch(setCurrentPage(page)),
  setFlatsQuantityAction: quantity => dispatch(setFlatsQuantity(quantity)),
  setLocationAction: location => dispatch(setLocation(location)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);


Main.propTypes = {
  getFlatsAction: PropTypes.func,
  toggleLoadingAction: PropTypes.func,
  setCurrentPageAction: PropTypes.func,
  setFlatsQuantityAction: PropTypes.func,
  setLocationAction: PropTypes.func,
  flatsList: PropTypes.arrayOf(PropTypes.object),
  maxPages: PropTypes.number,
  isLoading: PropTypes.bool,
  currentPage: PropTypes.number,
  location: PropTypes.string,
  flatsQuantity: PropTypes.number,
};

Main.defaultProps = {
  getFlatsAction: null,
  toggleLoadingAction: null,
  setCurrentPageAction: null,
  setFlatsQuantityAction: null,
  setLocationAction: null,
  flatsList: [],
  maxPages: 0,
  isLoading: false,
  currentPage: 1,
  location: '',
  flatsQuantity: 20,
};
