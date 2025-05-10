declare module "react-native-reanimated" {
  import {
    ViewStyle,
    View,
    TextStyle,
    Text,
    ImageStyle,
    Image,
    ScrollViewProps,
    FlatListProps,
  } from "react-native";

  export function useSharedValue<T>(initialValue: T): { value: T };
  export function useAnimatedStyle<T extends ViewStyle>(updater: () => T): T;
  export function withSpring<T>(toValue: T, config?: any): T;
  export function withTiming<T>(toValue: T, config?: any): T;

  type AnimateProps<Props extends object> = {
    [K in keyof Props]: Props[K] extends ViewStyle ? any : Props[K];
  } & {
    style?: ViewStyle;
  };

  export const FadeIn: any;
  export const FadeOut: any;
  export const SlideInRight: any;
  export const SlideOutLeft: any;

  export interface AnimatedComponentProps<Props extends object> {
    props: AnimateProps<Props>;
  }

  export interface Animated {
    View: React.ComponentClass<AnimateProps<React.ComponentProps<typeof View>>>;
    Text: React.ComponentClass<AnimateProps<React.ComponentProps<typeof Text>>>;
    Image: React.ComponentClass<
      AnimateProps<React.ComponentProps<typeof Image>>
    >;
    ScrollView: React.ComponentClass<AnimateProps<ScrollViewProps>>;
    FlatList: React.ComponentClass<AnimateProps<FlatListProps<any>>>;
  }

  const Animated: Animated;
  export default Animated;
}
