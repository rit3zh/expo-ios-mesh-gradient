import { registerWebModule, NativeModule } from 'expo';

import { ExpoiOSAnimatedMeshGradientModuleEvents } from './ExpoiOSAnimatedMeshGradient.types';

class ExpoiOSAnimatedMeshGradientModule extends NativeModule<ExpoiOSAnimatedMeshGradientModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoiOSAnimatedMeshGradientModule, 'ExpoiOSAnimatedMeshGradientModule');
