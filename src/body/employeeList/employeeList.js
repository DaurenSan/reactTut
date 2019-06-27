import React from 'react';
import './employeeList.css';
import EmployeeDetail from '../employeeDetail/employeeDetail';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Fade } from 'reactstrap';

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      modal: false,
      fadeIn: false,
      postResponse:'',
      name:'',
      phone:''
    };
    this.url = 'http://127.0.0.1:8000/salesmen/employees';
    this.toggle = this.toggle.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
  }

  componentDidMount(){
    fetch(this.url)
    .then (response => response.json())
    .then (employees => this.setState({employees}))
  }

  toggle(e) {
    this.setState({
      modal: !this.state.modal,
      fadeIn: false
    });
    e.stopPropagation(); 
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
 
  handlePhoneChange(e) {
    this.setState({phone: e.target.value});
  }

  saveEmployee(e) {
    e.preventDefault();
    var employee = {
      name: this.state.name,
      phone:this.state.phone
    }
    fetch(this.url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(employee), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => this.setState({fadeIn: true,
      postResponse: JSON.stringify(response)}))
    .catch(error => this.setState({fadeIn: true,
      postResponse: error})).then( this.componentDidMount());
   
  }

  myCallback = (dataFromEmployeeDetail, employeeState) => {
    this.props.callback(dataFromEmployeeDetail, employeeState);
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>
                <Button color="primary" onClick={this.toggle} size="sm">Новый сотрудник</Button>
              </th>
            </tr>
            <tr>
              <th>Имя</th>
              <th>Номер телефона</th>
            </tr>
          </thead>
          <tbody>
              {this.state.employees.map(employee => <EmployeeDetail callback={this.myCallback} key={employee.id} employee={employee}/>)}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Новый сотрудник</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Имя</Label>
                <Input type="text" value={this.state.name} onChange={this.handleNameChange} />
              </FormGroup>
              <FormGroup>
                <Label>Телефон</Label>
                <Input type="text" value={this.state.phone} onChange={this.handlePhoneChange} />
              </FormGroup>
            </Form>
            <Fade in={this.state.fadeIn} tag="p" className="mt-3">
              {this.state.postResponse}
            </Fade>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveEmployee}>Сохранить</Button>
            <Button color="secondary" onClick={this.toggle}>Отмена</Button>
          </ModalFooter>
        </Modal>       
      </div>
    );
  }
}

export default EmployeeList;