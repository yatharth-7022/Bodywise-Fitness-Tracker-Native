import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui, createTokens, createFont } from "tamagui";

// Define the custom fonts
const bebasNeue = createFont({
  family: "Montserrat",
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 48,
    12: 56,
    13: 64,
    14: 72,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 22,
    4: 24,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 44,
    10: 48,
    11: 56,
    12: 64,
    13: 72,
    14: 80,
  },
  weight: {
    4: "400",
  },
  letterSpacing: {
    4: 0,
  },
});

const dmSans = createFont({
  family: "DMSans",
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 48,
    12: 56,
    13: 64,
    14: 72,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 26,
    5: 30,
    6: 36,
    7: 40,
    8: 44,
    9: 48,
    10: 54,
    11: 62,
    12: 70,
    13: 78,
    14: 86,
  },
  weight: {
    1: "300",
    4: "400",
    6: "500",
    7: "600",
    8: "700",
  },
  letterSpacing: {
    4: 0,
  },
});

// You can customize the theme tokens if needed
const tokens = createTokens({
  ...defaultConfig.tokens,
  // You can add custom tokens here if needed
});

// Create the Tamagui configuration with default and custom fonts
const fonts = {
  ...defaultConfig.fonts,
  heading: bebasNeue,
  body: dmSans,
};

// Create the Tamagui configuration
export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens,
  fonts,
  // Using Tamagui's default themes
  themes: defaultConfig.themes,
  // Default animations
  animations: defaultConfig.animations,
  // Shorthand values
  shorthands: defaultConfig.shorthands,
});

// Export it for usage
export default tamaguiConfig;

// Export type of config for usage with TypeScript
export type Conf = typeof tamaguiConfig;

// Make your configuration available to auto-completion in your app
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
