import React from 'react';
import {Button} from 'reactstrap';

class EmployeeDetail extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.employee.name}</td>
                <td>{this.props.employee.phone}</td>
                <td> <Button color="secondary">Дать задание</Button></td>
            </tr>
        );
    }
}

export default EmployeeDetail;