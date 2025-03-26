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
            description="Internal Rate of Return (IRR) measures the <b>annualized</b> return on your real estate investment by analyzing projected cash flows, including rental income, expenses, and the future sale price. A higher IRR indicates a more attractive investment. If IRR exceeds your discount rate (the return you'd expect from investing in the S&P 500), the rental property is a better investment than simply investing in the stock market."
            value={new Intl.NumberFormat("en-US", {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(p.irr / 100)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stat
            title="Total Return"
            color={p.totalReturn > 0 ? "lime" : "orange"}
            description="Total Return measures the overall profit or loss of an investment over a period, considering both income and appreciation, expressed as a percentage of the initial investment. It's a simple way to track growth. On the other hand, IRR takes into account the <b>timing</b> of cash flows, showing the average <b>annual</b> growth rate and helping to understand how quickly your investment is growing. While total return gives a broad picture, IRR provides a more precise measure of investment efficiency."
            value={new Intl.NumberFormat("en-US", {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(p.totalReturn)}
          />
        </Grid.Col>
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
