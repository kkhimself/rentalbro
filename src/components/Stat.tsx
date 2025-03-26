import { ActionIcon, Group, Modal, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";

interface StatProps {
  title: string;
  value: string;
  color?: string;
  description?: string;
}

export default function Stat({ title, value, color, description }: StatProps) {
  const [modalOpened, { open, close }] = useDisclosure(false);

  const actionIcon =
    description != null ? (
      <ActionIcon variant="transparent" size={22} onClick={open}>
        <IconInfoCircle size={24} />
      </ActionIcon>
    ) : null;

  return (
    <>
      <Modal opened={modalOpened} onClose={close} title={title} centered>
        <Text size="sm" dangerouslySetInnerHTML={{__html: description ?? ""}} />
      </Modal>

      <Paper withBorder p="md" radius="md" shadow="xs">
        <Group justify="space-between">
          <Text
            size="xs"
            c="dimmed"
            style={{
              fontSize: "18px",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Text>
          {actionIcon}
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text
            c={color ?? "dark"}
            style={{ fontSize: "24px", fontWeight: "700", lineHeight: "1" }}
          >
            {value}
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
        </Text>
      </Paper>
    </>
  );
}
