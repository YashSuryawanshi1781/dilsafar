import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";

import BaseStepScreen from "./BaseStepScreen";
import CareerCompassVector from "../../assets/vectors/CareerCompassVector.svg";
import Celebration from "../../assets/images/celebration.svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/* SVG SCALE */
const SVG_ORIGINAL = { width: 360, height: 600 };
const svgScale = SCREEN_WIDTH / SVG_ORIGINAL.width;

const SVG_RENDER = {
  width: SCREEN_WIDTH,
  height: SVG_ORIGINAL.height * svgScale,
};

const PROFESSIONS = [
  "Engineer",
  "Doctor",
  "Finance",
  "Marketing",
  "Corporate",
  "Teacher",
  "Lawyer",
  "Entrepreneur",
  "Civil Services",
  "Business",
  "Other",
];

export default function CareerCompassScreen({ navigation }) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (!selected) return;

    setShowCongrats(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.replace("MainApp");
    }, 1800);
  };

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={8}
      totalSteps={8}
      title="Career & compass"
      onNext={handleNext}
      nextText="Let’s Start"
      isButtonDisabled={!selected}
    >
      {/* Background SVG */}
      <CareerCompassVector
        width={SVG_RENDER.width}
        height={SVG_RENDER.height}
        style={styles.svgBackground}
      />

      <Text style={styles.subtitle}>
        Let your profession show a slice of who you are beyond the journey
      </Text>

      {/* Search */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Type Your Profession"
          placeholderTextColor="#9A9A9A"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
      </View>

      {/* Profession Chips */}
      <View style={styles.grid}>
        {PROFESSIONS.map((item) => {
          const active = selected === item;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setSelected(item)}
              style={[styles.chip, active && styles.activeChip]}
            >
              <Text style={[styles.chipText, active && styles.activeText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 🎉 OVERLAY + POPUP */}
      {showCongrats && (
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.popupCard,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.92, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Celebration width={72} height={72} style={{ marginBottom: 12 }} />
            <Text style={styles.popupTitle}>Congratulations! 🎉</Text>
            <Text style={styles.popupSubtitle}>
              You’re ready to explore with Dilsafar!
            </Text>
          </Animated.View>
        </View>
      )}
    </BaseStepScreen>
  );
}

const styles = StyleSheet.create({
  svgBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    pointerEvents: "none",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#9A9A9A",
    lineHeight: 20,
    maxWidth: "92%",
    zIndex: 1,
  },

  searchBox: {
    marginTop: 18,
    backgroundColor: "#F4F4F4",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: "center",
    zIndex: 1,
  },

  input: {
    fontSize: 14,
    color: "#000",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 22,
    zIndex: 1,
  },

  chip: {
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 24,
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

  /* Overlay */
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  /* Popup */
  popupCard: {
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: "#fff",
    paddingVertical: 28,
    paddingHorizontal: 22,
    borderRadius: 22,
    alignItems: "center",
    elevation: 12,
  },

  popupTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6A5AE0",
    marginBottom: 6,
  },

  popupSubtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});
