// src/screens/Auth/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import BackArrow from "../../assets/icons/backarrow.svg";
import Stepper from '../../components/Stepper';

// 🔹 SVG Background
import ProfileBg from "../../assets/vectors/profilevector.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// 🔹 ORIGINAL SVG SIZE (adjust to your actual SVG)
const PROFILE_ORIGINAL = {
  width: 270,
  height: 450,
};

// 🔹 SCALE CALCULATION (same logic as OTP)
const profileScale = SCREEN_WIDTH / PROFILE_ORIGINAL.width;

const PROFILE_SVG_RENDER = {
  width: SCREEN_WIDTH ,
  height: PROFILE_ORIGINAL.height * profileScale,
};

export default function ProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateInputs = () => {
    let valid = true;

    const nameRegex = /^[A-Za-z]{2,}$/;

    if (!firstName.trim()) {
      setFirstNameError("First name is required.");
      valid = false;
    } else if (firstName.length < 2) {
      setFirstNameError("First name must be at least 2 characters.");
      valid = false;
    } else if (!nameRegex.test(firstName)) {
      setFirstNameError("Only alphabets allowed (A-Z).");
      valid = false;
    } else {
      setFirstNameError('');
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError('');
    }

    return valid;
  };

  const handleContinue = () => {
    if (validateInputs()) {
      navigation.navigate("BirthdayScreen", { firstName });
    }
  };

  const handleFirstNameChange = (text) => {
    const cleanText = text.replace(/^\s+/g, "");
    const alphabetsOnly = cleanText.replace(/[^A-Za-z]/g, "");
    const limitedText = alphabetsOnly.slice(0, 15);

    setFirstName(limitedText);

    if (limitedText.length >= 2) {
      setFirstNameError('');
    }
  };

  const topPadding = Platform.OS === "android"
    ? (StatusBar.currentHeight || 24)
    : 44;

  return (
    <View style={styles.container}>

      {/* 🔹 SVG BACKGROUND (OTP STYLE) */}
      <ProfileBg
        width={PROFILE_SVG_RENDER.width}
        height={PROFILE_SVG_RENDER.height}
        style={styles.svgBackground}
      />

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { paddingTop: topPadding }]}
        onPress={() => navigation.goBack()}
      >
        <BackArrow width={28} height={28} fill="#000" />
      </TouchableOpacity>

      {/* Stepper */}
      <Stepper totalSteps={7} currentStep={1} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tell us a bit about yourself</Text>
        <Text style={styles.subtitle}>
          This will be displayed on your profile. You can change it later by contacting customer service.
        </Text>

        {/* FIRST NAME */}
        <TextInput
          style={[styles.input, firstNameError && styles.errorBorder]}
          placeholder="First Name"
          value={firstName}
          onChangeText={handleFirstNameChange}
          autoCapitalize="words"
        />
        {firstNameError && <Text style={styles.error}>{firstNameError}</Text>}

        {/* EMAIL */}
        <TextInput
          style={[styles.input, emailError && styles.errorBorder]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text.trim());
            setEmailError('');
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleContinue}>
          <LinearGradient
            colors={
              firstName && email && !firstNameError && !emailError
                ? ["#6A5AE0", "#8A6FF0"]
                : ["#C4C4C4", "#D7D7D7"]
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  /* 🔹 SVG BACKGROUND */
  svgBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },

  backButton: {
    paddingLeft: 22,
    width: 50,
    zIndex: 10,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    justifyContent: "center",
    zIndex: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#5A5A5A",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },

  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: "#fafafa",
  },

  errorBorder: {
    borderColor: "red",
  },

  error: {
    width: "100%",
    color: "red",
    marginBottom: 10,
    fontSize: 13,
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
