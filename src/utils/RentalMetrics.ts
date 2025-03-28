export class CashFlowItem {
  year: number;
  mortgage: number;
  income: number;
  expense: number;

  constructor(
    year: number, mortgage: number, income: number, expense: number
  ) {
    this.year = year;
    this.mortgage = mortgage;
    this.income = income;
    this.expense = expense;
  }

  get noi() {
    return this.income - this.expense;
  }

  get cashFlow() {
    return this.income - this.expense - this.mortgage;
  }
}

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
  const cashFlows: CashFlowItem[] = [];
  for (let year = 0; year < numberOfYears; year++) {
    cashFlows.push(new CashFlowItem(
      year, 
      mortgageAnnual, 
      income * Math.pow(1 + incomeGrowthRate, year),
      expenses * Math.pow(1 + expenseGrowthRate, year)
    ));
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
    npv += cashFlows[t] / Math.pow(1 + discountRate, t + 1);
  }
  npv += proceedsFromSale / Math.pow(1 + discountRate, cashFlows.length);
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
      npv += cashFlows[t] / Math.pow(1 + guessRate, t + 1);
    }

    npv += proceedsFromSale / Math.pow(1 + guessRate, cashFlows.length);

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

export function calculateGrossReturn(
  initialInvestment: number,
  cashFlows: number[],
  proceedsFromSale: number
): number {
  const totalCashFlow = cashFlows.reduce((a, b) => a + b, 0);
  return (totalCashFlow + proceedsFromSale - initialInvestment) / initialInvestment;
}

export function calculateCagr(
  initialInvestment: number,
  cashFlows: number[],
  proceedsFromSale: number
): number {
  const totalCashFlow = cashFlows.reduce((a, b) => a + b, 0);
  return Math.pow((totalCashFlow + proceedsFromSale) / initialInvestment, (1 / cashFlows.length)) - 1;
}