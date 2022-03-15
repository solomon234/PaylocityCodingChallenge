import React, { useState } from 'react';
import {BenefitsForm} from "./BenefitsForm";
import {ResultsSideBar} from "./ResultsSideBar";

export const Home = () => {

    const [employee, setEmployeeData] = useState({
        firstName: '',
        lastName:'',
        dependents:[],
    });

    
    const pull_data = (data) => {
        setEmployeeData({...data});
    }  
    
    return (
      <div>
        <h1>Welcome to Solomon's Benefits Calculator</h1>
        <p>Built In React, .NET Core 5.0 and deployed on Heroku as a Docker Container</p>
        <hr />
          <div className="row">

              <div className="col-md-4 order-md-2 mb-4">
                  <ResultsSideBar employee={employee}/>
              </div>

              <div className="list-group mb-3">
                  <BenefitsForm employee={employee} func={pull_data}/>
              </div>
              
          </div>
      </div>
    );
}
