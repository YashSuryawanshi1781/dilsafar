// src/screens/Auth/PurposeSelectionScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import BaseStepScreen from "./BaseStepScreen";

/* SVGs */
import HeartIcon from "../../assets/icons/heart.svg";
import ChatIcon from "../../assets/icons/chat.svg";
import MapIcon from "../../assets/icons/map.svg";
import PurposeSelectionVector from "../../assets/vectors/purposeselectionvector.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/* ---- SVG ORIGINAL SIZE (match purposeselectionvector.svg viewBox) ---- */
const VECTOR_ORIGINAL = { width: 400, height: 500 };
const vectorScale = SCREEN_WIDTH / VECTOR_ORIGINAL.width;

const VECTOR_RENDER = {
  width: SCREEN_WIDTH + 80,
  height: VECTOR_ORIGINAL.height * vectorScale - 40,
};

export default function PurposeSelectionScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  const Option = ({ id, Icon, title, subtitle }) => {
    const active = selected === id;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setSelected(id)}
        style={[styles.card, active && styles.cardActive]}
      >
        <View style={styles.leftRow}>
          <Icon width={26} height={26} />

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
          </View>
        </View>

        <View style={[styles.radio, active && styles.radioActive]}>
          {active && <View style={styles.radioDot} />}
        </View>
      </TouchableOpacity>
    );
  };

  const handleNext = () => {
    navigation.navigate("GenderScreen");
  };

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={3}
      totalSteps={7}
      title="come on in! tell people why you’re here."
      subtitle="Be confident about what you want, and find the right people for you. You can change this anytime."
      onNext={handleNext}
      nextText="Continue"
      nextDisabled={!selected}
    >
      {/* SVG BACKGROUND */}
      <PurposeSelectionVector
        width={VECTOR_RENDER.width}
        height={VECTOR_RENDER.height}
        style={styles.svgBackground}
      />

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.options}>
          <Option
            id="partner"
            Icon={HeartIcon}
            title="Looking for my next adventure partner"
            subtitle="I’d love to find someone special on this journey."
          />

          <Option
            id="friends"
            Icon={ChatIcon}
            title="Open to new chats, vibes, and friendships"
            subtitle="I’m here to chat, hang out, and maybe plan a trip."
          />

          <Option
            id="explore"
            Icon={MapIcon}
            title="Here to explore and see what fits"
            subtitle="I want to meet people to explore new places with."
          />
        </View>
      </ScrollView>
    </BaseStepScreen>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  /* SVG background */
  svgBackground: {
    position: "absolute",
    top: 300,
    left: 0,
    zIndex: 0,
    pointerEvents: "none",
  },

  content: {
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 40,
    zIndex: 1,
  },

  options: {
    gap: 14,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardActive: {
    backgroundColor: "#EEDBFF",
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B6B6B",
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  radioActive: {
    borderColor: "#000",
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
});
