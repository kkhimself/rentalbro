  export function calculateMortgage(
    principal: number,
    rate: number,
    years: number
  ): number {
    const monthlyRate = rate / 12;
    const numberOfPayments = years * 12;
    const mortgagePayment =
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    return mortgagePayment;
  }
  
  export function calculateMortgageBalance(
    principal: number,
    rate: number,
    years: number,
    monthsPaid: number
  ): number {
    const monthlyRate = rate / 12;
    const totalPayments = years * 12;
  
    const remainingBalance =
      principal *
      ((Math.pow(1 + monthlyRate, totalPayments) -
        Math.pow(1 + monthlyRate, monthsPaid)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1));
  
    return remainingBalance;
  }
  
  export function calculateCashFlows(
    mortgageAnnual: number,
    numberOfYears: number,
    income: number,
    incomeGrowthRate: number,
    expenses: number,
    expenseGrowthRate: number
  ) {
    const cashFlows: number[] = [];
    for (let year = 0; year < numberOfYears; year++) {
      cashFlows.push(
        income * Math.pow(1 + incomeGrowthRate, year) -
          mortgageAnnual -
          expenses * Math.pow(1 + expenseGrowthRate, year)
      );
    }
    return cashFlows;
  }
  
  export function calculateNpv(
    discountRate: number,
    initialInvestment: number,
    cashFlows: number[],
    proceedsFromSale: number
  ): number {
    let npv = -initialInvestment;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + discountRate, t);
    }
    npv += proceedsFromSale / Math.pow(1 + discountRate, cashFlows.length - 1);
    return npv;
  }
  
  export function calculateIrr(
    initialInvestment: number,
    cashFlows: number[],
    proceedsFromSale: number
  ): number {
    const precision = 0.0001;
    let minRate = -1;
    let maxRate = 1;
    let result = NaN;
  
    for (let i = 0; i < 100; i++) {
      const guessRate: number = (minRate + maxRate) / 2;
      let npv: number = -initialInvestment;
  
      for (let t = 0; t < cashFlows.length; t++) {
        npv += cashFlows[t] / Math.pow(1 + guessRate, t);
      }
  
      npv += proceedsFromSale / Math.pow(1 + guessRate, cashFlows.length - 1);
  
      if (Math.abs(npv) < precision) {
        result = guessRate;
        break;
      } else if (npv > 0) {
        minRate = guessRate;
      } else {
        maxRate = guessRate;
      }
    }
  
    return result;
  }
