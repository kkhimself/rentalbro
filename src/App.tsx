import React from "react";
import {
  AppShell,
  Container,
  Grid,
  Paper,
  MantineProvider,
} from "@mantine/core";
import RentalProperty from "./models/RentalProperty";
import PropertyVariables from "./components/PropertyVariables";
import PropertyInsights from "./components/PropertyInsights";
import ScrollTop from "./components/ScrollTop";
import "@mantine/core/styles.css";

export default function App() {
  // Set default values
  const [rentalProperty, setRentalProperty] = React.useState<RentalProperty>(
    new RentalProperty(
      435000, // Purchase Price
      25, // Down Payment Percent
      5.75, // Mortgage Rate
      30, // Mortgage Term
      6200, // Property Taxes
      175, // HOA Fees Monthly
      2000, // Home Insurance
      1000, // Maintenance Costs
      2700, // Rent Monthly
      20, // Average Vacancy
      2, // Rent Growth Rate
      5, // Property Value Growth Rate
      3, // Inflation Rate
      5, // Holding Period
      10, // Discount Rate
      6 // Sales Commission Rate
    )
  );

  const updateRentalProperty = (p: RentalProperty) => {
    setRentalProperty(p);
  };

  return (
    <MantineProvider>
      <div className="App">
        <Container>
          <AppShell padding="xs" header={{ height: 30 }}>
            <AppShell.Main>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Paper shadow="sm" p="xs" radius="md">
                    <PropertyVariables
                      rentalProperty={rentalProperty}
                      updateRentalProperty={updateRentalProperty}
                    />
                  </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Paper shadow="sm" p="xs" radius="md">
                    <PropertyInsights rentalProperty={rentalProperty} />
                  </Paper>
                </Grid.Col>
              </Grid>
            </AppShell.Main>
          </AppShell>
          <ScrollTop />
        </Container>
      </div>
    </MantineProvider>
  );
}
