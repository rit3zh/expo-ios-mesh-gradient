import * as React from "react";
import { requireNativeView } from "expo";

export const NativeMeshGradientView: React.ComponentType<any> =
  requireNativeView(
    "ExpoiOSAnimatedMeshGradient",
    "ExpoAnimatedMeshGradientView"
  );
