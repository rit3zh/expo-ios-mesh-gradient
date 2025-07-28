import ExpoModulesCore

public class ExpoiOSAnimatedMeshGradientModule: Module {

  public func definition() -> ModuleDefinition {
    Name("ExpoiOSAnimatedMeshGradient")
    View(ExpoAnimatedMeshGradientView.self)
  }
}
