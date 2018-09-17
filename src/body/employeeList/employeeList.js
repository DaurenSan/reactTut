import React, { Component } from 'react';
import './employeeList.css';
import EmployeeDetail from '../employeeDetail/employeeDetail';
import { Table } from 'reactstrap';

class EmployeeList extends Component {
  state = {employees:[]}
  componentWillMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then (response => response.json())
    .then (myJ => JSON.stringify(myJ))
    .then (jString => this.setState({employees: JSON.parse(jString)}))
  }

  renderEmployees(){
    return this.state.employees
      .map(employee => <EmployeeDetail key={employee.id} employee={employee}/>)
  }

  render() {
    console.log(this.state)
    return (
      <Table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {this.renderEmployees()}
        </tbody>
      </Table>
    );
  }
}

export default EmployeeList;