import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddPayroll from './AddPayroll';

class PayrollList extends Component {
  state = { payroll: [] };

  componentDidMount() {
    this.loadPayrolls();
  }
  
// Functions for loading, adding and deleting payrolls.

  loadPayrolls = () => {
    fetch('https://quiet-sands-37207.herokuapp.com/api/payrolls')
    .then((response) => response.json()) 
    .then((response) => {
      this.setState({ 
        payroll: response,
      }); 
    })
  }

  addPayroll(payroll) {
    fetch('https://quiet-sands-37207.herokuapp.com/api/payrolls',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payroll)
      })
      .then(res => this.loadPayrolls())
      .catch(err => console.error(err))
  }

  deletePayroll = (link) => {
    fetch(link, { method: 'DELETE' })
      .then(res => this.loadPayrolls())
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="App-body">
        <div className="row">
          <AddPayroll addPayroll={this.addPayroll} loadPayrolls={this.loadPayrolls} />
        </div>
        <ReactTable 
          data={this.state.payroll}
          columns={[
            {
              columns: [
                {
                  Header: "Id", accessor: "id",
                  Footer: () => {
                    return "Kokonaispalkka:"
                  }
                    },
                {
                  Header: "Työnantaja", accessor: "employee"
                    },
                {
                  Header: "Työntekijä", accessor: "employer"
                    },
                {
                  // Cell function to get it to show only the decimals needed, and the € character.
                  Header: "Palkka", accessor: "monetarySalary",
                  Cell: props => <span>{props.value.toFixed(2)}€</span>,

                  Footer: (
                    <span>{
                      // Get the total salary sum, with decimals and €.
                      this.state.payroll.reduce((total, { monetarySalary }) => total += monetarySalary, 0).toFixed(2) + "€"
                    }</span>
                  )
                },
                {
                  // Cell to make it more readable without the hours and minutes.
                  Header: "Maksupäivä", accessor: "payDay",
                  Cell: props => <span>{props.value.substring(0,10)}</span>
                    },
                {
                  Header: "Palkan tila", accessor: "state"
                },
                {
                  Header: "Luotu", accessor: "created"
                },
                {
                  Header: "Päivitetty", accessor: "updated"
                },
                {
                  id: 'button', accessor: "id", sortable: false, filterable: false,
                  Cell: (props) => (<button onClick={() => {this.deletePayroll("https://quiet-sands-37207.herokuapp.com/api/payrolls/" + props.value)}}>X</button>)
                },
              ]
            }
          ]}
          defaultPageSize={5}
          filterable>
        </ReactTable>
      </div>
    );
  }
}

export default PayrollList;