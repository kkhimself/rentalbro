import { Grid } from "@mantine/core";
import RentalProperty from "../models/RentalProperty";
import CashFlow from "./CashFlow";
import Stat from "./Stat";

interface PropertyInsightsProps {
  rentalProperty: RentalProperty;
}

export default function PropertyInsights({
  rentalProperty,
}: PropertyInsightsProps) {
  const p = rentalProperty;

  return (
    <div>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stat
            title="IRR"
            color={p.irr > p.discountRate ? "lime" : "orange"}
            description="Internal Rate of Return (IRR) measures the annualized return on your real estate investment by analyzing projected cash flows, including rental income, expenses, and the future sale price. A higher IRR indicates a more attractive investment. If IRR exceeds your discount rate (the return you'd expect from investing in the S&P 500), the rental property is a better investment than simply investing in the stock market."
            value={new Intl.NumberFormat("en-US", {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(p.irr / 100)}
          />
        </Grid.Col>
        {/* <Grid.Col span={{ base: 12, md: 6 }}>
          <Stat
            title="Cash Flow"
            color={p.cashFlows[0] > 0 ? "lime" : "orange"}
            description="Cash flow is the money left over each month or year after collecting rent and paying all expenses, including mortgage payments, property taxes, insurance, and maintenance. Cash flow is crucial because it determines whether the property is profitable or a financial burden. Positive cash flow means the investment generates income, while negative cash flow means the investor may need to cover shortfalls out of pocket. Consistent positive cash flow provides financial stability, helps pay down debt, and can be reinvested into more properties to build wealth."
            value={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(p.cashFlows[0])}
          />
        </Grid.Col> */}
      </Grid>

      <table>
        <tbody>
          <tr>
            <td>Mortgage (Annual)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(p.mortgageAnnual)}
            </td>
          </tr>
          <tr>
            <td>Operating Expenses (Annual)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(p.operatingExpensesAnnual)}
            </td>
          </tr>
          <tr>
            <td>Revenue (Annual)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(p.revenueAnnual)}
            </td>
          </tr>
          <tr>
            <td>Property Value at {p.holdingPeriod} years</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(p.propertySalePrice)}
            </td>
          </tr>
          <tr>
            <td>Proceeds from Sale</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(p.proceedsFromSale)}
            </td>
          </tr>
          <tr>
            <td>NPV</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(p.npv)}
            </td>
          </tr>
          <tr>
            <td>IRR</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(p.irr)}
            </td>
          </tr>
          <tr>
            <td>Cash-on-Cash Return (Year 1)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(p.coc)}
            </td>
          </tr>
          <tr>
            <td>Capitalization Rate (Year 1)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(p.capRate)}
            </td>
          </tr>
          <tr>
            <td>Debt Service Coverage Ratio (Year 1)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(p.dscr)}
            </td>
          </tr>
          <tr>
            <td>Gross Rent Multiplier (Year 1)</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(p.grm)}
            </td>
          </tr>
        </tbody>
      </table>

      <CashFlow cashFlows={p.cashFlows} />

      {/* <div>
        {JSON.stringify(p, null, 2)}
        {JSON.stringify({irr: p.irr}, null, 2)}
      </div> */}
    </div>
  );
}
