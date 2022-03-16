using System.Collections.Generic;

namespace PaylocityCodingChallenge.Model
{
    public class Employee
    {
        public string FirstName {get; set; }
        public string LastName {get; set; }
        public double pay { get; set; }
        private List<Dependent> Dependents { get; set; }
    }
}