import * as RentalMetrics from '../utils/RentalMetrics';

export default class RentalProperty {
    // Initial costs
    public propertyPurchasePrice: number;
    // TODO: Add closing cost, renovation etc.

    // Mortgage
    public downPaymentPercent: number;

    public mortgageRate: number;

    /**
     * The length of time to repay a loan in years.  
     */
    public mortgageTerm: number;

    get downPayment(): number {
        return this.propertyPurchasePrice * this.downPaymentPercent / 100;
    }

    get mortgageMonthly() {
        return RentalMetrics.calculateMortgage(
            this.propertyPurchasePrice - this.downPayment,
            this.mortgageRate / 100,
            this.mortgageTerm
        );
    }

    get mortgageAnnual() {
        return this.mortgageMonthly * 12;
    }

    get initialInvestment(): number {
        return this.downPayment;
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
    // TODO: numberOfYears - 1?
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
            this.propertyPurchasePrice - this.downPayment,
            this.mortgageRate / 100,
            this.mortgageTerm, this.holdingPeriod * 12);
    }

    get proceedsFromSale() {
        return this.propertySalePrice - this.propertySalePrice * this.salesCommissionRate / 100 - this.mortgagePayoff;
    }
    // TODO: Tax implications of sale

    constructor(propertyPurchasePrice: number, downPaymentPercent: number, mortgageRate: number, mortgageTerm: number, propertyTaxesAnnual: number,
        hoaFeesMonthly: number, homeInsuranceAnnual: number, maintenanceCostsAnnual: number, rentMonthly: number, averageVacancy: number,
        rentGrowthRate: number, propertyValueGrowthRate: number, inflationRate: number, holdingPeriod: number, discountRate: number, salesCommissionRate: number
    ) {
        this.propertyPurchasePrice = propertyPurchasePrice;
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
            this.cashFlows,
            this.proceedsFromSale
        );
    }

    get irr() {
        return RentalMetrics.calculateIrr(
            this.initialInvestment,
            this.cashFlows,
            this.proceedsFromSale
        ) * 100;
    }

    get grossReturn() {
        return RentalMetrics.calculateGrossReturn(
            this.initialInvestment,
            this.cashFlows,
            this.proceedsFromSale
        );
    }

    get cagr() {
        return RentalMetrics.calculateCagr(
            this.initialInvestment,
            this.cashFlows,
            this.proceedsFromSale
        ) * 100;
    }

    // Cash-on-Cash Return for Year 1
    get coc() {
        return this.cashFlows[0] / this.initialInvestment;
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