// src/screens/Auth/BioScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

import BaseStepScreen from "./BaseStepScreen";

/* 👉 BACKGROUND SVG */
import BioVector from "../../assets/vectors/biovector.svg";
import Celebration from "../../assets/images/celebration.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/* ---- SVG ORIGINAL SIZE (match biovector.svg viewBox) ---- */
const BIO_ORIGINAL = { width: 300, height: 500 };
const bioScale = SCREEN_WIDTH / BIO_ORIGINAL.width;

const BIO_SVG_RENDER = {
  width: SCREEN_WIDTH + 80,
  height: BIO_ORIGINAL.height * bioScale - 40,
};

export default function BioScreen({ navigation }) {
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const MIN_LENGTH = 10;

  const validateBio = (text) => {
    setBio(text);

    if (text.trim().length === 0) {
      setError("Bio cannot be empty.");
    } else if (text.trim().length < MIN_LENGTH) {
      setError(`Bio must be at least ${MIN_LENGTH} characters.`);
    } else {
      setError("");
    }
  };

  const handleFinish = () => {
    if (error || bio.trim().length < MIN_LENGTH) {
      setError(`Please write at least ${MIN_LENGTH} characters.`);
      return;
    }

    setShowCongrats(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    setTimeout(() => navigation.replace("MainApp"), 2000);
  };

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={7}
      totalSteps={7}
      title="Write a bio to introduce yourself"
      onNext={handleFinish}
      nextText="Let's Start!"
      nextDisabled={!!error || bio.trim().length < MIN_LENGTH}
    >
      {/* SVG BACKGROUND */}
      <BioVector
        width={BIO_SVG_RENDER.width}
        height={BIO_SVG_RENDER.height}
        style={styles.svgBackground}
      />

      {/* CONTENT */}
      <View style={styles.content}>
        <TextInput
          style={[
            styles.textArea,
            error ? { borderColor: "#FF6B6B" } : {},
          ]}
          placeholder="Don't be shy..."
          placeholderTextColor="#B0A7BD"
          multiline
          value={bio}
          onChangeText={validateBio}
        />

        {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      </View>

      {/* SUCCESS POPUP */}
      {showCongrats && (
        <Animated.View style={[styles.popupCard, { opacity: fadeAnim }]}>
          <Celebration width={70} height={70} style={{ marginBottom: 10 }} />
          <Text style={styles.popupTitle}>Congratulations! 🎉</Text>
          <Text style={styles.popupSubtitle}>
            You’re ready to explore with Dilsafar!
          </Text>
        </Animated.View>
      )}
    </BaseStepScreen>
  );
}

const styles = StyleSheet.create({
  /* SVG background */
  svgBackground: {
    position: "absolute",
    top: 80,
    left: 0,
    zIndex: 0,
    pointerEvents: "none",
  },

  content: {
    zIndex: 1,
    width: "100%",
  },

  textArea: {
    height: 180,
    backgroundColor: "#FAF8FF",
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#BB8DFF",
    padding: 18,
    fontSize: 16,
    color: "#333",
    shadowColor: "#d5a4ff",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 10,
    width: "100%",
    textAlignVertical: "top",

  },

  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginBottom: 15,
  },

  popupCard: {
    position: "absolute",
    top: "100%",
    alignSelf: "center",
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: "#ffffff",
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10,
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
