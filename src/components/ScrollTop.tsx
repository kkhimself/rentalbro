import { ActionIcon, Affix, Tooltip, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

export default function ScrollTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Tooltip label="Scroll to top">
            <ActionIcon
              size={42}
              variant="light"
              aria-label="Scroll to top"
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              <IconArrowUp size={24} />
            </ActionIcon>
          </Tooltip>
        )}
      </Transition>
    </Affix>
  );
}
