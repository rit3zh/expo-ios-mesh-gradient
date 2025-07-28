import type { StyleProp, ViewStyle } from "react-native";

export interface AnimatedMeshGradientProps {
  columns?: number;
  rows?: number;
  points?: Array<[number, number]>;
  colors?: string[];
  smoothsColors?: boolean;
  ignoresSafeArea?: boolean;
  mask?: boolean;

  animated?: boolean;
  animationSpeed?: number;
  animationInterval?: number;
  noiseAmplitude?: number;
  frequencyModulation?: number;

  animationRanges?: Array<[number, number]>;
  animationOffsets?: number[];
  animationScales?: number[];

  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}
