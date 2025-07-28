import { NativeModule, requireNativeModule } from 'expo';

import { ExpoiOSAnimatedMeshGradientModuleEvents } from './ExpoiOSAnimatedMeshGradient.types';

declare class ExpoiOSAnimatedMeshGradientModule extends NativeModule<ExpoiOSAnimatedMeshGradientModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoiOSAnimatedMeshGradientModule>('ExpoiOSAnimatedMeshGradient');
