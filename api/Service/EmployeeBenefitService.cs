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

        public Task<double> GetEmployeePay()
        {
            return _repository.GetEmployeePay();
        }

        public Task<double> GetCostOfBenefitsPerEmployee()
        {
            return _repository.GetCostOfBenefitsPerEmployee();
        }

        public Task<double> GetCostOfBenefitsPerDependent()
        {
            return _repository.GetCostOfBenefitsPerDependent();
        }
        public Task<int> GetNumOfPayPerYear()
        {
            return _repository.GetNumOfPayPerYear();
        }

    }
}