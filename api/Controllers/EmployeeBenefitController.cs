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
        /// 
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<bool> Post(Employee e)
        {
            return await Task.FromResult(true);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("getEmployeePay")]
        [HttpGet]
        public async Task<IActionResult> GetEmployeePay()
        {
            return  Ok(await _service.GetEmployeePay());
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("getCostOfBenefitsPerEmployee")]
        [HttpGet]
        public async Task<IActionResult> GetCostOfBenefitsPerEmployee()
        {
            return  Ok(await _service.GetCostOfBenefitsPerEmployee());
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("getCostOfBenefitsPerDependent")]
        [HttpGet]
        public async Task<IActionResult> GetCostOfBenefitsPerDependent()
        {
            return  Ok(await _service.GetCostOfBenefitsPerDependent());
        }
        
        /// <summary>
        /// 
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