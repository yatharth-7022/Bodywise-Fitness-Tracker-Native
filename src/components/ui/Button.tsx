// components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  textClassName = '',
  disabled = false,
  loading = false,
  onPress,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}: ButtonProps) => {
  // Base styles based on variant
  const getVariantStyles = (variant: ButtonVariant) => {
    switch (variant) {
      case 'default':
        return 'bg-primary';
      case 'destructive':
        return 'bg-red-500';
      case 'outline':
        return 'bg-transparent border border-zinc-700';
      case 'secondary':
        return 'bg-zinc-800';
      case 'ghost':
        return 'bg-transparent';
      case 'link':
        return 'bg-transparent p-0';
      default:
        return 'bg-primary';
    }
  };

  // Text color based on variant
  const getTextColorStyles = (variant: ButtonVariant) => {
    switch (variant) {
      case 'default':
        return 'text-black';
      case 'destructive':
        return 'text-white';
      case 'outline':
        return 'text-white';
      case 'secondary':
        return 'text-white';
      case 'ghost':
        return 'text-white';
      case 'link':
        return 'text-primary underline';
      default:
        return 'text-black';
    }
  };

  // Size styles
  const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
      case 'default':
        return 'h-10 px-4 py-2';
      case 'sm':
        return 'h-8 px-3 py-1 text-xs';
      case 'lg':
        return 'h-12 px-8 py-3';
      case 'icon':
        return 'h-10 w-10 p-2';
      default:
        return 'h-10 px-4 py-2';
    }
  };

  // Combined button styles
  const buttonStyles = twMerge(
    clsx(
      'flex-row items-center justify-center rounded-md',
      getVariantStyles(variant),
      getSizeStyles(size),
      disabled ? 'opacity-50' : '',
      className
    )
  );

  // Text styles
  const textStyles = twMerge(
    clsx(
      'font-medium',
      getTextColorStyles(variant),
      textClassName
    )
  );

  return (
    <TouchableOpacity
      className={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      style={style}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'default' ? '#000' : '#fff'} />
      ) : (
        <>
          {icon && iconPosition === 'left' && <>{icon}</>}
          <Text className={textStyles} style={textStyle}>{children}</Text>
          {icon && iconPosition === 'right' && <>{icon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};