import { Table } from "@mantine/core";
import { CashFlowItem } from "../utils/RentalMetrics";

interface CashFlowProps {
  cashFlows: CashFlowItem[];
}

export default function CashFlow({ cashFlows }: CashFlowProps) {
  const cashFlowRows = cashFlows.map((cf, i: number) => (
    <Table.Tr key={i}>
      <Table.Td style={{textAlign: "right"}}>{i + 1}</Table.Td>
      <Table.Td style={{textAlign: "right"}}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0
        }).format(cf.income)}
      </Table.Td>
      <Table.Td style={{textAlign: "right"}}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0
        }).format(cf.expense)}
      </Table.Td>
      <Table.Td style={{textAlign: "right", color: cf.cashFlow > 0 ? "LimeGreen" : "OrangeRed"}}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0
        }).format(cf.cashFlow)}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table striped withRowBorders={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{textAlign: "right"}}>Year</Table.Th>
            <Table.Th style={{textAlign: "right"}}>Income</Table.Th>
            <Table.Th style={{textAlign: "right"}}>Expense</Table.Th>
            <Table.Th style={{textAlign: "right"}}>Cash Flow</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{cashFlowRows}</Table.Tbody>
      </Table>
    </div>
  );
}
