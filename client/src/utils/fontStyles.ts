import { StyleSheet } from "react-native";

export const fontStyles = StyleSheet.create({
  // Montserrat Heading Styles
  heading1: {
    fontFamily: "Montserrat",
    fontSize: 32,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  heading2: {
    fontFamily: "Montserrat",
    fontSize: 28,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  heading3: {
    fontFamily: "Montserrat",
    fontSize: 24,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  heading4: {
    fontFamily: "Montserrat",
    fontSize: 20,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  heading5: {
    fontFamily: "Montserrat",
    fontSize: 18,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },

  // DM Sans Styles
  bodyRegular: {
    fontFamily: "DMSans",
    fontSize: 16,
  },
  bodySmall: {
    fontFamily: "DMSans",
    fontSize: 14,
  },
  bodyXSmall: {
    fontFamily: "DMSans",
    fontSize: 12,
  },
  bodyBold: {
    fontFamily: "DMSans",
    fontWeight: "bold",
    fontSize: 16,
  },
  bodySmallBold: {
    fontFamily: "DMSans",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Common component styles for consistency
  headingText: {
    fontFamily: "Montserrat",
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  sectionHeading: {
    fontFamily: "Montserrat",
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  normalText: {
    fontFamily: "DMSans",
  },
  buttonText: {
    fontFamily: "DMSans",
    fontWeight: "bold",
  },
  cardTitle: {
    fontFamily: "Montserrat",
    letterSpacing: 0.5,
    fontWeight: "bold",
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
