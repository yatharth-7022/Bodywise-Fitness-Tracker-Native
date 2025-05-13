# Font Styles Guide

This application uses a centralized font styling system to maintain consistency across all screens and components.

## Font Families

The application uses two main font families:

- **Montserrat** - For all headings and titles
- **DMSans** - For all normal text, paragraphs, and labels

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

### Heading Styles (Montserrat)

- `heading1` - 32px
- `heading2` - 28px
- `heading3` - 24px
- `heading4` - 20px
- `heading5` - 18px

### Body Text Styles (DMSans)

- `bodyRegular` - 16px
- `bodySmall` - 14px
- `bodyXSmall` - 12px
- `bodyBold` - 16px, bold
- `bodySmallBold` - 14px, bold

### Component Styles

- `headingText` - Montserrat, bold
- `sectionHeading` - Montserrat, bold
- `normalText` - DMSans
- `buttonText` - DMSans, bold
- `cardTitle` - Montserrat, bold

## Best Practices

1. **Always use the centralized styles** instead of hardcoding font families
2. **Extend existing styles** rather than creating new ones
3. **When creating new components**, use the font styles from this system

## Adding New Font Styles

If you need to add new font styles, add them to the `fontStyles.ts` file to keep everything centralized.
