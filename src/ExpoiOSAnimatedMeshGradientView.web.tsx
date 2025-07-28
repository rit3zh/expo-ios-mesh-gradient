import * as React from 'react';

import { ExpoiOSAnimatedMeshGradientViewProps } from './ExpoiOSAnimatedMeshGradient.types';

export default function ExpoiOSAnimatedMeshGradientView(props: ExpoiOSAnimatedMeshGradientViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
