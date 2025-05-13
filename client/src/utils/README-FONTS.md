# Font Styles Guide

This application uses a centralized font styling system to maintain consistency across all screens and components.

## Font Families

The application uses Gilroy font family with different weights:

- **GilroySemiBold** - For all headings and titles
- **GilroyRegular** - For normal text and paragraphs
- **GilroyMedium** - For emphasized text and buttons

## Using Font Styles

### 1. Direct Import from fontStyles

```tsx
import { headingText, normalText, buttonText, cardTitle, sectionHeading } from '../utils/fontStyles';

// Then use in your component
<Text style={headingText}>This is a heading</Text>
<Text style={normalText}>This is normal text</Text>
```

### 2. Using Preset Text Components

```tsx
import { HeadingText, NormalText, ButtonText } from '../utils/applyFontStyles';

// Then use in your component
<HeadingText>This is a heading</HeadingText>
<NormalText>This is normal text</NormalText>
<ButtonText>This is button text</ButtonText>
```

### 3. Using the HOC Pattern

```tsx
import { withFontStyle } from "../utils/applyFontStyles";
import { headingText } from "../utils/fontStyles";
import { Text } from "react-native";

// Create a new component with heading style
const MyHeading = withFontStyle(Text, headingText);

// Then use in your component
<MyHeading>This is my styled heading</MyHeading>;
```

## Available Styles

The following pre-defined styles are available in `fontStyles.ts`:

### Heading Styles (GilroySemiBold)

- `heading1` - 32px
- `heading2` - 28px
- `heading3` - 24px
- `heading4` - 20px
- `heading5` - 18px

### Body Text Styles (GilroyRegular/Medium)

- `bodyRegular` - 16px, GilroyRegular
- `bodySmall` - 14px, GilroyRegular
- `bodyXSmall` - 12px, GilroyRegular
- `bodyBold` - 16px, GilroyMedium
- `bodySmallBold` - 14px, GilroyMedium

### Component Styles

- `headingText` - GilroySemiBold
- `sectionHeading` - GilroySemiBold
- `normalText` - GilroyRegular
- `buttonText` - GilroyMedium
- `cardTitle` - GilroySemiBold

## Best Practices

1. **Always use the centralized styles** instead of hardcoding font families
2. **Extend existing styles** rather than creating new ones
3. **When creating new components**, use the font styles from this system

## Adding New Font Styles

If you need to add new font styles, add them to the `fontStyles.ts` file to keep everything centralized.
