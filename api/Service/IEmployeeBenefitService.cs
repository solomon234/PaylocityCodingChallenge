using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PaylocityCodingChallenge.api.Service
{
    public interface IEmployeeBenefitService
    {
        Task<double> GetEmployeePay();
        Task<double> GetCostOfBenefitsPerDependent();
        Task<double> GetCostOfBenefitsPerEmployee();
        Task<int> GetNumOfPayPerYear();
    }
}