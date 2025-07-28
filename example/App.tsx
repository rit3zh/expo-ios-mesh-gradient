import React, { useState } from "react";
import { AnimatedMeshGradient } from "expo-ios-mesh-gradient";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SymbolView } from "expo-symbols";

const GRADIENT_PRESETS = {
  midnight: {
    name: "Midnight",
    colors: [
      "#0f0f23",
      "#1a1a2e",
      "#16213e",
      "#0f3460",
      "#533483",
      "#7209b7",
      "#a663cc",
      "#4cc9f0",
      "#7209b7",
    ],
    icon: "moon.stars.fill",
  },
  aurora: {
    name: "Aurora",
    colors: [
      "#001122",
      "#003366",
      "#004d7a",
      "#008793",
      "#00bf72",
      "#a8eb12",
      "#ffff00",
      "#ff6b35",
      "#f7931e",
    ],
    icon: "sparkles",
  },
  sunset: {
    name: "Sunset",
    colors: [
      "#2d1b69",
      "#11047a",
      "#3730a3",
      "#7c3aed",
      "#a855f7",
      "#c084fc",
      "#f472b6",
      "#fb7185",
      "#fbbf24",
    ],
    icon: "sun.horizon.fill",
  },
  ocean: {
    name: "Ocean",
    colors: [
      "#0c1445",
      "#1e3a8a",
      "#1e40af",
      "#2563eb",
      "#3b82f6",
      "#06b6d4",
      "#22d3ee",
      "#67e8f9",
      "#a7f3d0",
    ],
    icon: "water.waves",
  },
  forest: {
    name: "Forest",
    colors: [
      "#0f1419",
      "#1a2332",
      "#0d4f3c",
      "#065f46",
      "#047857",
      "#059669",
      "#10b981",
      "#34d399",
      "#6ee7b7",
    ],
    icon: "tree.fill",
  },
  ember: {
    name: "Ember",
    colors: [
      "#1c1917",
      "#451a03",
      "#7c2d12",
      "#dc2626",
      "#ea580c",
      "#f59e0b",
      "#fbbf24",
      "#fde047",
      "#facc15",
    ],
    icon: "flame.fill",
  },
} as const;

const POINT_PRESETS = {
  default: {
    name: "Default",
    points: [
      [0.0, 0.0],
      [0.5, 0.0],
      [1.0, 0.0],
      [0.0, 0.5],
      [0.5, 0.5],
      [1.0, 0.5],
      [0.0, 1.0],
      [0.5, 1.0],
      [1.0, 1.0],
    ] as Array<[number, number]>,
    icon: "grid",
  },
  wave: {
    name: "Wave",
    points: [
      [0.0, 0.0],
      [0.5, 0.1],
      [1.0, 0.0],
      [0.1, 0.5],
      [0.5, 0.5],
      [0.9, 0.5],
      [0.0, 1.0],
      [0.5, 0.9],
      [1.0, 1.0],
    ] as Array<[number, number]>,
    icon: "waveform",
  },
  organic: {
    name: "Organic",
    points: [
      [0.0, 0.0],
      [0.6, 0.15],
      [1.0, 0.05],
      [0.08, 0.42],
      [0.52, 0.58],
      [0.88, 0.38],
      [0.02, 0.92],
      [0.48, 1.0],
      [0.98, 0.88],
    ] as Array<[number, number]>,
    icon: "leaf.fill",
  },
  dynamic: {
    name: "Dynamic",
    points: [
      [0.1, 0.1],
      [0.5, 0.2],
      [0.9, 0.1],
      [0.2, 0.6],
      [0.4, 0.4],
      [0.8, 0.6],
      [0.1, 0.9],
      [0.6, 0.8],
      [0.9, 0.9],
    ] as Array<[number, number]>,
    icon: "bolt.fill",
  },
} as const;

