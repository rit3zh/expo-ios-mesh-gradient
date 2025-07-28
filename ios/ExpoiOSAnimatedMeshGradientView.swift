import SwiftUI
import ExpoModulesCore


struct MeshPoint: Record {
  @Field var x: Float = 0.0
  @Field var y: Float = 0.0
}

class ExpoAnimatedMeshGradientProps: ExpoSwiftUI.ViewProps {
  @Field var columns: Int = 3
  @Field var rows: Int = 3
  @Field var points: [MeshPoint] = []
  @Field var colors: [Color] = []
  @Field var smoothsColors: Bool = true
  @Field var ignoresSafeArea: Bool = true
  @Field var mask: Bool = false
  
  @Field var animated: Bool = true
  @Field var animationSpeed: Float = 0.05
  @Field var animationInterval: Double = 0.016 // ~60fps
  @Field var noiseAmplitude: Float = 0.1
  @Field var frequencyModulation: Float = 1.0
  
  @Field var animationRanges: [ClosedRange<Float>] = []
  @Field var animationOffsets: [Float] = []
  @Field var animationScales: [Float] = []
}

struct ExpoAnimatedMeshGradientView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
  @ObservedObject var props: ExpoAnimatedMeshGradientProps
  @State private var animationTime: Float = 0.0
  @State private var timer: Timer?
  
  var body: some View {
    ZStack(alignment: .topLeading) {
      let gradient = if #available(iOS 18.0, macOS 15.0, *) {
        AnyView(
          MeshGradient(
            width: props.columns,
            height: props.rows,
            points: animatedPoints,
            colors: props.colors,
            smoothsColors: props.smoothsColors
          )
          .ignoresSafeArea(edges: props.ignoresSafeArea ? .all : [])
        )
      } else {
        AnyView(EmptyView())
      }
      
      if props.mask {
        if #available(macOS 12.0, *) {
          gradient.mask(alignment: .topLeading) {
            Children()
          }
        }
      } else {
        Group {
          gradient
          Children()
        }
      }
    }
    .onAppear {
      startAnimation()
    }
    .onDisappear {
      stopAnimation()
    }
    .onChange(of: props.animated) { newValue in
      if newValue {
        startAnimation()
      } else {
        stopAnimation()
      }
    }
  }
  
  private var animatedPoints: [SIMD2<Float>] {
    
    let basePoints = props.points.isEmpty ? generateDefaultPoints() : convertMeshPointsToSIMD2()
    
    guard props.animated else {
      return basePoints
    }
    
    return basePoints.enumerated().map { index, point in
      let animatedX = animateValue(
        baseValue: point.x,
        index: index,
        component: 0
      )
      let animatedY = animateValue(
        baseValue: point.y,
        index: index,
        component: 1
      )
      return SIMD2<Float>(animatedX, animatedY)
    }
  }
  
  private func convertMeshPointsToSIMD2() -> [SIMD2<Float>] {
    return props.points.map { point in
      SIMD2<Float>(point.x, point.y)
    }
  }
  
  private func generateDefaultPoints() -> [SIMD2<Float>] {
    var points: [SIMD2<Float>] = []
    let totalPoints = props.columns * props.rows
    
    for i in 0..<totalPoints {
      let row = i / props.columns
      let col = i % props.columns
      let x = Float(col) / Float(max(1, props.columns - 1))
      let y = Float(row) / Float(max(1, props.rows - 1))
      points.append(SIMD2<Float>(x, y))
    }
    
    return points
  }
  
  private func animateValue(baseValue: Float, index: Int, component: Int) -> Float {
    let range = getAnimationRange(for: index, component: component)
    let offset = getAnimationOffset(for: index, component: component)
    let scale = getAnimationScale(for: index, component: component)
    
    return sine(
      in: range,
      offset,
      scale,
      animationTime,
      props.frequencyModulation,
      props.noiseAmplitude,
      noiseFunction
    )
  }
  
  private func getAnimationRange(for index: Int, component: Int) -> ClosedRange<Float> {
    let rangeIndex = index * 2 + component
    if rangeIndex < props.animationRanges.count {
      return props.animationRanges[rangeIndex]
    }
    
    let defaultRanges: [ClosedRange<Float>] = [
      (-0.5)...0.0, (-0.4)...0.0,
      0.5...0.6, (-0.5)...(-0.015),
      1.1...1.5, (-0.1)...0.0,
      (-0.8)...(-0.1), 0.3...0.7,
      0.1...0.8, 0.2...0.8,
      1.0...1.5, 0.4...0.8,
      (-0.8)...0.0, 1.4...1.9,
      0.25...0.65, 1.1...1.2,
      1.0...1.5, 1.3...1.7
    ]
    
    if rangeIndex < defaultRanges.count {
      return defaultRanges[rangeIndex]
    }
    
    return (-0.2)...0.2
  }
  
  private func getAnimationOffset(for index: Int, component: Int) -> Float {
    let offsetIndex = index * 2 + component
    if offsetIndex < props.animationOffsets.count {
      return props.animationOffsets[offsetIndex]
    }
    
    let defaultOffsets: [Float] = [
      0.234, 0.353, 0.134, 0.523, 0.214, 0.053,
      0.342, 0.984, 0.084, 0.242, 0.084, 0.642,
      0.442, 0.984, 0.784, 0.772, 0.056, 0.342
    ]
    
    if offsetIndex < defaultOffsets.count {
      return defaultOffsets[offsetIndex]
    }
    
    return Float(index) * 0.1
  }
  
  private func getAnimationScale(for index: Int, component: Int) -> Float {
    let scaleIndex = index * 2 + component
    if scaleIndex < props.animationScales.count {
      return props.animationScales[scaleIndex]
    }
    
    let defaultScales: [Float] = [
      0.2, 0.2, 0.2, 0.15, 0.2, 0.1,
      1.439, 4.42, 0.239, 5.21, 0.939, 0.25,
      1.439, 3.42, 0.339, 0.124, 0.939, 0.47
    ]
    
    if scaleIndex < defaultScales.count {
      return defaultScales[scaleIndex]
    }
    
    return 0.5
  }
  
  private func startAnimation() {
    guard props.animated else { return }
    
    timer = Timer.scheduledTimer(withTimeInterval: props.animationInterval, repeats: true) { _ in
      withTransaction(Transaction(animation: .linear(duration: props.animationInterval))) {
        animationTime += props.animationSpeed
      }
    }
  }
  
  private func stopAnimation() {
    timer?.invalidate()
    timer = nil
  }
  
  private func noiseFunction(_ t: Float) -> Float {
    return (sin(t * 0.5) + cos(t * 0.25)) / 2
  }
  
  private func sine(
    in range: ClosedRange<Float>,
    _ offset: Float,
    _ scale: Float,
    _ t: Float,
    _ frequencyModulation: Float,
    _ noiseAmplitude: Float,
    _ noiseFunction: (Float) -> Float
  ) -> Float {
    let amplitude = (range.upperBound - range.lowerBound) / 2
    let midPoint = (range.upperBound + range.lowerBound) / 2
    
    
    let primarySine = sin(scale * t + offset)
    
    
    let modulatingSine = sin(frequencyModulation * t + offset)
    
    
    let noiseFactor = noiseFunction(t) * noiseAmplitude
    
    
    return midPoint + amplitude * (primarySine + modulatingSine * noiseFactor)
  }
}
