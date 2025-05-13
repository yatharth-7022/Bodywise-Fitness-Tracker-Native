import React from "react";
import { Text, TextProps } from "react-native";
import { headingText, normalText } from "./fontStyles";

/**
 * Create a text component with heading style
 */
export const HeadingText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[headingText, style]} {...props} />;
};

/**
 * Create a text component with normal style
 */
export const NormalText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[normalText, style]} {...props} />;
};

export const ButtonText: React.FC<TextProps> = ({ style, ...props }) => {
  return (
    <Text style={[normalText, { fontWeight: "bold" }, style]} {...props} />
  );
};

export const CardTitleText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[headingText, style]} {...props} />;
};

/**
 * This HOC adds font styles to components
 * Pass the component and the style to apply
 */
export function withFontStyle<P extends { style?: any }>(
  Component: React.ComponentType<P>,
  fontStyle: object
): React.FC<P> {
  return (props: P) => {
    const { style, ...rest } = props;
    return <Component style={[fontStyle, style]} {...(rest as any)} />;
  };
}
