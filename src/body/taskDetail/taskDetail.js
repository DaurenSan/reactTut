import React from 'react';
import './taskDetail.css';

class TaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            taskSelected: false
        }
    }
    selectTask(taskId, taskState){
        this.setState({
            taskSelected: !this.state.taskSelected
          });
         this.props.callback(taskId, taskState);
    }

    options={
        weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
      }

    render() {
        console.log(this.state.taskSelected);
        let rowStyle = this.state.taskSelected ? 'selected':'unselected';
        return (
            <tr className={rowStyle} onClick={()=>this.selectTask(this.props.task.id, this.state.taskSelected)}>
                <td>{this.props.task.task_text}</td>
                <td>{new Intl.DateTimeFormat('ru-RU', this.options).format(new Date(this.props.task.pub_date))}</td>
                <td>{new Intl.DateTimeFormat('ru-RU', this.options).format(new Date(this.props.task.deadline))}</td>
            </tr>
        );
    }
}

export default TaskDetail;