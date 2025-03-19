import { Table } from "@mantine/core";

interface CashFlowProps {
  cashFlows: number[];
}

export default function CashFlow({ cashFlows }: CashFlowProps) {
  const cashFlowRows = cashFlows.map((cf, i: number) => (
    <Table.Tr key={i}>
      <Table.Td>Year {i + 1}</Table.Td>
      <Table.Td>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(cf)}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Cash Flow</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{cashFlowRows}</Table.Tbody>
      </Table>
    </div>
  );
}
