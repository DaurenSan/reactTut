import React, { Component } from 'react';
import './body.css';
import Header from './header/Header';
import EmployeeList from './employeeList/employeeList';
import MapContainer from './map';


class Body extends Component {
  render() {
    return (
        <div className="main">
            <div className="sub">
              <Header headerText="My fellas"/>
              <EmployeeList />
            </div>
            <div className="sub">
              <MapContainer />
            </div>
        </div>

    );
  }
}

export default Body;