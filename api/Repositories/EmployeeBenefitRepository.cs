
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PaylocityCodingChallenge.Model;

namespace PaylocityCodingChallenge.api.Repositories
{
    public class EmployeeBenefitRepository : IEmployeeBenefitRepository
    {
        private readonly ILogger<EmployeeBenefitRepository> _logger;
        public EmployeeBenefitRepository(ILogger<EmployeeBenefitRepository> logger)
        {
            _logger = logger;
        }
        
        /// <summary>
        /// Data layer - Get employee pay from db
        /// </summary>
        /// <returns></returns>
        public Task<double> GetEmployeePay()
        {
            try
            {
                DBContext data = new DBContext();
                // using (StreamReader r = new StreamReader(Path.Combine(Environment.CurrentDirectory ,@"DB/DB.json")))
                // {
                //     string json = r.ReadToEnd();
                //
                //     data = JsonConvert.DeserializeObject<DBContext>(json);
                //
                // }
                _logger.LogInformation("Successfully Retrieved Employee Pay");
                return Task.FromResult(data.PayPerCheck);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Task.FromResult(0.0);
            }
        }
        /// <summary>
        /// Data layer - Get employee cost of benefits from db
        /// </summary>
        /// <returns></returns>
        public Task<double> GetCostOfBenefitsPerEmployee()
        {
            try
            {
                DBContext data = new DBContext();
                // using (StreamReader r = new StreamReader(@"DB/DB.json"))
                // {
                //     string json = r.ReadToEnd();
                //
                //     data = JsonConvert.DeserializeObject<DBContext>(json);
                // }
                _logger.LogInformation("Successfully Cost of Benefits for Employee");
                return Task.FromResult(data.CostOfBenefitsPerEmployee);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Task.FromResult(0.0);
            }
        }
        /// <summary>
        /// Data layer - Get dependents cost of benefits from db
        /// </summary>
        /// <returns></returns>
        public Task<double> GetCostOfBenefitsPerDependent()
        {
            try
            {
                DBContext data = new DBContext();
                // using (StreamReader r = new StreamReader(@"DB/DB.json"))
                // {
                //     string json = r.ReadToEnd();
                //
                //     data = JsonConvert.DeserializeObject<DBContext>(json);
                // }
                _logger.LogInformation("Successfully Cost of Benefits for Dependent");
                return Task.FromResult(data.CostOfBenefitsPerDependent);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Task.FromResult(0.0);
            }
        }
        /// <summary>
        /// Data layer - Get frequency of pay per year from db
        /// </summary>
        /// <returns></returns>
        public Task<int> GetNumOfPayPerYear()
        {
            try
            {
                DBContext data = new DBContext();
                // using (StreamReader r = new StreamReader(@"DB/DB.json"))
                // {
                //     string json = r.ReadToEnd();
                //
                //     data = JsonConvert.DeserializeObject<DBContext>(json);
                // }
                _logger.LogInformation("Successfully Annual Frequency For Employee Pay");
                return Task.FromResult(data.NumOfPayPerYear);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Task.FromResult(0);
            }
        }
    }
}