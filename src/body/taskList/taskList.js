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
      taskIdForUpdate: null,
      modalForUpdate: false,
      fadeInForUpdate: false,
      putResponse:'',
      taskTextUpdate:'',
      deadlineUpdate: new Date(),
      modalForCreate: false,
      fadeInForCreate: false,
      postResponse:'',
      taskText:'',
      deadline: new Date()
        };
    this.taskUrl = 'http://127.0.0.1:8000/salesmen/tasks';
    this.toggleToCreate = this.toggleToCreate.bind(this);
    this.toggleToUpdate = this.toggleToUpdate.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
    this.handleTaskUpdateChange = this.handleTaskUpdateChange.bind(this);
    this.handleDeadlineUpdateChange = this.handleDeadlineUpdateChange.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

 componentDidMount(){
    fetch(this.taskUrl)
    .then (response => response.json())
    .then (tasks => this.setState({tasks}))
  }

  toggleToCreate(e) {
    this.setState({
      modalForCreate: !this.state.modalForCreate,
      fadeInForCreate: false
    });
    e.stopPropagation(); 
  }

  toggleToUpdate(e) {
    let taskToUpdate = this.state.tasks.find(task => task.id === this.state.taskIdForUpdate)
    this.setState({
      modalForUpdate: !this.state.modalForUpdate,
      fadeInForUpdate: false,
      taskTextUpdate: taskToUpdate.task_text,
      deadlineUpdate: taskToUpdate.deadline
    });
    e.stopPropagation(); 
  }

  handleTaskChange(e) {
    this.setState({taskText: e.target.value});
  }

  handleTaskUpdateChange(e) {
    this.setState({taskTextUpdate: e.target.value});
  }
 
  handleDeadlineChange(date) {
    this.setState({deadline: date});
  }

  handleDeadlineUpdateChange(date) {
    this.setState({deadlineUpdate: date});
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
    .then(response => this.setState({fadeInForCreate: true,
      postResponse: JSON.stringify(response)}))
    .catch(error => this.setState({fadeInForCreate: true,
      postResponse: error})).then(this.componentDidMount());
  }

  myCallback = (dataFromTaskDetail, taskState) => {
    if (taskState === false){
      this.setState({taskIdForUpdate: dataFromTaskDetail})
    }else{
      this.setState({taskIdForUpdate: null})
  }
    ;
    this.props.callback(dataFromTaskDetail, taskState);
  }

 updateTask(e) {
  e.preventDefault();
  let task = {
    taskId: this.state.taskIdForUpdate, 
    task_text: this.state.taskTextUpdate,
    deadline: this.state.deadlineUpdate
  }
  fetch(this.taskUrl, {
    method: 'PUT', 
    body: JSON.stringify(task), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => this.setState({fadeInForUpdate: true,
    putResponse: JSON.stringify(response)}))
  .catch(error => this.setState({fadeInForUpdate: true,
    putResponse: error})).then(this.componentDidMount());
}

  render() {
    console.log(this.state)
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>
                <Button color="primary" onClick={this.toggleToCreate} size="sm">Новое задание</Button>
              </th>
              <th>
                <Button color="info" onClick={this.toggleToUpdate} size="sm">Изменить задание</Button>
              </th>
            </tr>
            <tr>
              <th>Задание</th>
              <th>Создано</th>
              <th>Срок</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map(task => <TaskDetail callback={this.myCallback} key={task.id} task={task}/>)}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modalForCreate} toggle={this.toggleToCreate}>
          <ModalHeader toggle={this.toggleToCreate}>Новое задание</ModalHeader>
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
            <Fade in={this.state.fadeInForCreate} tag="p" className="mt-3">
              {this.state.postResponse}
            </Fade>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveTask}>Сохранить</Button>
            <Button color="secondary" onClick={this.toggleToCreate}>Отмена</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalForUpdate} toggle={this.toggleToUpdate}>
          <ModalHeader toggle={this.toggleToUpdate}>Изменить задание</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Задание</Label>
                <Input type="text" value={this.state.taskTextUpdate} onChange={this.handleTaskUpdateChange} />
              </FormGroup>
              <FormGroup>
                <Label>Срок выполнения</Label>
                <Datetime  value={this.state.deadlineUpdate} onChange={this.handleDeadlineUpdateChange} locale="ru"/>
              </FormGroup>
            </Form>
            <Fade in={this.state.fadeInForUpdate} tag="p" className="mt-3">
              {this.state.putResponse}
            </Fade>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateTask}>Сохранить</Button>
            <Button color="secondary" onClick={this.toggleToUpdate}>Отмена</Button>
          </ModalFooter>
        </Modal>              
      </div>
    );
  }
}

export default TaskList;