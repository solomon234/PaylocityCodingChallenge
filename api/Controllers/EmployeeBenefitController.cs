using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PaylocityCodingChallenge.api.Service;
using PaylocityCodingChallenge.Model;

namespace PaylocityCodingChallenge.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeBenefitController : ControllerBase
    {
        private IEmployeeBenefitService _service;

        public EmployeeBenefitController(IEmployeeBenefitService service)
        {
            _service = service;
        }

        /// <summary>
        /// Gets employee pay from db 
        /// </summary>
        /// <returns></returns>
        [Route("getEmployeePay")]
        [HttpGet]
        public async Task<IActionResult> GetEmployeePay()
        {
            return  Ok(await _service.GetEmployeePay());
        }
        
        /// <summary>
        /// Gets Cost of benefits for an employee from db
        /// </summary>
        /// <returns></returns>
        [Route("getCostOfBenefitsPerEmployee")]
        [HttpGet]
        public async Task<IActionResult> GetCostOfBenefitsPerEmployee()
        {
            return  Ok(await _service.GetCostOfBenefitsPerEmployee());
        }
        
        /// <summary>
        /// Gets Cost of benefits for a dependent from db
        /// </summary>
        /// <returns></returns>
        [Route("getCostOfBenefitsPerDependent")]
        [HttpGet]
        public async Task<IActionResult> GetCostOfBenefitsPerDependent()
        {
            return  Ok(await _service.GetCostOfBenefitsPerDependent());
        }
        
        /// <summary>
        /// Gets frequency of annual pay from db
        /// </summary>
        /// <returns></returns>
        [Route("getNumOfPayPerYear")]
        [HttpGet]
        public async Task<IActionResult> GetNumOfPayPerYear()
        {
            return  Ok(await _service.GetNumOfPayPerYear());
        }
        
        
    }
}