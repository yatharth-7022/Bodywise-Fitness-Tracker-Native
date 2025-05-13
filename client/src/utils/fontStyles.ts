import { StyleSheet } from "react-native";

export const fontStyles = StyleSheet.create({
  // Gilroy Heading Styles
  heading1: {
    fontFamily: "GilroySemiBold",
    fontSize: 32,
    letterSpacing: 0.5,
  },
  heading2: {
    fontFamily: "GilroySemiBold",
    fontSize: 28,
    letterSpacing: 0.5,
  },
  heading3: {
    fontFamily: "GilroySemiBold",
    fontSize: 24,
    letterSpacing: 0.5,
  },
  heading4: {
    fontFamily: "GilroySemiBold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  heading5: {
    fontFamily: "GilroySemiBold",
    fontSize: 18,
    letterSpacing: 0.5,
  },

  // Gilroy Body Styles
  bodyRegular: {
    fontFamily: "GilroyRegular",
    fontSize: 16,
  },
  bodySmall: {
    fontFamily: "GilroyRegular",
    fontSize: 14,
  },
  bodyXSmall: {
    fontFamily: "GilroyRegular",
    fontSize: 12,
  },
  bodyBold: {
    fontFamily: "GilroyMedium",
    fontSize: 16,
  },
  bodySmallBold: {
    fontFamily: "GilroyMedium",
    fontSize: 14,
  },

  // Common component styles for consistency
  headingText: {
    fontFamily: "GilroySemiBold",
    letterSpacing: 0.5,
  },
  sectionHeading: {
    fontFamily: "GilroySemiBold",
    letterSpacing: 0.5,
  },
  normalText: {
    fontFamily: "GilroyRegular",
  },
  buttonText: {
    fontFamily: "GilroyMedium",
  },
  cardTitle: {
    fontFamily: "GilroySemiBold",
    letterSpacing: 0.5,
  },
});

// Export individual styles for easier imports
export const {
  headingText,
  sectionHeading,
  normalText,
  buttonText,
  cardTitle,
} = fontStyles;
