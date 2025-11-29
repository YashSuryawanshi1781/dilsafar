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
import Celebration from "../../assets/images/celebration.svg";

const { width } = Dimensions.get("window");

export default function BioScreen({ navigation }) {
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const MIN_LENGTH = 10; // **validation rule**

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
      subtitle="Be confident and introduce yourself to the community."
      onNext={handleFinish}
      nextText="Let's Start!"
      nextDisabled={!!error || bio.trim().length < MIN_LENGTH} // **disable button**
    >
      <TextInput
        style={[styles.textArea, error ? { borderColor: "#FF6B6B" } : {}]}
        placeholder="Don't be shy..."
        placeholderTextColor="#B0A7BD"
        multiline
        value={bio}
        onChangeText={validateBio}
      />

      {error !== "" && <Text style={styles.errorText}>{error}</Text>}

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
    width: width * 0.8,
    backgroundColor: "#ffffff",
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
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
