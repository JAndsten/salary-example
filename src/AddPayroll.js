import React from 'react';
import SkyLight from 'react-skylight';

class AddPayroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payroll: {
                employee: '',
                employer: '',
                monetarySalary: 0.00,
                payDay: Date(),
            },
        };
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // On saving new submission
    handleSubmit = (event) => {
        event.preventDefault();
        var newPayroll = {
            employee: this.state.employee,
            employer: this.state.employer,
            monetarySalary: parseFloat(this.state.monetarySalary),
            payDay: this.state.payDay.toString(),
        };
        this.props.addPayroll(newPayroll);
        this.props.loadPayrolls();
        this.refs.simpleDialog.hide();
    }

    // Dialogue formatting
    render() {
        const addPayrollDialog = {
            width: '70%',
            height: '450px',
            marginTop: '-300px',
            marginLeft: '-35%',
        };

        // New entry dialogue
        return (
            <div>
                <SkyLight dialogStyles={addPayrollDialog} hideOnOverlayClicked ref="simpleDialog">
                    <div className="card" style={{ "width": "95%" }}>
                        <div className="card-body">
                            <h5 className="card-title">Uusi palkkalaskelma</h5>
                            <form>
                                <div className="form-group">
                                    <input type="text" placeholder="Työntekijä" className="form-control" name="employee" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Työnantaja" className="form-control" name="employer" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="number" placeholder="Palkka" className="form-control" name="monetarySalary" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="date" placeholder="Maksupäivä" className="form-control" name="payDay" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary" onClick={this.handleSubmit}>Tallenna</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </SkyLight>
                <div className="col-md-2">
                    <button style={{ 'margin': '10px' }} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>Uusi palkkalaskelma</button>
                </div>
            </div>
        );
    }
}

export default AddPayroll;