import {
  createTheme,
  DefaultMantineColor,
  MantineThemeOverride,
} from "@mantine/core";

const fontFamily = "Ubuntu";
const primaryColor: DefaultMantineColor = "indigo";

export const theme: MantineThemeOverride = createTheme({
  primaryColor,
  fontFamily,
  headings: { fontFamily },
  defaultGradient: {
    deg: 45,
    from: primaryColor,
    to: `${primaryColor}.4`,
  },
  components: {
    LoadingOverlay: {
      defaultProps: { overlayProps: { blur: 1 } },
    },
    Loader: {
      defaultProps: { type: "dots" },
    },
    Tooltip: {
      defaultProps: {
        events: { hover: true, focus: true, touch: true },
      },
    },
  },
});
