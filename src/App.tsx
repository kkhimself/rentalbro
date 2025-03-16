import "./styles.css";

// Purchase costs
const propertyPurchasePrice = 435000;
const downPaymentPercent = 0.25;
const downPayment = propertyPurchasePrice * downPaymentPercent;
const initialInvestment = downPayment;
// TODO: Add closing cost, renovation etc.

// Mortgage
const mortgageRate = 0.0575;
const mortgageTerm = 30; // Years
const mortgage = calculateMortgage(
  propertyPurchasePrice - downPayment,
  mortgageRate,
  mortgageTerm
); // Monthly
const mortgageAnnual = mortgage * 12;
// TODO: Tax benefits of mortgage

// Operating expenses
const propertyTaxes = 6200; // Annual
const hoaFees = 175; // Monthly
const hoaFeesAnnual = hoaFees * 12; // Annual
const homeInsurance = 2000; // Annual
const maintenanceCosts = 1000; // Annual
const operatingExpenses =
  propertyTaxes + hoaFeesAnnual + homeInsurance + maintenanceCosts; // Annual
// TODO: Any tax benefits?

// Revenues
const rentMonthly = 2700;
const averageVacancy = 20; // Days per Year
const vacancyRate = averageVacancy / 365;
const revenueAnnual = rentMonthly * 12 * (1 - vacancyRate);
// TODO: Tax on rental income?

// Growth rate
const rentGrowthRate = 0.02; // Annual
const propertyValueGrowthRate = 0.05; // Annual
const inflationRate = 0.03; // Annual, for insurance, maintenance etc.

// How long to keep the property
const numberOfYears = 5;
const discountRate = 0.1; // Average long-term return of S&P 500

// Sale of property
const propertySalePrice =
  propertyPurchasePrice * Math.pow(1 + propertyValueGrowthRate, numberOfYears); // TODO: numberOfYears - 1?
const salesCommissionRate = 0.06;
const mortgagePayoff = calculateMortgageBalance(
  propertyPurchasePrice - downPayment,
  mortgageRate,
  mortgageTerm,
  numberOfYears * 12
);
const proceedsFromSale =
  propertySalePrice - propertySalePrice * salesCommissionRate - mortgagePayoff;
// TODO: Tax implications of sale

const cashFlows = calculateCashFlows(
  numberOfYears,
  revenueAnnual,
  rentGrowthRate,
  operatingExpenses,
  inflationRate
);

const npv = calculateNpv(
  discountRate,
  initialInvestment,
  cashFlows,
  proceedsFromSale
);

const irr = calculateIrr(initialInvestment, cashFlows, proceedsFromSale);

// Cash-on-Cash Return for Year 1
const coc = cashFlows[0] / initialInvestment;

// Gross Rent Multiplier for Year 1
const grm = propertyPurchasePrice / (rentMonthly * 12);

// Capitalization Rate for Year 1
// Cap Rate ignores mortgage financing
const capRate = (revenueAnnual - operatingExpenses) / propertyPurchasePrice;

// Debt Service Coverage Ratio
const dscr = (revenueAnnual - operatingExpenses) / mortgageAnnual;

function calculateMortgage(
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

function calculateMortgageBalance(
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

function calculateCashFlows(
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

function calculateNpv(
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

function calculateIrr(
  initialInvestment: number,
  cashFlows: number[],
  proceedsFromSale: number
): number | null {
  const precision = 0.0001;
  let minRate: number = -1;
  let maxRate: number = 1;
  let result: number | null = null;

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

export default function App() {
  const cashFlowTable = cashFlows.map((cf, i) => (
    <tr key={i}>
      <td>Year {i + 1}</td>
      <td>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(cf)}
      </td>
    </tr>
  ));

  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <td>Down Payment</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(downPayment)}
            </td>
          </tr>
          <tr>
            <td>Mortgage (Annual)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(mortgageAnnual)}
            </td>
          </tr>
          <tr>
            <td>Operating Expenses (Annual)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(operatingExpenses)}
            </td>
          </tr>
          <tr>
            <td>Revenue (Annual)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(revenueAnnual)}
            </td>
          </tr>
          <tr>
            <td>Cash Flow</td>
            <td>
              <table>
                <tbody>{cashFlowTable}</tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>Property Value at {numberOfYears} years</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(propertySalePrice)}
            </td>
          </tr>
          <tr>
            <td>Proceeds from Sale</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(proceedsFromSale)}
            </td>
          </tr>
          <tr>
            <td>NPV</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(npv)}
            </td>
          </tr>
          <tr>
            <td>IRR</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(irr)}
            </td>
          </tr>
          <tr>
            <td>Cash-on-Cash Return (Year 1)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(coc)}
            </td>
          </tr>
          <tr>
            <td>Capitalization Rate (Year 1)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(capRate)}
            </td>
          </tr>
          <tr>
            <td>Debt Service Coverage Ratio (Year 1)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(dscr)}
            </td>
          </tr>
          <tr>
            <td>Gross Rent Multiplier (Year 1)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(grm)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
