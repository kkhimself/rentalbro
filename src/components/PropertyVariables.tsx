import { NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import RentalProperty from "../models/RentalProperty";

interface PropertyVariablesProps {
  rentalProperty: RentalProperty;
  updateRentalProperty: (p: RentalProperty) => void;
}

export default function PropertyVariables({
  rentalProperty,
  updateRentalProperty,
}: PropertyVariablesProps) {

  const p = rentalProperty;

  const form = useForm({
    initialValues: {
      propertyPurchasePrice: p.propertyPurchasePrice,
      downPaymentPercent: p.downPaymentPercent,
      mortgageRate: p.mortgageRate,
      mortgageTerm: p.mortgageTerm,
      propertyTaxesAnnual: p.propertyTaxesAnnual,
      hoaFeesMonthly: p.hoaFeesMonthly,
      homeInsuranceAnnual: p.homeInsuranceAnnual,
      maintenanceCostsAnnual: p.maintenanceCostsAnnual,
      rentMonthly: p.rentMonthly,
      averageVacancy: p.averageVacancy,
      rentGrowthRate: p.rentGrowthRate,
      propertyValueGrowthRate: p.propertyValueGrowthRate,
      inflationRate: p.inflationRate,
      holdingPeriod: p.holdingPeriod,
      discountRate: p.discountRate,
      salesCommissionRate: p.salesCommissionRate,
    },
    
    onValuesChange: (values) => {
      updateRentalProperty(
        new RentalProperty(
          values.propertyPurchasePrice,
          values.downPaymentPercent,
          values.mortgageRate,
          values.mortgageTerm,
          values.propertyTaxesAnnual,
          values.hoaFeesMonthly,
          values.homeInsuranceAnnual,
          values.maintenanceCostsAnnual,
          values.rentMonthly,
          values.averageVacancy,
          values.rentGrowthRate,
          values.propertyValueGrowthRate,
          values.inflationRate,
          values.holdingPeriod,
          values.discountRate,
          values.salesCommissionRate
        )
      );
    },
    // TODO: Validate input
  });

  return (
    <form>
      <NumberInput
        label="Purchase Price"
        prefix="$"
        thousandSeparator=","
        hideControls
        key={form.key("propertyPurchasePrice")}
        {...form.getInputProps("propertyPurchasePrice")}
      />
      <NumberInput
        label="Mortgage Down Payment"
        description={new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(p.downPayment)}
        suffix="%"
        min={0}
        max={100}
        step={5}
        key={form.key("downPaymentPercent")}
        {...form.getInputProps("downPaymentPercent")}
      />
      <NumberInput
        label="Mortgage Interest Rate"
        description="Annual interest rate on the mortgage loan."
        suffix="%"
        min={0}
        max={20}
        step={0.125}
        key={form.key("mortgageRate")}
        {...form.getInputProps("mortgageRate")}
      />
      <NumberInput
        label="Mortgage Loan Term (Years)"
        description="Duration of the mortgage loan. Common terms are 15, 20, or 30 years."
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
        key={form.key("propertyTaxesAnnual")}
        {...form.getInputProps("propertyTaxesAnnual")}
      />
      <NumberInput
        label="HOA Fees (Monthly)"
        description="Homeowner's Association fees."
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
        key={form.key("homeInsuranceAnnual")}
        {...form.getInputProps("homeInsuranceAnnual")}
      />
      <NumberInput
        label="Maintenance Costs (Yearly)"
        description="Cost of repairs, maintenance, and improvements."
        prefix="$"
        thousandSeparator=","
        hideControls
        key={form.key("maintenanceCostsAnnual")}
        {...form.getInputProps("maintenanceCostsAnnual")}
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
        description="Number of days the property may be vacant per year. Average is 10-30 days per year."
        min={0}
        max={366}
        step={10}
        key={form.key("averageVacancy")}
        {...form.getInputProps("averageVacancy")}
      />
      <NumberInput
        label="Rent Growth Rate"
        description="Annual growth rate of rent. Average is 1-3.5% per year in the US."
        suffix="%"
        min={0}
        max={50}
        step={0.5}
        key={form.key("rentGrowthRate")}
        {...form.getInputProps("rentGrowthRate")}
      />
      <NumberInput
        label="Property Appreciation Rate"
        description="Annual growth rate of property value. Average is 2.5-5% per year in the US."
        suffix="%"
        min={0}
        max={50}
        step={0.5}
        key={form.key("propertyValueGrowthRate")}
        {...form.getInputProps("propertyValueGrowthRate")}
      />
      <NumberInput
        label="Inflation Rate"
        description="Annual rate of inflation for insurance, maintenance, and other expenses. Average is 2-3% per year in the US."
        suffix="%"
        min={0}
        max={25}
        step={0.5}
        key={form.key("inflationRate")}
        {...form.getInputProps("inflationRate")}
      />
      <NumberInput
        label="Discount Rate"
        description="Opportunity cost of capital or the expected return from alternative investments, such as average returns of the S&P 500 stock market index."
        suffix="%"        
        min={0}
        max={25}
        step={0.5}
        key={form.key("discountRate")}
        {...form.getInputProps("discountRate")}
      />
      <NumberInput
        label="Holding Period (Years)"
        description="Duration of time you will own the property before selling it."
        min={0}
        max={50}
        step={5}
        key={form.key("holdingPeriod")}
        {...form.getInputProps("holdingPeriod")}
      />
      <NumberInput
        label="Real Estate Agent's Commission"
        description="Percentage of the property sale price that goes to the real estate agent when selling the property. Average is 5-6% in the US."
        suffix="%"
        min={0}
        max={25}
        step={0.5}
        key={form.key("salesCommissionRate")}
        {...form.getInputProps("salesCommissionRate")}
      />
    </form>
  );
}
