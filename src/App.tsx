import "@mantine/core/styles.css";
import { AppShell, Center, NumberInput, MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import RentalProperty from "./models/RentalProperty";
import PropertyInsights from "./components/PropertyInsights";

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

  const rentalProperty = new RentalProperty(
    form.getValues().purchasePrice,
    form.getValues().downPaymentPercent / 100,
    form.getValues().mortgageRate / 100,
    form.getValues().mortgageTerm,
    form.getValues().propertyTaxes,
    form.getValues().hoaFeesMonthly,
    form.getValues().homeInsurance,
    form.getValues().maintenanceCosts,
    form.getValues().rentMonthly,
    form.getValues().averageVacancy,
    form.getValues().rentGrowthRate / 100,
    form.getValues().propertyValueGrowthRate / 100,
    form.getValues().inflationRate / 100,
    form.getValues().holdingPeriod,
    form.getValues().discountRate / 100,
    form.getValues().salesCommissionRate / 100
  );

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
                  }).format(rentalProperty.downPayment)}
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

              <PropertyInsights p={rentalProperty} />
            </div>
          </Center>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
