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
import { Pagination } from '../ui/pagination';
import {
  getFlats,
  toggleLoading,
  setCurrentPage,
  setFlatsQuantity,
  setLocation,
} from '../redux/main-actions';

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
    // this.getFlatsList();
    this.pageSwitchHandler(1);
  }

  // создание списка квартир на основе полученных данных
  generateListOfAvailableFlats() {
    const { flatsList } = this.state;
    const listOfAvailableFlats = [];

    flatsList.forEach((flat, index) => {
      const { title, summary, thumb_url } = flat;
      listOfAvailableFlats.push(
        <ListItem title={title} summary={summary} thumbUrl={thumb_url} key={String(index)} />,
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
        <Search
          placeholder="Find city..."
          onChange={this.changeLocation}
          value={flatsLocation}
          onKeyPress={this.enterKeyPressHandler}
        />
        <Button
          title=""
          icon="---search"
          onClick={this.locationSelectHandler}
        />
        <Link to="/bookmarks">
          <Button title="Bookmarks" />
        </Link>
        <div className="list-of-flats">
          {this.generateListOfAvailableFlats()}
        </div>
        {(isLoading) && (
        <div>LOADING</div>)}
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


const getDataFromStore = store => ({
  flatsList: store.main.flats,
  maxPages: store.main.maxPages,
  isLoading: store.main.isLoading,
  currentPage: store.main.currentPage,
  location: store.main.location,
  flatsQuantity: store.main.flatsQuantity,
});


const setDataToStore = dispatch => ({
  getFlatsAction: callback => dispatch(getFlats(callback)),
  toggleLoadingAction: () => dispatch(toggleLoading()),
  setCurrentPageAction: page => dispatch(setCurrentPage(page)),
  setFlatsQuantityAction: quantity => dispatch(setFlatsQuantity(quantity)),
  setLocationAction: location => dispatch(setLocation(location)),
});


export default connect(getDataFromStore, setDataToStore)(Main);


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
