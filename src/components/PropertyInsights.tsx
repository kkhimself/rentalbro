import RentalProperty from "../models/RentalProperty";
import CashFlow from "./CashFlow";

interface PropertyInsightsProps {
  rentalProperty: RentalProperty;
}

export default function PropertyInsights({ rentalProperty }: PropertyInsightsProps) {

  const p = rentalProperty;
  
  return (
    <div>
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
    </div>
  );
}
