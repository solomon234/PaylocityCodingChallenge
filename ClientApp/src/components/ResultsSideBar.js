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
                if (i === -1){
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
                if (this.state.costOfBenefitEmployee !== 0 && this.state.numPayYear !== 0){
                    res += parseFloat(this.state.calculateRows(-1));
                    res += this.props.employee.dependents.reduce((val, e, i) => {
                        return val += parseFloat(this.state.calculateRows(i))
                    }, 0.0);    
                }
                
                return res;
           },           
            confirmContributionClick: () => {                
                this.props.employee.completed = true;
                this.props.func(this.props.employee);
            }
            
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
                    <span className="text-muted">Summary</span>
                </h4>            
                <ul className="list-group mb-3">
                    <li key="EmployeeBasePay"
                        className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Employee Base Pay:</h6>
                            <small className="text-muted">{this.props.employee.firstName + ' ' + this.props.employee.lastName}</small>
                        </div>
                        <div>
                            <span>${this.state.employeePay} / Bi-weekly</span>
                            <p className={'small text-muted'}>${this.state.employeePay * this.state.numPayYear} / year</p>    
                        </div>                            
                    </li>
                    <li key="EmployeeBenefitCost"
                        className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Self:</h6>
                            <small className="text-muted">{this.props.employee.firstName + ' ' + this.props.employee.lastName}</small>
                        </div>
                        <span
                            className="text-danger">${this.state.calculateRows(-1)} / Bi-weekly</span>
                    </li>
                    {
                        this.props.employee.dependents.map((item, i) => {
                            return (
                                <li key={i} className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Dependent {i+1}:</h6>
                                        <small className="text-muted">{item.firstName} {item.lastName} ({item.relationship})</small>
                                    </div>
                                    <span className="text-danger"> ${this.state.calculateRows(i)} / Bi-weekly</span>
                                </li>

                            )
                        })
                    }
                    <li key="SubTotal" className="list-group-item d-flex justify-content-between lh-condensed">
                        <h6 className="my-0 w-50">Employee Total Contribution:</h6>
                        <span className="text-danger"> ${this.state.calculate().toFixed(2)} / Bi-weekly</span>
                    </li>
                </ul>                
                <div
                    className="list-group-item d-flex justify-content-between lh-condensed list-group-item-success">
                    <div>
                        <h6 className="my-0">Your Pay:</h6>
                    </div>                        
                    <div>
                        <span>${this.state.employeePay - this.state.calculate()} / Bi-weekly</span>
                        <p className={'small text-muted'}>${((this.state.employeePay - this.state.calculate()) * this.state.numPayYear).toFixed(2)} / year</p>
                    </div>
                </div>           
                <button disabled={(this.props.employee.firstName + this.props.employee.lastName).trim() === ''} className="btn btn-block btn-success mt-4" onClick={this.state.confirmContributionClick}>Confirm Contribution</button>
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

