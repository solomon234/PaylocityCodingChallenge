import React, {Component} from 'react';

export class ResultsSideBar extends Component {
    static displayName = ResultsSideBar.name;

    constructor(props) {
        super(props);
        this.state = {
            employeePay: 0.0,
            numPayYear: 0,
            costOfBenefitEmployee: 0,
            costOfBenefitDependent: 0,
            calculateRows: (i) => {
                // Default Variables
                let res = 0;
                let hasDiscount = false;
                
                // Calculate Employee or Dependents
                if (i == -1){
                    res = this.state.costOfBenefitEmployee / this.state.numPayYear;
                    hasDiscount = this.props.employee.firstName.toLowerCase().substring(0, 1) === 'a'
                }                    
                else {
                    res = this.state.costOfBenefitDependent/ this.state.numPayYear;
                    hasDiscount = this.props.employee.dependents[i].firstName?.toLowerCase().substring(0, 1) === 'a'
                }                 
                
                // Handle Discount
                if (hasDiscount) res -= res * .10;

                return res.toFixed(2);
            },
            calculate: () => {
                let res = 0.0;
                
                res += parseFloat(this.state.calculateRows(-1));
                res += this.props.employee.dependents.reduce((val, e, i) => {
                    return val += parseFloat(this.state.calculateRows(i))
                }, 0.0);
                console.log(res);

                return res;
           },
        };
    }

    componentDidMount() {
        this.getEmployeePayData();
        this.getNumOfPayPerYear();
        this.getCostOfBenefitsPerEmployee();
        this.getCostOfBenefitsPerDependent();
    }

    render() {
        return (
            <div>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Results</span>
                </h4>
                <ul className="list-group mb-3">
                    <li key="employeeBasePay" className="list-group-item d-flex justify-content-between lh-condensed">
                        <div className={this.props.employee.firstName === '' ? 'd-none' : ''}>
                            <div>
                                <h6 className="my-0">Employee Base Pay</h6>
                                <small
                                    className="text-muted">{this.props.employee.firstName + ' ' + this.props.employee.lastName}</small>
                            </div>
                        </div>
                        <span
                            className={this.props.employee.firstName === '' ? 'd-none' : ''}>$ {this.state.employeePay}</span>
                    </li>
                    <li key="EmployeeBenefitCost"
                        className="list-group-item d-flex justify-content-between lh-condensed">
                        <div className={this.props.employee.firstName === '' ? 'd-none' : ''}>
                            <div>
                                <h6 className="my-0">Employee Benefit Cost</h6>
                                <small
                                    className="text-muted">{this.props.employee.firstName + ' ' + this.props.employee.lastName}</small>
                            </div>
                        </div>
                        <span
                            className={this.props.employee.firstName === '' ? 'd-none' : 'text-danger'}>$ {this.state.calculateRows(-1,)}</span>
                    </li>
                    {
                        this.props.employee.dependents.map((item, i) => {
                            return (
                                <>
                                    <li key={i} className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <div>
                                                <h6 className="my-0">Dependent Benefit Cost</h6>
                                                <small className="text-muted">{item.firstName} {item.lastName}</small>
                                            </div>
                                        </div>
                                        <span
                                            className="text-danger"> $ {this.state.calculateRows(i)}</span>
                                    </li>
                                </>
                            )
                        })
                    }                    
                </ul>

                <div className="list-group-item d-flex justify-content-between lh-condensed">
                    <div className={this.props.employee.firstName === '' ? 'd-none' : ''}>
                        <div>
                            <h6 className="my-0">Total</h6>
                            <small className="text-muted">({this.props.employee.dependents.length})</small>
                        </div>
                    </div>
                    <span
                        className={this.props.employee.firstName === '' ? 'd-none' : ''}>$ {this.state.employeePay - this.state.calculate()}</span>
                </div>
            </div>
        );
    }

    async getEmployeePayData() {
        const response = await fetch('api/EmployeeBenefit/getEmployeePay');
        const data = await response.json();
        this.setState({employeePay: data});
    }

    async getNumOfPayPerYear() {
        const response = await fetch('api/EmployeeBenefit/getNumOfPayPerYear');
        const data = await response.json();
        this.setState({numPayYear: data});
    }

    async getCostOfBenefitsPerEmployee() {
        const response = await fetch('api/EmployeeBenefit/getCostOfBenefitsPerEmployee');
        const data = await response.json();
        this.setState({costOfBenefitEmployee: data});
    }

    async getCostOfBenefitsPerDependent() {
        const response = await fetch('api/EmployeeBenefit/getCostOfBenefitsPerDependent');
        const data = await response.json();
        this.setState({costOfBenefitDependent: data});
    }
}

