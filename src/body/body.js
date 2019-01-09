import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './header/Header';
import EmployeeList from './employeeList/employeeList';
import TaskList from './taskList/taskList';

class Body extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="6"><Header headerText="Employees"/></Col>
          <Col xs="6"><Header headerText="Tasks"/></Col>
        </Row>
        <Row>
          <Col xs="6"><EmployeeList /></Col>
          <Col xs="6"><TaskList /></Col>
        </Row>
      </Container>
    );
  }
}

export default Body;