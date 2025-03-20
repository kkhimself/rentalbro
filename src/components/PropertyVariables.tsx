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
          values.mortgageRate / 100,
          values.mortgageTerm,
          values.propertyTaxesAnnual,
          values.hoaFeesMonthly,
          values.homeInsuranceAnnual,
          values.maintenanceCostsAnnual,
          values.rentMonthly,
          values.averageVacancy,
          values.rentGrowthRate / 100,
          values.propertyValueGrowthRate / 100,
          values.inflationRate / 100,
          values.holdingPeriod,
          values.discountRate / 100,
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
        key={form.key("propertyTaxesAnnual")}
        {...form.getInputProps("propertyTaxesAnnual")}
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
        key={form.key("homeInsuranceAnnual")}
        {...form.getInputProps("homeInsuranceAnnual")}
      />
      <NumberInput
        label="Maintenance Costs (Yearly)"
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
  );
}
