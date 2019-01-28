/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '../ui/button';
import { Search } from '../ui/search';
import { ListItem } from '../ui/list-item';
import { getListOfFlats } from '../server-requests/get-data';
import { getFlats } from '../redux/main-actions';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      flatsQuantity: 20,
      flatsLocation: '',
    };
    this.GetSomething = this.GetSomething.bind(this);
    this.GetMoreFlats = this.GetMoreFlats.bind(this);
    this.ChangeLocation = this.ChangeLocation.bind(this);
    this.HadleEnterKeyPress = this.HadleEnterKeyPress.bind(this);
  }

  GetSomething() {
    const { flatsQuantity, flatsLocation } = this.state;
    const { getFlatsAction } = this.props;
    //    getListOfFlats(flatsQuantity, flatsLocation);
    getFlatsAction(flatsQuantity, flatsLocation);
  }

  GetMoreFlats() {
    this.setState({
      flatsQuantity: 50,
    });
  }

  ChangeLocation(e) {
    this.setState({
      flatsLocation: e.currentTarget.value,
    });
  }

  HadleEnterKeyPress(e) {
    if (e.key === 'Enter') {
      this.GetSomething();
    }
  }

  render() {
    const { isLoading, flatsLocation } = this.state;
    return (
      (!isLoading)
      && (
      <div className="App">
        <Search
          placeholder="Find city..."
          onChange={this.ChangeLocation}
          value={flatsLocation}
          onKeyPress={this.HadleEnterKeyPress}
        />
        <Button title="" icon="---search" onClick={this.GetSomething} />
        <Link to="/bookmarks">
          <Button title="Bookmarks" />
        </Link>
        <ListItem title="FLAT" />
        <ListItem title="FLAT" />
        <ListItem title="FLAT" />
        <ListItem title="FLAT" />
        <ListItem title="FLAT" />
        <Button title="Load more" onClick={this.GetMoreFlats} />
      </div>
      )
    );
  }
}


const getDataFromStore = store => ({
//   viewport: store.viewport,
});


const setDataToStore = dispatch => ({
//   changeViewport: changedViewport => dispatch(changeViewport(changedViewport)),
//   fetchWeatherData: () => dispatch(fetchWeatherData()),
  getFlatsAction: (quantity, city, page) => dispatch(getFlats(quantity, city, page)),
});

export default connect(getDataFromStore, setDataToStore)(Main);


Main.propTypes = {
  getFlatsAction: PropTypes.func,
};

Main.defaultProps = {
  getFlatsAction: null,
};
