import React, { Component } from 'react';
import Header from './header/Header';
import EmployeeList from './employeeList/employeeList';

class Body extends Component {
  render() {
    return (
        <div>
            <Header headerText="My fellas"/>
            <EmployeeList />
        </div>
    );
  }
}

export default Body;