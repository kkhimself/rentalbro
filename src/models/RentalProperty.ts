import * as RentalMetrics from '../utils/RentalMetrics';

export default class RentalProperty {
    // Initial costs
    public propertyPurchasePrice: number;

    public closingCosts: number;

    public includeClosingCostsInLoan: boolean;

    public renovationCosts: number;

    public includeRenovationCostsInLoan: boolean;

    public otherInitialCosts: number;

    // Mortgage
    public downPaymentPercent: number;

    get downPayment(): number {
        return (this.propertyPurchasePrice + 
            (this.includeClosingCostsInLoan ? this.closingCosts : 0) + 
            (this.includeRenovationCostsInLoan ? this.renovationCosts : 0)) * 
            this.downPaymentPercent / 100;
    }

    get loanAmount(): number {
        return this.propertyPurchasePrice + 
        (this.includeClosingCostsInLoan ? this.closingCosts : 0) + 
        (this.includeRenovationCostsInLoan ? this.renovationCosts : 0) - 
        this.downPayment;
    }

    public mortgageRate: number;

    /**
     * The length of time to repay a loan in years.  
     */
    public mortgageTerm: number;    

    get mortgageMonthly() {
        return RentalMetrics.calculateMortgage(
            this.loanAmount,
            this.mortgageRate / 100,
            this.mortgageTerm
        );
    }

    get mortgageAnnual() {
        return this.mortgageMonthly * 12;
    }

    get initialInvestment(): number {
        return this.downPayment + 
        (this.includeClosingCostsInLoan ? 0 : this.closingCosts) + 
        (this.includeRenovationCostsInLoan ? 0 : this.renovationCosts) + 
        this.otherInitialCosts;
    }
    // TODO: Tax benefits of mortgage

    // Operating expenses
    public propertyTaxesAnnual: number; // Annual

    public hoaFeesMonthly: number; // Monthly

    get hoaFeesAnnual() {
        return this.hoaFeesMonthly * 12;
    }
    public homeInsuranceAnnual: number; // Annual

    public maintenanceCostsAnnual: number; // Annual

    get operatingExpensesAnnual() {
        return this.propertyTaxesAnnual + this.hoaFeesAnnual + this.homeInsuranceAnnual + this.maintenanceCostsAnnual;
    }
    // TODO: Any tax benefits?

    // Revenues
    public rentMonthly: number;

    public averageVacancy: number; // Days per Year

    get vacancyRate() {
        return this.averageVacancy / 365;
    }

    get revenueAnnual() {
        return this.rentMonthly * 12 * (1 - this.vacancyRate);
    }
    // TODO: Tax on rental income?

    // Growth rate
    public rentGrowthRate: number; // Annual

    public propertyValueGrowthRate: number; // Annual

    public inflationRate: number; // Annual, for insurance, maintenance etc.

    // How long to keep the property
    public holdingPeriod: number; // Years

    public discountRate: number; // Average annual return of S&P 500

    /**
     * Total return of S&P 500 over the holding period
     */
    get discountRateTotalReturn() {
        return Math.pow(1 + this.discountRate / 100, this.holdingPeriod) - 1;
    }

    // Sale of property
    get propertySalePrice() {
        return this.propertyPurchasePrice *
            Math.pow(1 + this.propertyValueGrowthRate / 100, this.holdingPeriod);
    }

    /**
     * Real estate agent's commission % for selling property
     */
    public salesCommissionRate: number;

    get mortgagePayoff() {
        return RentalMetrics.calculateMortgageBalance(
            this.loanAmount,
            this.mortgageRate / 100,
            this.mortgageTerm, this.holdingPeriod * 12);
    }

    get proceedsFromSale() {
        return this.propertySalePrice - this.propertySalePrice * this.salesCommissionRate / 100 - this.mortgagePayoff;
    }
    // TODO: Tax implications of sale

    constructor(propertyPurchasePrice: number, closingCosts: number, includeClosingCostsInLoan: boolean, renovationCosts: number, includeRenovationCostsInLoan: boolean, otherInitialCosts: number,
        downPaymentPercent: number, mortgageRate: number, mortgageTerm: number, 
        propertyTaxesAnnual: number, hoaFeesMonthly: number, homeInsuranceAnnual: number, maintenanceCostsAnnual: number, 
        rentMonthly: number, averageVacancy: number,
        rentGrowthRate: number, propertyValueGrowthRate: number, inflationRate: number, 
        holdingPeriod: number, discountRate: number, salesCommissionRate: number
    ) {
        this.propertyPurchasePrice = propertyPurchasePrice;
        this.closingCosts = closingCosts;
        this.includeClosingCostsInLoan = includeClosingCostsInLoan;
        this.renovationCosts = renovationCosts;
        this.includeRenovationCostsInLoan = includeRenovationCostsInLoan;
        this.otherInitialCosts = otherInitialCosts;
        this.downPaymentPercent = downPaymentPercent;
        this.mortgageRate = mortgageRate;
        this.mortgageTerm = mortgageTerm;

        this.propertyTaxesAnnual = propertyTaxesAnnual;
        this.hoaFeesMonthly = hoaFeesMonthly;
        this.homeInsuranceAnnual = homeInsuranceAnnual;
        this.maintenanceCostsAnnual = maintenanceCostsAnnual;

        this.rentMonthly = rentMonthly;
        this.averageVacancy = averageVacancy;

        this.rentGrowthRate = rentGrowthRate;
        this.propertyValueGrowthRate = propertyValueGrowthRate;
        this.inflationRate = inflationRate;
        this.holdingPeriod = holdingPeriod;
        this.discountRate = discountRate;

        this.salesCommissionRate = salesCommissionRate;
    }

    get cashFlows() {
        return RentalMetrics.calculateCashFlows(
            this.mortgageAnnual,
            this.holdingPeriod,
            this.revenueAnnual,
            this.rentGrowthRate / 100,
            this.operatingExpensesAnnual,
            this.inflationRate / 100
        );
    }

    get npv() {
        return RentalMetrics.calculateNpv(
            this.discountRate / 100,
            this.initialInvestment,
            this.cashFlows.map((c) => c.cashFlow),
            this.proceedsFromSale
        );
    }

    get irr() {
        return RentalMetrics.calculateIrr(
            this.initialInvestment,
            this.cashFlows.map((c) => c.cashFlow),
            this.proceedsFromSale
        ) * 100;
    }

    get grossReturn() {
        return RentalMetrics.calculateGrossReturn(
            this.initialInvestment,
            this.cashFlows.map((c) => c.cashFlow),
            this.proceedsFromSale
        );
    }

    get cagr() {
        return RentalMetrics.calculateCagr(
            this.initialInvestment,
            this.cashFlows.map((c) => c.cashFlow),
            this.proceedsFromSale
        ) * 100;
    }

    // Cash-on-Cash Return for Year 1
    get coc() {
        return this.cashFlows.map((c) => c.cashFlow)[0] / this.initialInvestment;
    }

    // Gross Rent Multiplier for Year 1
    get grm() {
        return this.propertyPurchasePrice / (this.rentMonthly * 12);
    }

    // Capitalization Rate for Year 1
    // Cap Rate ignores mortgage financing
    get capRate() {
        return (this.revenueAnnual - this.operatingExpensesAnnual) / this.propertyPurchasePrice;
    }

    // Debt Service Coverage Ratio
    get dscr() {
        return (this.revenueAnnual - this.operatingExpensesAnnual) / this.mortgageAnnual;
    }
}