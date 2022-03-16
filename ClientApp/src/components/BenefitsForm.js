import React, {useState, useEffect} from 'react';

export const BenefitsForm = (props) => {
    

    const [errors, setErrors] = useState({});


    const handleValidation = (val, name) => {
        let newErr = {...errors};
        if (val === '') {
            newErr[name] = name + ' cannot be blank';
            setErrors(newErr);
            return false;
        }
        if (val.includes('Choose')) {
            newErr[name] = 'Must define relationship to dependent';
            setErrors(newErr);
            return false;
        }
        setErrors({});
        return true;
    }

    const [employee, setEmployee] = useState({
        ...props.employee
    });

    const edit = () => {
        setEmployee({...employee, edited: false});
    }

    const handleChangeFirstName = (e) => {
        if (handleValidation(e.target.value, e.target.id))
            setEmployee({...employee, firstName: e.target.value});
    };

    const handleChangeLastName = (e) => {
        if (handleValidation(e.target.value, e.target.id))
            setEmployee({...employee, lastName: e.target.value});
    };
    const saveEmployee = () => {
        employee.edited = true;
        props.func(employee);
    }

    const [dependent, setDependent] = useState({});
    
    const handleChangeDependentFName = (e) => {
        let val = e.target.value;
        if (handleValidation(val, e.target.id))
            setDependent({...dependent, firstName: val});
    };

    const handleChangeDependentLName = (e) => {
        let val = e.target.value;
        if (handleValidation(val, e.target.id))
            setDependent({...dependent, lastName: val});
    };

    const handleChangeDependentRelationship = (e) => {
        let val = e.target.value;
        if (handleValidation(val, e.target.id))
            setDependent({...dependent, relationship: val});
    };

    const deleteRow = (i) => {
        let newDependents = [...employee.dependents];
        newDependents.splice(i, 1);
        let newEmployeeDependents = {...employee, dependents: [...newDependents]};
        setEmployee(newEmployeeDependents);
        props.func(newEmployeeDependents);
    }

    const saveDependents = () => {
        let newEmployeeDependents = {...employee, dependents: [...employee.dependents, dependent]};
        setEmployee(newEmployeeDependents);
        props.func(newEmployeeDependents);
    }


    return (
        <div className="container">
            <h4 className="mb-3">Employee Information</h4>
            <div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <strong className="col-form-label">First Name</strong>
                        <input type="text" className={employee.edited ? 'd-none' : 'form-control'}
                               id="EmployeeFirstName" placeholder="" onBlur={handleChangeFirstName}/>
                        <span className="text-danger">{errors.EmployeeFirstName}</span>
                        <div className={!employee.edited ? 'd-none' : ''}>{employee.firstName}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <strong className="col-form-label">Last Name</strong>
                        <input type="text" className={employee.edited ? 'd-none' : 'form-control'} id="EmployeeLastName"
                               placeholder="" onBlur={handleChangeLastName}/>
                        <span className="text-danger">{errors.EmployeeLastName}</span>
                        <div className={!employee.edited ? 'd-none' : ''}>{employee.lastName}</div>
                    </div>
                </div>

                <button className={employee.edited ? 'd-none' : 'btn btn-primary'}
                        disabled={employee.firstName === '' || employee.lastName === '' || Object.keys(errors).length !== 0}
                        onClick={saveEmployee}> Save
                </button>
                <button className={!employee.edited ? 'd-none' : 'btn btn-success'} onClick={edit}> Edit</button>

                {props.employee.firstName !== '' &&
                    <div className="mt-4">
                        <h4 className="mb-3">Dependent Information:</h4>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <strong className="col-form-label">First Name</strong>
                                <input type="text" className={'form-control'} id="DependentFirstName" placeholder=""
                                       onBlur={handleChangeDependentFName} onChange={handleChangeDependentFName}/>
                                <span className="text-danger">{errors.DependentFirstName}</span>
                            </div>
                            <div className="col-md-3 mb-3">
                                <strong className="col-form-label">Last Name</strong>
                                <input type="text" className={'form-control'} id="DependentLastName" placeholder=""
                                       onBlur={handleChangeDependentLName}/>
                                <span className="text-danger">{errors.DependentLastName}</span>
                            </div>
                            <div className={'col-md-3'}>
                                <strong className="col-form-label">Relationship</strong>
                                <select className="dropdown dropdown-item-text " id={'DependentRelationShip'}
                                        onBlur={handleChangeDependentRelationship} onChange={handleChangeDependentRelationship}>
                                    <option value="">Choose...</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Child">Child</option>
                                    <option value="Adopted Child">Adopted Child</option>
                                </select>
                                <span className="text-danger">{errors.DependentRelationShip}</span>
                            </div>
                        </div>

                        <button className="btn btn-success" disabled={Object.keys(errors).length !== 0}
                                onClick={saveDependents}>Add Dependent
                        </button>

                        <table className="table table-bordered mt-4">
                            <thead>
                            <tr>
                                <th>Delete</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Relationship</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                employee.dependents.length > 0 && employee.dependents.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="text-center">
                                                <button onClick={() => deleteRow(i)}
                                                        className="btn btn-sm btn-outline-danger">x
                                                </button>
                                            </td>
                                            <td>
                                                <div>{item.firstName}</div>
                                            </td>
                                            <td>
                                                <div>{item.lastName}</div>
                                            </td>
                                            <td>
                                                <div>{item.relationship}</div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
}

