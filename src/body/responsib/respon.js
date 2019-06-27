import React from 'react';
import { Table } from 'reactstrap';

class Responsib extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsib: []
    };
    this.url = 'http://127.0.0.1:8000/salesmen/responsibilities';
  }

  componentDidMount(){
    fetch(this.url)
    .then (response => response.json()).then(responsib =>this.setState({responsib}))
  }

  render() {
    console.log(this.state.responsib)
    return (
      <div>
        <Table>
          <thead>
            <tr>
            </tr>
            <tr>
              <th>Сотрудник</th>
              <th>Задание</th>
            </tr>
          </thead>
          <tbody>
            {this.state.responsib.map( resp => <tr><td>{resp.employee}</td><td>{resp.task}</td></tr>)}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Responsib;