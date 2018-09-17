import React, { Component } from 'react';

class EmployeeDetail extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.employee.name}</td>
                <td>{this.props.employee.phone}</td>
                <td>{this.props.employee.email}</td>
            </tr>
        );
    }
}

export default EmployeeDetail;