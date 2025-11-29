// src/screens/Auth/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from "../../assets/icons/backarrow.svg";
import Stepper from '../../components/Stepper';

export default function ProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  // Error states
  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // -------------------------------
  // VALIDATION LOGIC
  // -------------------------------
  const validateInputs = () => {
    let valid = true;

    // NAME VALIDATION
    const nameRegex = /^[A-Za-z]{2,}$/;  // Only alphabets, minimum 2 letters

    if (!firstName.trim()) {
      setFirstNameError("First name is required.");
      valid = false;
    } else if (firstName.length < 2) {
      setFirstNameError("First name must be at least 2 characters.");
      valid = false;
    } else if (!nameRegex.test(firstName)) {
      setFirstNameError("Only alphabets allowed (A-Z). No numbers or symbols.");
      valid = false;
    } else {
      setFirstNameError('');
    }

    // EMAIL VALIDATION
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email (example: name@email.com).");
      valid = false;
    } else {
      setEmailError('');
    }

    return valid;
  };

  const handleContinue = () => {
    if (validateInputs()) {
      navigation.navigate("BirthdayScreen");
    }
  };

  const handleFirstNameChange = (text) => {
    // Remove spaces at start and only allow alphabets (A-Z, a-z)
    const cleanText = text.replace(/^\s+/g, "");
    const alphabetsOnly = cleanText.replace(/[^A-Za-z]/g, "");
    
    // Limit to 15 characters
    const limitedText = alphabetsOnly.slice(0, 15);
    
    setFirstName(limitedText);

    if (limitedText.trim().length >= 2) {
      setFirstNameError('');
    }
  };

  return (
    <View style={styles.container}>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <BackArrow width={28} height={28} fill="#000" />
      </TouchableOpacity>

      {/* Stepper */}
      <Stepper totalSteps={7} currentStep={1} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tell us a bit about yourself</Text>
        <Text style={styles.subtitle}>
          This will be displayed on your profile. You can change it later by contacting customer support.
        </Text>

        {/* FIRST NAME FIELD */}
        <TextInput
          style={[styles.input, firstNameError ? styles.errorBorder : null]}
          placeholder="First Name"
          value={firstName}
          onChangeText={handleFirstNameChange}
          autoCapitalize="words"
          maxLength={15}
        />
        {firstNameError ? (
          <Text style={styles.error}>{firstNameError}</Text>
        ) : null}

        {/* EMAIL FIELD */}
        <TextInput
          style={[styles.input, emailError ? styles.errorBorder : null]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text.trim());
            if (emailError) setEmailError('');
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {emailError ? (
          <Text style={styles.error}>{emailError}</Text>
        ) : null}
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
  container: { flex: 1, backgroundColor: "#fff" },

  backButton: {
    paddingTop: 50,
    paddingLeft: 22,
    paddingBottom: 10,
    width: 50,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "Roboto",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
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
    paddingLeft: 4,
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
    fontFamily: "Roboto",
    fontWeight: "700",
  },
});