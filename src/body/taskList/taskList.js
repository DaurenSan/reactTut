import React from 'react';
import './taskList.css';
import TaskDetail from '../taskDetail/taskDetail';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Fade } from 'reactstrap';
import Datetime from 'react-datetime';
import 'moment';
import 'moment/locale/ru';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      modal: false,
      fadeIn: false,
      postResponse:'',
      taskText:'',
      deadline: new Date(),
      responsibilities: []
        };
    this.taskUrl = 'http://127.0.0.1:8000/salesmen/tasks';
    this.responsibilityUrl = 'http://127.0.0.1:8000/salesmen/responsibilities';
    this.toggle = this.toggle.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
    this.saveTask = this.saveTask.bind(this);
  }

 componentDidMount(){
    fetch(this.taskUrl)
    .then (response => response.json())
    .then (tasks => this.setState({tasks}))
  }

  toggle(e) {
    this.setState({
      modal: !this.state.modal,
      fadeIn: false
    });
    e.stopPropagation(); 
  }

  handleTaskChange(e) {
    this.setState({taskText: e.target.value});
  }
 
  handleDeadlineChange(date) {
    this.setState({deadline: date});
  }

  saveTask(e) {
    e.preventDefault();
    let task = {
      task_text: this.state.taskText,
      deadline: this.state.deadline
    }
    fetch(this.taskUrl, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(task), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => this.setState({fadeIn: true,
      postResponse: JSON.stringify(response)}))
    .catch(error => this.setState({fadeIn: true,
      postResponse: error}));
  }

  myCallback = (dataFromTaskDetail, taskState) => {
    this.setState({ responsibilities: this.state.responsibilities.concat(dataFromTaskDetail)});
    if(taskState === false){
      this.setState({ responsibilities: this.state.responsibilities.concat(dataFromTaskDetail)});
    }else{
      this.setState({ responsibilities: this.state.responsibilities.filter(item => item !==dataFromTaskDetail)});
      }
  }

  saveResponsibilities(){
    let responsibilitiesToSend = [];
    var n;
    var k;
   for (n = 0; n < this.props.dataFromEmployeeDetail.length; n++){
      let employeeId = this.props.dataFromEmployeeDetail[n];
      for(k=0; k<this.state.responsibilities.length; k++){
        var responsibilityToSend ={
          emoployee: employeeId,
          task: this.state.responsibilities[k]
        }
        responsibilitiesToSend = responsibilitiesToSend.concat(responsibilityToSend);
      }
    }   
    
    console.log(responsibilitiesToSend);
    fetch(this.responsibilityUrl, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(responsibilitiesToSend), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => this.setState({postResponse: JSON.stringify(response)}))
    .catch(error => this.setState({postResponse: error}));

  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>
                <Button color="primary" onClick={this.toggle} size="sm">Новое задание</Button>
              </th>
              <th>
                <Button color="info" size="sm" onClick={()=>this.saveResponsibilities()}>Присвоить задания</Button>
              </th>
            </tr>
            <tr>
              <th>Task</th>
              <th>Created</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map(task => <TaskDetail callback={this.myCallback} key={task.id} task={task}/>)}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Новое задание</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Задание</Label>
                <Input type="text" value={this.state.taskText} onChange={this.handleTaskChange} />
              </FormGroup>
              <FormGroup>
                <Label>Срок выполнения</Label>
                <Datetime  value={this.state.deadline} onChange={this.handleDeadlineChange} locale="ru"/>
              </FormGroup>
            </Form>
            <Fade in={this.state.fadeIn} tag="p" className="mt-3">
              {this.state.postResponse}
            </Fade>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveTask}>Сохранить</Button>
            <Button color="secondary" onClick={this.toggle}>Отмена</Button>
          </ModalFooter>
        </Modal>       
      </div>
    );
  }
}

export default TaskList;