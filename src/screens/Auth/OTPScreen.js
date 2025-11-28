import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

// SVG Back Arrow
import BackArrow from "../../assets/icons/backarrow.svg";

export default function OTPScreen({ route, navigation }) {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');

  // TIMER
  const [timer, setTimer] = useState(60);      // countdown from 60 sec
  const [isResendVisible, setIsResendVisible] = useState(false);

  // Start & Run Timer
  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      setIsResendVisible(false);
    } else {
      setIsResendVisible(true);   // show resend only when timer ends
    }

    return () => clearInterval(interval);
  }, [timer]);

  // Handle Resend Click → Restart Timer
  const handleResend = () => {
    setTimer(60);
    setOtp("");
  };

  // Block alphabets & symbols → only digits allowed
  const handleOtpChange = (text) => {
    const numbersOnly = text.replace(/[^0-9]/g, "");
    setOtp(numbersOnly);
  };

  const handleContinue = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <BackArrow width={28} height={28} fill="#000" />
      </TouchableOpacity>

      {/* Center Content */}
      <View style={styles.centerContent}>
        <Text style={styles.title}>Verify your code</Text>
        <Text style={styles.subtitle}>A verification code was sent to</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>

        {/* OTP Input */}
        <View style={styles.otpBoxContainer}>
          <TextInput
            style={styles.otpInput}
            placeholder="- - - - - -"
            placeholderTextColor="#BEBEBE"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={handleOtpChange}
          />
        </View>

        {/* Timer */}
        {timer > 0 ? (
          <Text style={styles.timerText}>
            Resend code in <Text style={styles.timerNumber}>{timer}s</Text>
          </Text>
        ) : (
          <TouchableOpacity style={styles.resend} onPress={handleResend}>
            <Text style={styles.resendText}>Didn’t get it? Tap to resend</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity disabled={otp.length < 6} onPress={handleContinue}>
          <LinearGradient
            colors={otp.length === 6 ? ["#6A5AE0", "#8A6FF0"] : ["#C4C4C4", "#D7D7D7"]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  backButton: {
    paddingTop: 55,
    paddingLeft: 22,
    paddingBottom: 10,
    width: 50,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#5A5A5A",
    textAlign: "center",
    marginBottom: 6,
  },

  phoneNumber: {
    fontSize: 16,
    color: "#000",
    marginBottom: 35,
  },

  otpBoxContainer: {
    width: "80%",
    marginBottom: 15,
  },

  otpInput: {
    width: "100%",
    paddingVertical: 16,
    borderWidth: 1.5,
    borderRadius: 14,
    borderColor: "#D3D3D3",
    textAlign: "center",
    fontSize: 22,
    letterSpacing: 20,
    color: "#000",
  },

  timerText: {
    marginTop: 10,
    fontSize: 15,
    color: "#999",
  },

  timerNumber: {
    color: "#6A5AE0",
    fontWeight: "700",
  },

  resend: { marginTop: 10 },
  resendText: {
    fontSize: 15,
    color: "#6A5AE0",
    textAlign: "center",
    fontWeight: "600",
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
