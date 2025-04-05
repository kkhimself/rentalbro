import { Accordion, Divider, Grid, Table } from "@mantine/core";
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
            color={
              p.grossReturn > p.discountRateTotalReturn ? "lime" : "orange"
            }
            description={`<p>Total Return measures the overall profit or loss of an investment over a period, considering both income and appreciation, expressed as a percentage of the initial investment. It's a simple way to track growth. On the other hand, IRR takes into account the <b>timing</b> of cash flows, showing the average <b>annual</b> growth rate and helping to understand how quickly your investment is growing. While total return gives a broad picture, IRR provides a more precise measure of investment efficiency.</p> <p>If the Total Return of the rental property exceeds the Total Return of your alternate investments (e.g. investing in the S&P 500), the rental property is a better investment. The Total Return of your alternate investment, over ${
              p.holdingPeriod
            } years, based on your discount rate, is ${(
              p.discountRateTotalReturn * 100
            ).toFixed(2)}% </p>`}
            value={new Intl.NumberFormat("en-US", {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(p.grossReturn)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stat
            title="CAGR"
            color={p.cagr > p.discountRate ? "lime" : "orange"}
            description="CAGR (Compound Annual Growth Rate) measures the average annual growth rate of your total return (cash flow + appreciation) over time. It is a simplified way to understand long-term returns. Unlike IRR, CAGR gives a single average growth rate, ignoring cash flow timing. IRR considers the timing of cash flows, making it a better measure of investment efficiency."
            value={new Intl.NumberFormat("en-US", {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(p.cagr / 100)}
          />
        </Grid.Col>
      </Grid>

      <Divider my="md" />

      <CashFlow cashFlows={p.cashFlows} />

      <Divider my="md" />

      <Accordion variant="separated">
        <Accordion.Item value="advanced-insights">
          <Accordion.Control>Advanced</Accordion.Control>
          <Accordion.Panel>
            <Table striped withRowBorders={false}>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Mortgage loan amount</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(p.loanAmount)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Mortgage (monthly)</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(p.mortgageMonthly)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Mortgage (annual)</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(p.mortgageAnnual)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Property value at {p.holdingPeriod} years</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(p.propertySalePrice)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Mortgage payoff at {p.holdingPeriod} years</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(p.mortgagePayoff)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Sales commission</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(p.propertySalePrice * p.salesCommissionRate / 100)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Proceeds from sale</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(p.proceedsFromSale)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>NPV</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(p.npv)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Cash-on-Cash Return (Year 1)</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "percent",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(p.coc)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Capitalization Rate (Year 1)</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "percent",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(p.capRate)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Debt Service Coverage Ratio (Year 1)</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(p.dscr)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Gross Rent Multiplier (Year 1)</Table.Td>
                  <Table.Td>
                    {new Intl.NumberFormat("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(p.grm)}
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
