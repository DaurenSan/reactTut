import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './header/Header';
import EmployeeList from './employeeList/employeeList';
import TaskList from './taskList/taskList';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      dataFromEmployeeDetail: []
    }
}
  
  myCallback = (dataFromEmployeeDetail, employeeState) => {
    if(employeeState === false){
      this.setState({dataFromEmployeeDetail: this.state.dataFromEmployeeDetail.concat(dataFromEmployeeDetail)});
    }else{
        this.setState({dataFromEmployeeDetail: this.state.dataFromEmployeeDetail.filter(item => item !== dataFromEmployeeDetail)});
      }
    }

  render() {
    console.log(this.state.dataFromEmployeeDetail)
    return (
      <Container>
        <Row>
          <Col xs="6"><Header headerText="Employees"/></Col>
          <Col xs="6"><Header headerText="Tasks"/></Col>
        </Row>
        <Row>
          <Col xs="6"><EmployeeList callback={this.myCallback} /></Col>
          <Col xs="6"><TaskList dataFromEmployeeDetail={this.state.dataFromEmployeeDetail} /></Col>
        </Row>
      </Container>
    );
  }
}

export default Body;