import "@mantine/core/styles.css";
import {
  AppShell,
  Center,
  NumberInput,
  Table,
  MantineProvider,
} from "@mantine/core";
import { useForm } from "@mantine/form";

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

export default function App() {
  const form = useForm({
    initialValues: {
      purchasePrice: 435000,
      downPaymentPercent: 25,
      mortgageRate: 5.75,
      mortgageTerm: 30, // Years
      propertyTaxes: 6200, // Annual
      hoaFeesMonthly: 175, // Monthly
      homeInsurance: 2000, // Annual
      maintenanceCosts: 1000, // Annual
      rentMonthly: 2700,
      averageVacancy: 20, // Days per Year
      rentGrowthRate: 2, // Annual
      propertyValueGrowthRate: 5, // Annual
      inflationRate: 3, // Annual, for insurance, maintenance etc.
      holdingPeriod: 5, // How long to keep the property
      discountRate: 10, // Average long-term return of S&P 500
      salesCommissionRate: 6, // Real estate agent's commission for selling property
    },
    // TODO: Validate input
  });

  // Purchase costs
  const propertyPurchasePrice = form.getValues().purchasePrice;
  const downPaymentPercent = form.getValues().downPaymentPercent / 100;
  const downPayment = propertyPurchasePrice * downPaymentPercent;
  const initialInvestment = downPayment;
  // TODO: Add closing cost, renovation etc.

  // Mortgage
  const mortgageRate = form.getValues().mortgageRate / 100;
  const mortgageTerm = form.getValues().mortgageTerm; // Years
  const mortgage = calculateMortgage(
    propertyPurchasePrice - downPayment,
    mortgageRate,
    mortgageTerm
  ); // Monthly
  const mortgageAnnual = mortgage * 12;
  // TODO: Tax benefits of mortgage

  // Operating expenses
  const propertyTaxes = form.getValues().propertyTaxes; // Annual
  const hoaFeesMonthly = form.getValues().hoaFeesMonthly; // Monthly
  const hoaFeesAnnual = hoaFeesMonthly * 12; // Annual
  const homeInsurance = form.getValues().homeInsurance; // Annual
  const maintenanceCosts = form.getValues().maintenanceCosts; // Annual
  const operatingExpenses =
    propertyTaxes + hoaFeesAnnual + homeInsurance + maintenanceCosts; // Annual
  // TODO: Any tax benefits?

  // Revenues
  const rentMonthly = form.getValues().rentMonthly;
  const averageVacancy = form.getValues().averageVacancy; // Days per Year
  const vacancyRate = averageVacancy / 365;
  const revenueAnnual = rentMonthly * 12 * (1 - vacancyRate);
  // TODO: Tax on rental income?

  // Growth rate
  const rentGrowthRate = form.getValues().rentGrowthRate / 100; // Annual
  const propertyValueGrowthRate =
    form.getValues().propertyValueGrowthRate / 100; // Annual
  const inflationRate = form.getValues().inflationRate / 100; // Annual, for insurance, maintenance etc.

  // How long to keep the property
  const holdingPeriod = form.getValues().holdingPeriod;
  const discountRate = form.getValues().discountRate / 100; // Average long-term return of S&P 500

  // Sale of property
  const propertySalePrice =
    propertyPurchasePrice *
    Math.pow(1 + propertyValueGrowthRate, holdingPeriod); // TODO: numberOfYears - 1?
  const salesCommissionRate = form.getValues().salesCommissionRate / 100;
  const mortgagePayoff = calculateMortgageBalance(
    propertyPurchasePrice - downPayment,
    mortgageRate,
    mortgageTerm,
    holdingPeriod * 12
  );
  const proceedsFromSale =
    propertySalePrice -
    propertySalePrice * salesCommissionRate -
    mortgagePayoff;
  // TODO: Tax implications of sale

  const cashFlows = calculateCashFlows(
    mortgageAnnual,
    holdingPeriod,
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

  const cashFlowRows = cashFlows.map((cf, i) => (
    <Table.Tr key={i}>
      <Table.Td>Year {i + 1}</Table.Td>
      <Table.Td>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(cf)}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <MantineProvider>
      <AppShell padding="md">
        <AppShell.Main>
          <Center>
            <div className="App">
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <NumberInput
                  label="Purchase Price"
                  prefix="$"
                  thousandSeparator=","
                  hideControls
                  key={form.key("purchasePrice")}
                  {...form.getInputProps("purchasePrice")}
                />
                <NumberInput
                  label="Mortgage Down Payment"
                  description={new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(downPayment)}
                  suffix="%"
                  min={0}
                  max={100}
                  step={5}
                  key={form.key("downPaymentPercent")}
                  {...form.getInputProps("downPaymentPercent")}
                />
                <NumberInput
                  label="Mortgate Interest Rate"
                  suffix="%"
                  min={0}
                  max={20}
                  step={0.125}
                  key={form.key("mortgageRate")}
                  {...form.getInputProps("mortgageRate")}
                />
                <NumberInput
                  label="Mortgage Loan Term (Years)"
                  min={0}
                  max={50}
                  step={5}
                  key={form.key("mortgageTerm")}
                  {...form.getInputProps("mortgageTerm")}
                />
                <NumberInput
                  label="Property Taxes (Yearly)"
                  prefix="$"
                  thousandSeparator=","
                  hideControls
                  key={form.key("propertyTaxes")}
                  {...form.getInputProps("propertyTaxes")}
                />
                <NumberInput
                  label="HOA Fees (Monthly)"
                  prefix="$"
                  thousandSeparator=","
                  hideControls
                  key={form.key("hoaFeesMonthly")}
                  {...form.getInputProps("hoaFeesMonthly")}
                />
                <NumberInput
                  label="Home Insurance (Yearly)"
                  prefix="$"
                  thousandSeparator=","
                  hideControls
                  key={form.key("homeInsurance")}
                  {...form.getInputProps("homeInsurance")}
                />
                <NumberInput
                  label="Maintenance Costs (Yearly)"
                  prefix="$"
                  thousandSeparator=","
                  hideControls
                  key={form.key("maintenanceCosts")}
                  {...form.getInputProps("maintenanceCosts")}
                />
                <NumberInput
                  label="Rent (Monthly)"
                  prefix="$"
                  thousandSeparator=","
                  hideControls
                  key={form.key("rentMonthly")}
                  {...form.getInputProps("rentMonthly")}
                />
                <NumberInput
                  label="Vacancy Rate (Days per Year)"
                  min={0}
                  max={366}
                  step={10}
                  key={form.key("averageVacancy")}
                  {...form.getInputProps("averageVacancy")}
                />
                <NumberInput
                  label="Rental Growth Rate"
                  suffix="%"
                  min={0}
                  max={50}
                  step={0.5}
                  key={form.key("rentGrowthRate")}
                  {...form.getInputProps("rentGrowthRate")}
                />
                <NumberInput
                  label="Property Appreciation Rate"
                  suffix="%"
                  min={0}
                  max={50}
                  step={0.5}
                  key={form.key("propertyValueGrowthRate")}
                  {...form.getInputProps("propertyValueGrowthRate")}
                />
                <NumberInput
                  label="Inflation Rate"
                  suffix="%"
                  min={0}
                  max={25}
                  step={0.5}
                  key={form.key("inflationRate")}
                  {...form.getInputProps("inflationRate")}
                />
                <NumberInput
                  label="Discount Rate"
                  suffix="%"
                  description="Opportunity cost of capital or the expected return from alternative investments, such as average returns of the S&P 500 stock market index"
                  min={0}
                  max={25}
                  step={0.5}
                  key={form.key("discountRate")}
                  {...form.getInputProps("discountRate")}
                />
                <NumberInput
                  label="Holding Period (Years)"
                  description="Duration of time you will own the property before selling it"
                  min={0}
                  max={50}
                  step={5}
                  key={form.key("holdingPeriod")}
                  {...form.getInputProps("holdingPeriod")}
                />
                <NumberInput
                  label="Real Estate Agent's Commission"
                  suffix="%"
                  min={0}
                  max={25}
                  step={0.5}
                  key={form.key("salesCommissionRate")}
                  {...form.getInputProps("salesCommissionRate")}
                />
              </form>

              <table>
                <tbody>
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
                    <td>Property Value at {holdingPeriod} years</td>
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
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Year</Table.Th>
                    <Table.Th>Cash Flow</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{cashFlowRows}</Table.Tbody>
              </Table>
            </div>
          </Center>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
