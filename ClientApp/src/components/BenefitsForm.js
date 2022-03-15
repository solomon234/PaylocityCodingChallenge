import React, { useState, useEffect } from 'react';

export const BenefitsForm = (props) => {    
    
    
    const [employee, setEmployee] = useState({
        ...props.employee
    });
    
    const edit = () =>{
        employee.edited = false;
    }
    
    const handleChangeFirstName = (e) => {
        setEmployee({...employee, firstName: e.target.value});
    };

    const handleChangeLastName = (e) => {
        setEmployee({...employee, lastName: e.target.value});
    };
    const triggerFunction = () => {
        employee.edited = true;
        props.func(employee);
    }
    
    const [dependents, setDependents] = useState([]);    
   
    const handleChangeDependentFName = (val, i) => {        
        const newDependent = dependents.map((e,j) =>{
            if (i !== j) return e;            
            return {...e, firstName: val}            
        })
        setDependents([...newDependent]);
    };
    
    const handleChangeDependentLName = (val, i) => {
        const newDependent = dependents.map((e,j) =>{
            if (i !== j) return e;
            return {...e, lastName: val}
        })
        setDependents([...newDependent]);    
    };
    
    const handleChangeDependentRelationship = (val, i) => {
        const newDependent = dependents.map((e,j) =>{
            if (i !== j) return e;
            return {...e, relationship: val}
        })
        setDependents([...newDependent]);
    };    

    const addRow = () =>{
        console.log('add row');        
        setDependents([...dependents,{}]);
    }        
    
    const deleteRow = (i) => {
        dependents.splice(i,1);
        setDependents([...dependents]);

    }
    const saveChanges = () => {
        setEmployee({...employee, dependents: dependents});
        props.func(employee);
    }

    return (
            <div className="container" style={{width: '700px'}}>
                <h4 className="mb-3">Employee Information</h4>
                <div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <strong className="col-form-label">First Name</strong>
                            <input type="text" className={employee.edited ? 'd-none' : 'form-control'} id="firstName" placeholder="" onChange={handleChangeFirstName} />                          
                            <div className={!employee.edited ? 'd-none' : ''}>{employee.firstName}</div>                          
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong className="col-form-label">Last Name</strong>
                            <input type="text" className={employee.edited ? 'd-none' : 'form-control'} id="lastName" placeholder="" onChange={handleChangeLastName} />
                            <div className={!employee.edited ? 'd-none' : ''}>{employee.lastName}</div>
                        </div>
                    </div>
                    
                    <button className={employee.edited ? 'd-none' : 'btn btn-primary'} onClick={triggerFunction}> Add </button>
                    <button className={!employee.edited ? 'd-none' : 'btn btn-success'} onClick={edit}> Edit </button>

                    <h4 className="mb-3">Dependent Information</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th width="35px">Actions</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Relationship</th>
                            </tr>                            
                        </thead>
                        <tbody>
                        {
                            dependents.map((item, i) => {
                                return (
                                    <tr key={i}>           
                                        <td >
                                            <button onClick={() => deleteRow(i)} className="btn btn-sm btn-outline-danger">x</button>
                                        </td>    
                                        <td>
                                            <input type="text" onBlur={(e) => handleChangeDependentFName(e.target.value, i)}/>
                                        </td>
                                        <td>
                                            <input type="text" onBlur={(e) => handleChangeDependentLName(e.target.value, i)}/>
                                        </td>
                                        <td>
                                            <select className="dropdown dropdown-item-text" onBlur={(e) => handleChangeDependentRelationship(e.target.value, i)}>
                                                <option value="">Choose...</option>
                                                <option value="Spouse">Spouse</option>
                                                <option value="Child">Child</option>                                                
                                            </select>
                                        </td>
                                    </tr>                                    
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={addRow}>Add</button>
                    <button className="btn btn-success" onClick={saveChanges}>Save Changes</button>                    
                </div>
            </div>
        );
}