export default function App() {
  const [animationSpeed, setAnimationSpeed] = useState(0.012);
  const [noiseAmplitude, setNoiseAmplitude] = useState(0.015);
  const [frequencyModulation, setFrequencyModulation] = useState(0.6);
  const [selectedPreset, setSelectedPreset] =
    useState<keyof typeof GRADIENT_PRESETS>("aurora");
  const [selectedPointPreset, setSelectedPointPreset] =
    useState<keyof typeof POINT_PRESETS>("wave");
  const [customPoints, setCustomPoints] = useState<Array<[number, number]>>(
    POINT_PRESETS.wave.points
  );
  const [editingPointIndex, setEditingPointIndex] = useState<number | null>(
    null
  );

  const meshPoints = customPoints;

  const currentPreset = GRADIENT_PRESETS[selectedPreset!];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <AnimatedMeshGradient
        columns={3}
        rows={3}
        points={meshPoints}
        colors={currentPreset.colors as any}
        animated={true}
        animationSpeed={animationSpeed}
        noiseAmplitude={noiseAmplitude}
        frequencyModulation={frequencyModulation}
        smoothsColors={true}
        ignoresSafeArea={true}
        style={StyleSheet.absoluteFillObject}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <SymbolView
                  name="waveform.path"
                  size={24}
                  tintColor="#ffffff"
                  weight="medium"
                />
                <Text style={styles.headerTitle}>Mesh Gradient</Text>
              </View>
              <Text style={styles.headerSubtitle}>
                Interactive gradient controls
              </Text>
            </View>

            <View style={styles.mainContent}>
              <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>Expo Mesh</Text>
                <Text style={styles.accentTitle}>Gradients</Text>
                <Text style={styles.description}>
                  Crafted with precision and attention to detail.
                </Text>
              </View>

              <View style={styles.presetsContainer}>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <SymbolView
                      name="paintpalette.fill"
                      size={20}
                      tintColor="rgba(255, 255, 255, 0.8)"
                      weight="medium"
                    />
                    <Text style={styles.cardTitle}>Gradient Presets</Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.presetScroll}
                  >
                    {Object.entries(GRADIENT_PRESETS).map(([key, preset]) => (
                      <TouchableOpacity
                        key={key}
                        style={[
                          styles.presetButton,
                          selectedPreset === key && styles.presetButtonActive,
                        ]}
                        onPress={() =>
                          setSelectedPreset(
                            key as keyof typeof GRADIENT_PRESETS
                          )
                        }
                      >
                        <SymbolView
                          name={preset.icon}
                          size={18}
                          tintColor={
                            selectedPreset === key
                              ? "#ffffff"
                              : "rgba(255, 255, 255, 0.7)"
                          }
                          weight="medium"
                        />
                        <Text
                          style={[
                            styles.presetButtonText,
                            selectedPreset === key &&
                              styles.presetButtonTextActive,
                          ]}
                        >
                          {preset.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View style={styles.controlsContainer}>
                <View style={styles.cardWrapper}>
                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <SymbolView
                        name="speedometer"
                        size={20}
                        tintColor="rgba(255, 255, 255, 0.8)"
                        weight="medium"
                      />
                      <Text style={styles.cardTitle}>Animation Speed</Text>
                    </View>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={0.001}
                        maximumValue={0.05}
                        value={animationSpeed}
                        onValueChange={setAnimationSpeed}
                        minimumTrackTintColor="#ffffff"
                        maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                        thumbTintColor="#ffffff"
                      />
                      <Text style={styles.sliderValue}>
                        {animationSpeed.toFixed(3)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <SymbolView
                        name="waveform"
                        size={20}
                        tintColor="rgba(255, 255, 255, 0.8)"
                        weight="medium"
                      />
                      <Text style={styles.cardTitle}>Noise Amplitude</Text>
                    </View>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={0.001}
                        maximumValue={0.1}
                        value={noiseAmplitude}
                        onValueChange={setNoiseAmplitude}
                        minimumTrackTintColor="#ffffff"
                        maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                        thumbTintColor="#ffffff"
                      />
                      <Text style={styles.sliderValue}>
                        {noiseAmplitude.toFixed(3)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <SymbolView
                        name="antenna.radiowaves.left.and.right"
                        size={20}
                        tintColor="rgba(255, 255, 255, 0.8)"
                        weight="medium"
                      />
                      <Text style={styles.cardTitle}>Frequency Modulation</Text>
                    </View>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={0.1}
                        maximumValue={2.0}
                        value={frequencyModulation}
                        onValueChange={setFrequencyModulation}
                        minimumTrackTintColor="#ffffff"
                        maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                        thumbTintColor="#ffffff"
                      />
                      <Text style={styles.sliderValue}>
                        {frequencyModulation.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </AnimatedMeshGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 48,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: 12,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "400",
  },
  mainContent: {
    flex: 1,
  },
  titleSection: {
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -2,
    lineHeight: 52,
  },
  accentTitle: {
    fontSize: 48,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: -2,
    lineHeight: 52,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 24,
    fontWeight: "400",
  },
  presetsContainer: {
    marginBottom: 24,
  },
  pointsContainer: {
    marginBottom: 24,
  },
  pointCustomizationContainer: {
    marginBottom: 24,
  },
  pointGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  pointButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  pointButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  pointButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  pointCoordinates: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "monospace",
  },
  pointEditor: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  pointEditorTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  coordinateSliders: {
    gap: 16,
  },
  coordinateSlider: {
    gap: 8,
  },
  coordinateLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    fontFamily: "monospace",
  },
  presetScroll: {
    paddingRight: 20,
  },
  presetButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  presetButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  presetButtonText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginLeft: 8,
    fontWeight: "500",
  },
  presetButtonTextActive: {
    color: "#ffffff",
  },
  controlsContainer: {
    marginBottom: 32,
  },
  cardWrapper: {
    gap: 16,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    marginLeft: 12,
  },
  sliderContainer: {
    gap: 12,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderValue: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "right",
    fontWeight: "500",
    fontFamily: "monospace",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    paddingTop: 24,
  },
  footerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  footerText: {
    fontSize: 14,
    color: "#ffffff",
    marginLeft: 8,
    fontWeight: "500",
  },
});
