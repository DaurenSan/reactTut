import React from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import Header from './header/Header';
import EmployeeList from './employeeList/employeeList';
import TaskList from './taskList/taskList';
import Responsib from './responsib/respon';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      dataFromEmployeeDetail: [],
      dataFromTaskDetail: []
    };
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.saveResponsibilities = this.saveResponsibilities.bind(this);
    this.responsibilityUrl = 'http://127.0.0.1:8000/salesmen/responsibilities';
    this.employeeUrl = 'http://127.0.0.1:8000/salesmen/employees';
    this.taskUrl = 'http://127.0.0.1:8000/salesmen/tasks';
}
  
  myEmployeeCallback = (dataFromEmployeeDetail, employeeState) => {
    if(employeeState === false){
      this.setState({dataFromEmployeeDetail: this.state.dataFromEmployeeDetail.concat(dataFromEmployeeDetail)});
    }else{
        this.setState({dataFromEmployeeDetail: this.state.dataFromEmployeeDetail.filter(item => item !== dataFromEmployeeDetail)});
      }
    }

  myTaskCallback = (dataFromTaskDetail, taskState) => {
    if(taskState === false){
      this.setState({dataFromTaskDetail: this.state.dataFromTaskDetail.concat(dataFromTaskDetail)});
    }else{
        this.setState({dataFromTaskDetail: this.state.dataFromTaskDetail.filter(item => item !== dataFromTaskDetail)});
      }
    }

    saveResponsibilities(){
      let arrayToSend=[this.state.dataFromEmployeeDetail, this.state.dataFromTaskDetail]
      fetch(this.responsibilityUrl, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(arrayToSend), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response =>console.log(response))
  
    }

    deleteEmployee(){
      let arrayToSend = this.state.dataFromEmployeeDetail;
      fetch(this.employeeUrl, {
        method: 'DELETE', // or 'PUT'
        body: JSON.stringify(arrayToSend), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response =>console.log(response))
    }

    
    deleteTask(){
      let arrayToSend = this.state.dataFromTaskDetail;
      fetch(this.taskUrl, {
        method: 'DELETE', // or 'PUT'
        body: JSON.stringify(arrayToSend), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response =>console.log(response))
    }

    

  render() {
    console.log(this.state.dataFromEmployeeDetail, this.state.dataFromTaskDetail)
    return (
      <Container>
        <Row> 
          <Col>
            <Button color="info" onClick={()=>this.saveResponsibilities()}>Присвоить задания сотрудникам</Button>
          </Col>
          <Col>
            <Button color="danger" onClick={()=>this.deleteEmployee()}>Удалить выделенных сотрудников</Button>
          </Col>
          <Col>
            <Button color="danger" onClick={()=>this.deleteTask()}>Удалить выделенные задания</Button>
          </Col>
        </Row>
        <Row>
          <Col xs="4"><Header headerText="Сотрудники"/></Col>
          <Col xs="4"><Header headerText="Задания"/></Col>
          <Col xs="4"><Header headerText="Ответственные"/></Col>
        </Row>
        <Row>
          <Col xs="4"><EmployeeList callback={this.myEmployeeCallback} /></Col>
          <Col xs="4"><TaskList callback={this.myTaskCallback} /></Col>
          <Col xs="4"><Responsib /></Col>
        </Row>
      </Container>
    );
  }
}

export default Body;