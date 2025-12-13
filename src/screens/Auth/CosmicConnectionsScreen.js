// src/screens/Auth/CosmicConnectionsScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import BaseStepScreen from "./BaseStepScreen";
import CosmicVector from "../../assets/vectors/CosmicConnectionsScreen.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/* ---- SVG ORIGINAL SIZE ---- */
const SVG_ORIGINAL = { width: 360, height: 540 };
const svgScale = SCREEN_WIDTH / SVG_ORIGINAL.width;

const SVG_RENDER = {
  width: SCREEN_WIDTH,
  height: SVG_ORIGINAL.height * svgScale - 40,
};

const SIGNS = [
  { id: "sagittarius", label: "Sagittarius" },
  { id: "aries", label: "Aries" },
  { id: "leo", label: "Leo" },
  { id: "taurus", label: "Taurus" },
  { id: "pisces", label: "Pisces" },
  { id: "virgo", label: "Virgo" },
  { id: "cancer", label: "Cancer" },
  { id: "gemini", label: "Gemini" },
  { id: "libra", label: "Libra" },
  { id: "capricorn", label: "Capricorn" },
  { id: "aquarius", label: "Aquarius" },
  { id: "scorpio", label: "Scorpio" },
];

export default function CosmicConnectionsScreen({ navigation }) {
  const [selected, setSelected] = useState("sagittarius");

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={7}
      totalSteps={12}
      title="Cosmic connections"
      onNext={() => navigation.navigate("CareerCompassScreen")}
    >
      {/* SVG BACKGROUND */}
      <CosmicVector
        width={SVG_RENDER.width}
        height={SVG_RENDER.height}
        style={styles.svgBackground}
      />

      <Text style={styles.subtitle}>
        Your zodiac says a lot about your vibe. Select your sign and let
        astrology inspire your journey.
      </Text>

      <View style={styles.grid}>
        {SIGNS.map((item) => {
          const active = selected === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, active && styles.activeChip]}
              onPress={() => setSelected(item.id)}
              activeOpacity={0.85}
            >
              <Text
                style={[styles.chipText, active && styles.activeText]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </BaseStepScreen>
  );
}

const styles = StyleSheet.create({
  svgBackground: {
    position: "absolute",
    top: 90,
    left: 0,
    zIndex: 0,
    pointerEvents: "none",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#8A8A8A",
    lineHeight: 20,
    maxWidth: "92%",
    zIndex: 1,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 28,
    zIndex: 1,
  },

  /* 🔥 EXACTLY 2 CHIPS PER ROW */
  chip: {
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#F4F4F4",
  },

  activeChip: {
    backgroundColor: "#F1E8FF",
    borderWidth: 1,
    borderColor: "#8B3DFF",
  },

  chipText: {
    fontSize: 14,
    color: "#000",
  },

  activeText: {
    color: "#8B3DFF",
    fontWeight: "600",
  },
});
