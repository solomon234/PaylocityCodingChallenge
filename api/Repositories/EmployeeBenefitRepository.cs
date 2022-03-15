
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PaylocityCodingChallenge.Model;

namespace PaylocityCodingChallenge.api.Repositories
{
    public class EmployeeBenefitRepository : IEmployeeBenefitRepository
    {
        public Task<double> GetEmployeePay()
        {
            try
            {
                DBContext data;
                using (StreamReader r = new StreamReader(@"DB/DB.json"))
                {
                    string json = r.ReadToEnd();
                
                    data = JsonConvert.DeserializeObject<DBContext>(json);

                }

                return Task.FromResult(data.PayPerCheck);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Task.FromResult(0.0);
            }
        }
        public Task<double> GetCostOfBenefitsPerEmployee()
        {
            try
            {
                DBContext data;
                using (StreamReader r = new StreamReader(@"DB/DB.json"))
                {
                    string json = r.ReadToEnd();
                
                    data = JsonConvert.DeserializeObject<DBContext>(json);
                }

                return Task.FromResult(data.CostOfBenefitsPerEmployee);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Task.FromResult(0.0);
            }
        }
        public Task<double> GetCostOfBenefitsPerDependent()
        {
            try
            {
                DBContext data;
                using (StreamReader r = new StreamReader(@"DB/DB.json"))
                {
                    string json = r.ReadToEnd();
                
                    data = JsonConvert.DeserializeObject<DBContext>(json);
                }

                return Task.FromResult(data.CostOfBenefitsPerDependent);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Task.FromResult(0.0);
            }
        }
        public Task<int> GetNumOfPayPerYear()
        {
            try
            {
                DBContext data;
                using (StreamReader r = new StreamReader(@"DB/DB.json"))
                {
                    string json = r.ReadToEnd();
                
                    data = JsonConvert.DeserializeObject<DBContext>(json);
                }

                return Task.FromResult(data.NumOfPayPerYear);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Task.FromResult(0);
            }
        }
    }
}