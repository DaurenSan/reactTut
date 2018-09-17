import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.headerText}</h1>
        </header>
      </div>
    );
  }
}

export default Header;
