/// <reference types="nativewind/types" />

import type {
  ViewProps,
  TextProps,
  TextInputProps,
  ImageProps,
  PressableProps,
  TouchableOpacityProps,
} from "react-native";
import type { AnimateProps } from "react-native-reanimated";

declare module "react-native" {
  interface ViewProps {
    className?: string;
  }

  interface TextProps {
    className?: string;
  }

  interface TextInputProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }

  interface TouchableOpacityProps {
    className?: string;
  }

  interface PressableProps {
    className?: string;
  }
}

declare module "react-native-reanimated" {
  interface AnimateProps<P extends object> {
    className?: string;
  }
}
