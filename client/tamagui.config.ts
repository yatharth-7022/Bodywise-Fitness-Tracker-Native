import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui, createTokens } from 'tamagui'

// You can customize the theme tokens if needed
const tokens = createTokens({
  ...defaultConfig.tokens,
  // You can add custom tokens here if needed
})

// Create the Tamagui configuration
export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens,
  // Using Tamagui's default themes
  themes: defaultConfig.themes,
  // Default animations
  animations: defaultConfig.animations,
  // Shorthand values
  shorthands: defaultConfig.shorthands,
})

// Export it for usage
export default tamaguiConfig

// Export type of config for usage with TypeScript
export type Conf = typeof tamaguiConfig

// Make your configuration available to auto-completion in your app
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
} 