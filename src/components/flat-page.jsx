import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BackArrow } from '../ui/back-arrow';
import { Button } from '../ui/button';


class FlatPage extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Link to="/">
          {/* выставить линк относительноместе из которого пришел,
        при прямом входе по ссылке редиректить на мэйн */}
          <BackArrow title="back" />
        </Link>
        <Button title="Add to bookmarks" icon="---star" />
        Some info about flat
        Some info about flat
        Some info about flat
        Some info about flat
        Some info about flat
        Some info about flat
        Some info about flat
      </div>
    );
  }
}

export default FlatPage;
