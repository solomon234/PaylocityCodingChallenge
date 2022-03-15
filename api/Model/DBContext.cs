namespace PaylocityCodingChallenge.Model
{
    public class DBContext
    {
        public double PayPerCheck { get; set; }
        public double CostOfBenefitsPerEmployee { get; set; }
        public double CostOfBenefitsPerDependent { get; set; }
        public int NumOfPayPerYear { get; set; }
    }
}