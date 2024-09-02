import { memo } from "react";

import {
  DefaultMantineColor,
  RingProgress as _RingProgress,
  RingProgressProps as _RingProgressProps,
  Text,
} from "@mantine/core";

export type RingProgressProps = {
  value: number;
  color: DefaultMantineColor;
  label: string;
} & Omit<_RingProgressProps, "sections">;

export const RingProgress = memo(
  ({ value, color, label, ...props }: RingProgressProps) => {
    return (
      <_RingProgress
        label={
          <Text size="lg" fw="bold" ta="center">
            {label}
          </Text>
        }
        sections={[{ value, color }]}
        {...props}
      />
    );
  }
);
