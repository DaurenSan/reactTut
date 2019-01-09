import React from 'react';

class TaskDetail extends React.Component {
    options={
        weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
      }

    render() {
        return (
            <tr>
                <td>{this.props.task.task_text}</td>
                <td>{new Intl.DateTimeFormat('ru-RU', this.options).format(new Date(this.props.task.pub_date))}</td>
                <td>{new Intl.DateTimeFormat('ru-RU', this.options).format(new Date(this.props.task.deadline))}</td>
            </tr>
        );
    }
}

export default TaskDetail;