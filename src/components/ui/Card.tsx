// components/ui/Card.tsx
import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export const Card = ({ children, className, style }: CardProps) => {
  return (
    <View
      className={twMerge("bg-zinc-900 border-zinc-800 rounded-lg overflow-hidden", className)}
      style={style}
    >
      {children}
    </View>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <View className={twMerge("p-4", className)}>
      {children}
    </View>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <View className={twMerge("p-4 pt-0", className)}>
      {children}
    </View>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <Text className={twMerge("text-lg font-semibold text-white", className)}>
      {children}
    </Text>
  );
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription = ({ children, className }: CardDescriptionProps) => {
  return (
    <Text className={twMerge("text-sm text-zinc-400", className)}>
      {children}
    </Text>
  );
};