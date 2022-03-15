using System.Threading.Tasks;

namespace PaylocityCodingChallenge.api.Repositories
{
    public interface IEmployeeBenefitRepository
    {
        Task<double> GetEmployeePay();
        Task<double> GetCostOfBenefitsPerDependent();
        Task<double> GetCostOfBenefitsPerEmployee();
        Task<int> GetNumOfPayPerYear();
    }
}