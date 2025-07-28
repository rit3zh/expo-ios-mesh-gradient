import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoiOSAnimatedMeshGradientViewProps } from './ExpoiOSAnimatedMeshGradient.types';

const NativeView: React.ComponentType<ExpoiOSAnimatedMeshGradientViewProps> =
  requireNativeView('ExpoiOSAnimatedMeshGradient');

export default function ExpoiOSAnimatedMeshGradientView(props: ExpoiOSAnimatedMeshGradientViewProps) {
  return <NativeView {...props} />;
}
