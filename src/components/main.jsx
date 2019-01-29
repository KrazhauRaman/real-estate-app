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
  getFlats, toggleLoading, setCurrentPage, setFlatsQuantity, setLocation,
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
    this.GetFlatsList = this.GetFlatsList.bind(this);
    this.GetMoreFlats = this.GetMoreFlats.bind(this);
    this.ChangeLocation = this.ChangeLocation.bind(this);
    this.EnterKeyPressHandler = this.EnterKeyPressHandler.bind(this);
    this.PageSwitchHandler = this.PageSwitchHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    return {
      ...prevState,
      flatsList: nextProps.flatsList,
      maxPages: (nextProps.maxPages > 20) ? 20 : nextProps.maxPages,
      isLoading: nextProps.isLoading,
      isThereFlats: (nextProps.flatsList.length > 0),
      currentPage: nextProps.currentPage,
      flatsQuantity: nextProps.flatsQuantity,
      // flatsLocation: nextProps.location,
    };
  }

  GetFlatsList() {
    const { flatsQuantity, flatsLocation, currentPage } = this.state;
    const { getFlatsAction, toggleLoadingAction } = this.props;
    toggleLoadingAction();
    getFlatsAction(flatsQuantity, flatsLocation, currentPage, this.ScrollToTop);
  }

  ScrollToTop() {
    window.scrollTo(0, 0);
  }

  GetMoreFlats() {
    const { setFlatsQuantityAction } = this.props;
    setFlatsQuantityAction(50);

    this.setState({
      flatsQuantity: 50,
    }, function () {
      this.GetFlatsList();
    });
    // const { setFlatsQuantityAction } = this.props;
    // setFlatsQuantityAction(50);
    // this.GetFlatsList();
  }

  PageSwitchHandler(newPage) {
    const { setCurrentPageAction, setFlatsQuantityAction } = this.props;
    setCurrentPageAction(newPage);
    setFlatsQuantityAction(20);

    this.setState({
      currentPage: newPage,
      flatsQuantity: 20,
    }, function () {
      this.GetFlatsList();
    });

    // const { setCurrentPageAction, setFlatsQuantityAction } = this.props;
    // setCurrentPageAction(newPage);
    // setFlatsQuantityAction(20);
    // this.GetFlatsList();
  }

  ChangeLocation(e) {
    this.setState({
      flatsLocation: e.currentTarget.value,
    });
  }

  EnterKeyPressHandler(e) {
    const { setLocationAction } = this.props;
    const { flatsLocation } = this.state;
    if (e.key === 'Enter') {
      setLocationAction(flatsLocation);
      this.GetFlatsList();
    }
  }

  GenerateListOfAvailableFlats() {
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
    // console.log(this.state);
    return (
      <div className="App">
        <Search
          placeholder="Find city..."
          onChange={this.ChangeLocation}
          value={flatsLocation}
          onKeyPress={this.EnterKeyPressHandler}
        />
        <Button
          title=""
          icon="---search"
          onClick={this.GetFlatsList}
        />
        <Link to="/bookmarks">
          <Button title="Bookmarks" />
        </Link>
        <div className="list-of-flats">
          {this.GenerateListOfAvailableFlats()}
        </div>
        {(isLoading) && (
        <div>LOADING</div>)}
        {(flatsQuantity === 20)
          ? ((!isLoading && isThereFlats) && (
            <Button
              title="Load more"
              onClick={this.GetMoreFlats}
            />))
          : ((!isLoading) && (
            <Pagination
              maxPages={maxPages}
              currentPage={currentPage}
              newPageIndexCallback={response => this.PageSwitchHandler(response)}
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
  getFlatsAction: (quantity, city, page, callback) => dispatch(getFlats(quantity, city, page, callback)),
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
