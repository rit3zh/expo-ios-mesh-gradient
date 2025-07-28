import { Platform } from "react-native";
import { NativeMeshGradientView } from "./NativeExpoiOSAnimatedMeshGradientView.ios";
import type { AnimatedMeshGradientProps } from "./types";
import { useMemo } from "react";

export default function AnimatedMeshGradient({
  columns = 3,
  rows = 3,
  points = [],
  colors = [],
  smoothsColors = true,
  ignoresSafeArea = true,
  mask = false,
  animated = true,
  animationSpeed = 0.05,
  animationInterval = 0.016, // ~60fps for smooth animation
  noiseAmplitude = 0.1,
  frequencyModulation = 1.0,
  animationRanges = [],
  animationOffsets = [],
  animationScales = [],
  style = { flex: 1 },
  children,
  ...otherProps
}: AnimatedMeshGradientProps) {
  const formattedPoints = useMemo(() => {
    if (points.length === 0) {
      return [];
    }

    const expectedPointCount = columns * rows;
    if (points.length !== expectedPointCount) {
      console.warn(
        `Expected ${expectedPointCount} points (${columns}x${rows}), but got ${points.length}. Using default points.`
      );
      return [];
    }

    return points.map(([x, y]) => ({
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y)),
    }));
  }, [points, columns, rows]);

  const formattedRanges = useMemo(() => {
    return animationRanges.map(([min, max]) => ({ min, max }));
  }, [animationRanges]);

  return (
    <NativeMeshGradientView
      {...otherProps}
      columns={columns}
      rows={rows}
      points={formattedPoints}
      colors={colors}
      smoothsColors={smoothsColors}
      ignoresSafeArea={ignoresSafeArea}
      mask={mask}
      animated={animated}
      animationSpeed={animationSpeed}
      animationInterval={animationInterval}
      noiseAmplitude={noiseAmplitude}
      frequencyModulation={frequencyModulation}
      animationRanges={formattedRanges}
      animationOffsets={animationOffsets}
      animationScales={animationScales}
      style={style}
      children={Platform.OS === "ios" ? children : undefined}
    />
  );
}

export { AnimatedMeshGradient };
