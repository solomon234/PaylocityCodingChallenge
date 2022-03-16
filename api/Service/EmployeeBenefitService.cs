using System.Threading.Tasks;
using PaylocityCodingChallenge.api.Repositories;

namespace PaylocityCodingChallenge.api.Service
{
    public class EmployeeBenefitService : IEmployeeBenefitService
    {
        private IEmployeeBenefitRepository _repository;
        
        public EmployeeBenefitService(IEmployeeBenefitRepository repository)
        {
            _repository = repository ;
        }
        
        /// <summary>
        /// Get employee pay
        /// </summary>
        /// <returns></returns>
        public Task<double> GetEmployeePay()
        {
            return _repository.GetEmployeePay();
        }
        /// <summary>
        /// Get cost of benefits for employee
        /// </summary>
        /// <returns></returns>
        public Task<double> GetCostOfBenefitsPerEmployee()
        {
            return _repository.GetCostOfBenefitsPerEmployee();
        }
        /// <summary>
        /// Get cost of benefits for dependent
        /// </summary>
        /// <returns></returns>
        public Task<double> GetCostOfBenefitsPerDependent()
        {
            return _repository.GetCostOfBenefitsPerDependent();
        }
        /// <summary>
        /// Get frequency of pay period
        /// </summary>
        /// <returns></returns>
        public Task<int> GetNumOfPayPerYear()
        {
            return _repository.GetNumOfPayPerYear();
        }

    }
}