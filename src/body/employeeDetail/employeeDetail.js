import React from 'react';
import './employeeDetail.css';

class EmployeeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            employeeSelected: false
        }
    }

    selectEmployee(employeeId){
        this.setState({
            employeeSelected: !this.state.employeeSelected
          });
          this.props.callback(employeeId, this.state.employeeSelected);
    }

    render() {
        let rowStyle = this.state.employeeSelected ? 'selected':'unselected';
        console.log(this.state.employeeSelected);
        return (
            <tr className={rowStyle} onClick={()=>this.selectEmployee(this.props.employee.id)}>
                <td>{this.props.employee.name}</td>
                <td>{this.props.employee.phone}</td>
            </tr>
        );
    }
}

export default EmployeeDetail;