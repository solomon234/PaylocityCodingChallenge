import React, { useState, useEffect } from 'react';

export const BenefitsForm = (props) => {    
    
    const [errors, setErrors] = useState({});
    
    
    const handleValidation = (val, name) => {
        let newErr = {...errors};
        if (val === ''){
            newErr[name] = name + ' cannot be blank';
            setErrors(newErr);
            return false;
        }
        if (val.includes('Choose')){
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
    
    const [dependents, setDependents] = useState([]);    
   
    const handleChangeDependentFName = (e, i) => {
        let val = e.target.value;
        if (handleValidation(val, e.target.id)){
            const newDependent = dependents.map((e,j) =>{
                if (i !== j) return e;
                return {...e, firstName: val}
            })
            setDependents([...newDependent]);    
        }        
    };
    
    const handleChangeDependentLName = (e, i) => {
        let val = e.target.value;
        if (handleValidation(val, e.target.id)){
            const newDependent = dependents.map((e,j) =>{
                if (i !== j) return e;
                return {...e, lastName: val}
            })
            setDependents([...newDependent]);
        }    
    };
    
    const handleChangeDependentRelationship = (e, i) => {
        let val = e.target.value;
        if (handleValidation(val, e.target.id)) {
            const newDependent = dependents.map((e, j) => {
                if (i !== j) return e;
                return {...e, relationship: val}
            })
            setDependents([...newDependent]);
        }
    };    
    


    const addRow = () => {
        setDependents([...dependents, {}]);
    }        
    
    const deleteRow = (i) => {
        let newDependents = [...dependents];
        newDependents.splice(i, 1);
        setDependents([...newDependents]);
    }
    
    const saveDependents = () => {
        console.log('saved');
        let newEmployeeDependents = {...employee, dependents: [...dependents]};
        setEmployee({...newEmployeeDependents});
        props.func(newEmployeeDependents);
    }
    
    const getErrorVarName = (e, i) => {
        return e.target.id.trim() + (i+1).toString();
    }

    return (
            <div className="container" >
                <h4 className="mb-3">Employee Information</h4>
                <div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <strong className="col-form-label">First Name</strong>
                            <input type="text" className={employee.edited ? 'd-none' : 'form-control'} id="EmployeeFirstName" placeholder="" onBlur={handleChangeFirstName} />
                            <span className="text-danger">{errors.EmployeeFirstName}</span>
                            <div className={!employee.edited ? 'd-none' : ''}>{employee.firstName}</div>                          
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong className="col-form-label">Last Name</strong>
                            <input type="text" className={employee.edited ? 'd-none' : 'form-control'} id="EmployeeLastName" placeholder="" onBlur={handleChangeLastName} />
                            <span className="text-danger">{errors.EmployeeLastName}</span>
                            <div className={!employee.edited ? 'd-none' : ''}>{employee.lastName}</div>
                        </div>
                    </div>
                    
                    <button className={employee.edited ? 'd-none' : 'btn btn-primary'} onClick={saveEmployee}> Save </button>
                    <button className={!employee.edited ? 'd-none' : 'btn btn-success'} onClick={edit}> Edit </button>
                    
                    {props.employee.firstName !== '' &&
                        <div className="mt-4">
                            <h4 className="mb-3">Dependent Information</h4>
                            <table className="table table-bordered">
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
                                    dependents.length > 0 && dependents.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="text-center">
                                                    <button onClick={() => deleteRow(i)}
                                                            className="btn btn-sm btn-outline-danger">x
                                                    </button>
                                                </td>
                                                <td>
                                                    <input type="text" id={'DependentFirstName' + (i+1).toString()}
                                                           onBlur={(e) => handleChangeDependentFName(e, i)}/>                                                    
                                                    <span className="text-danger">{errors[(e) => getErrorVarName(e,i)] }</span>
                                                </td>
                                                <td>
                                                    <input type="text" id={'DependentLastName' + (i+1).toString()}
                                                           onBlur={(e) => handleChangeDependentLName(e, i)}/>
                                                    <span className="text-danger">{errors[(e) => getErrorVarName(e,i)]}</span>
                                                </td>
                                                <td>
                                                    <select className="dropdown dropdown-item-text"  id={'DependentRelationShip' + (i+1).toString()}
                                                            onBlur={(e) => handleChangeDependentRelationship(e, i)}>
                                                        <option value="">Choose...</option>
                                                        <option value="Spouse">Spouse</option>
                                                        <option value="Child">Child</option>
                                                        <option value="Adopted Child">Adopted Child</option>
                                                    </select>
                                                    <span className="text-danger">{errors[(e) => getErrorVarName(e,i)]}</span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            <button className="btn btn-primary mr-3" onClick={addRow}>Add</button>
                            <button className="btn btn-success" disabled={errors === {}} onClick={saveDependents}>Save Changes</button>
                        </div>

                    }
                </div>
            </div>
        );
}

