namespace PaylocityCodingChallenge.Model
{
    public class DBContext
    {
        public double PayPerCheck { get; set; } = 2000.00;
        public double CostOfBenefitsPerEmployee { get; set; } = 1000.00;
        public double CostOfBenefitsPerDependent { get; set; } = 500.00;
        public int NumOfPayPerYear { get; set; } = 26;
    }
}