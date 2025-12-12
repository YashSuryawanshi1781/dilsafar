import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

// SVG Back Arrow
import BackArrow from "../../assets/icons/backarrow.svg";
// SVG background for OTP screen
import OTPVector from "../../assets/vectors/otpvector.svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Original SVG size
const OTP_ORIGINAL = { width: 390, height: 420 };
const otpScale = SCREEN_WIDTH / OTP_ORIGINAL.width;
const OTP_SVG_RENDER = {
  width: SCREEN_WIDTH,
  height: OTP_ORIGINAL.height * otpScale - 40,
};

export default function OTPScreen({ route, navigation }) {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');

  const [timer, setTimer] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      setIsResendVisible(false);
    } else {
      setIsResendVisible(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    setOtp("");
  };

  const handleOtpChange = (text) => {
    const onlyNums = text.replace(/[^0-9]/g, "");
    setOtp(onlyNums);
  };

  const handleContinue = () => {
    navigation.navigate("ProfileScreen");
  };

  const topPadding = Platform.OS === 'android'
    ? (StatusBar.currentHeight || 24)
    : 44;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >

      {/* SVG Background */}
      <OTPVector
        width={OTP_SVG_RENDER.width}
        height={OTP_SVG_RENDER.height}
        style={styles.svgBackground}
      />

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { paddingTop: topPadding }]}
        onPress={() => navigation.goBack()}
      >
        <BackArrow width={28} height={28} fill="#000" />
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.centerContent}>

        <Text style={styles.title}>Got your code? Enter it below!</Text>

        <View style={styles.inlineText}>
          <Text style={styles.inlineTextSmall}>A code was sent to </Text>
          <Text style={styles.inlineTextBold}>{phoneNumber}</Text>
        </View>



        {/* OTP INPUT */}
        <View style={styles.otpContainer}>
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
          <Text style={styles.timer}>
            Resend code in <Text style={styles.timerBold}>{timer}s</Text>
          </Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resend}>Didn’t get it? Tap to resend</Text>
          </TouchableOpacity>
        )}

      </View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity disabled={otp.length < 6} onPress={handleContinue}>
          <LinearGradient
            colors={
              otp.length === 6
                ? ["#1E1E1E", "#2A2A2A", "#3A3A3A"]   // BLACK SHADE
                : ["#BFBFBF", "#D3D3D3"]
            }
            style={[styles.button]}
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

  svgBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    marginTop: 50,
  },

  backButton: {
    paddingLeft: 22,
    width: 50,
    zIndex: 10,
  },

  centerContent: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 40,
    paddingHorizontal: 26,
    zIndex: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
    color: "#000",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#5A5A5A",
  },

  phone: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    marginTop: 4,
    marginBottom: 28,
  },

  otpContainer: {
    width: "100%",
    height: 65,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#ddd",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inlineText: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  inlineTextSmall: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#5A5A5A",
  },

  inlineTextBold: {
    fontSize: 14,          // Make same size for perfect alignment
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },


  otpInput: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 14,
    color: "#000",
  },

  timer: {
    fontSize: 14,
    color: "#999",
    fontFamily: "Poppins-Regular",
    marginTop: 6,
  },

  timerBold: {
    color: "#6A5AE0",
    fontFamily: "Poppins-SemiBold",
  },

  resend: {
    fontSize: 15,
    color: "#6A5AE0",
    fontFamily: "Poppins-SemiBold",
    marginTop: 6,
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
  },
});
