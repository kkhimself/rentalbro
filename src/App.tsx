import React from "react";
import {
  createTheme,
  AppShell,
  ActionIcon,
  Container,
  Grid,
  Group,
  Paper,
  Text,
  MantineProvider
} from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { IconBrandGithub } from '@tabler/icons-react';
import RentalProperty from "./models/RentalProperty";
import PropertyVariables from "./components/PropertyVariables";
import PropertyInsights from "./components/PropertyInsights";
import ScrollTop from "./components/ScrollTop";
import "@mantine/core/styles.css";

export default function App() {
  const pinned = useHeadroom({ fixedAt: 60 });

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
      10, // Holding Period
      10, // Discount Rate
      6 // Sales Commission Rate
    )
  );

  const theme = createTheme({
    primaryColor: "gray"
  });

  const updateRentalProperty = (p: RentalProperty) => {
    setRentalProperty(p);
  };

  const openGitHub = () => {
    window.open("https://github.com/kkhimself/rentalbro");
  };

  return (
    <MantineProvider theme={theme}>
      <div className="App">
        <AppShell
          padding="xs"
          header={{ height: 30, collapsed: !pinned, offset: false }}
        >
          <AppShell.Header>
            <Container>
              <Group justify="space-between">
                <div style={{margin: "auto"}}><Text fw={700}>RENTAL BRO</Text></div>
                <ActionIcon variant="subtle" aria-label="GitHub" onClick={openGitHub}>
                  <IconBrandGithub style={{ width: '80%', height: '80%' }} />
                </ActionIcon>
              </Group>
            </Container>
          </AppShell.Header>
          <AppShell.Main pt="40">
            <Container>
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
            </Container>
          </AppShell.Main>
        </AppShell>
        <ScrollTop />
      </div>
    </MantineProvider>
  );
}
