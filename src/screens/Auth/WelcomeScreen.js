import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Background PNG
import BannerImage from "../../assets/images/banner.png";

// Logo PNG
import LogoImage from "../../assets/images/dilsafar.png";

// SVG icons
import PhoneIcon from "../../assets/images/phone.svg";
import FacebookIcon from "../../assets/images/facebook.svg";
import GoogleIcon from "../../assets/images/google.svg";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={BannerImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient / Glass Layer */}
        <View style={styles.overlayGradient} />
        <View style={styles.glassOverlay} />

        {/* Top badge / brand chip */}
        <View style={styles.topChip}>
          <View style={styles.topChipDot} />
          <Text style={styles.topChipText}>Plan • Book • Travel</Text>
        </View>

        <View style={styles.contentContainer}>
          {/* WELCOME TEXT */}
          <Text style={styles.designerWelcome}>WELCOME TO</Text>

          {/* LOGO IMAGE */}
          <Image
            source={LogoImage}
            style={styles.logoImage}
            resizeMode="contain"
          />

          {/* TAGLINE */}
          <Text style={styles.tagline}>Your Journey, Curated</Text>

          {/* Sub tagline */}
          <Text style={styles.subTagline}>
            Discover flights, stays and experiences tailored just for you.
          </Text>

          {/* Primary CTA */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.primaryCta}
            onPress={() => navigation.navigate("PhoneNumber")}
          >
            <View style={styles.primaryCtaLeft}>
              <PhoneIcon width={22} height={22} />
              <Text style={styles.primaryCtaText}>Continue with phone</Text>
            </View>
            <View style={styles.primaryCtaPill}>
              <Text style={styles.primaryCtaPillText}>Get Started</Text>
            </View>
          </TouchableOpacity>

          {/* Social divider text */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* SOCIAL BUTTONS */}
          <View style={styles.socialRow}>
            {/* <TouchableOpacity
              style={[styles.socialButton, styles.socialPhone]}
              onPress={() => navigation.navigate("PhoneNumber")}
              activeOpacity={0.85}
            >
              <PhoneIcon width={30} height={30} />
            </TouchableOpacity> */}

            <TouchableOpacity
              style={[styles.socialButton, styles.socialFacebook]}
              activeOpacity={0.85}
            >
              <FacebookIcon width={30} height={30} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.socialGoogle]}
              activeOpacity={0.85}
            >
              <GoogleIcon width={30} height={30} />
            </TouchableOpacity>
          </View>

          {/* Trust badges */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <View style={styles.trustDot} />
              <Text style={styles.trustText}>Trusted by 25K+ travelers</Text>
            </View>
            <View style={styles.trustItem}>
              <View style={styles.trustDot} />
              <Text style={styles.trustText}>Secure payments</Text>
            </View>
          </View>

          {/* SIGN IN */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={styles.signInLink}> Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <Text style={styles.footerText}>
            We’ll never share anything without your permission.
          </Text>

          <Text style={styles.footerTextSmall}>
            By signing up, you agree to our
            <Text style={styles.linkText}> Terms & Conditions</Text> and how we
            use your data in our
            <Text style={styles.linkText}> Privacy Policy</Text>.
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#050816",
  },
  scrollContent: {
    flexGrow: 1,
  },

  backgroundImage: {
    width: "100%",
    minHeight: "100%",
    justifyContent: "flex-start",
    paddingTop:
      Platform.OS === "android"
        ? (StatusBar.currentHeight || 24) + 24
        : 60,
    paddingBottom: 40,
  },

  // Soft gradient overlay to give depth
  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5, 8, 22, 0.45)",
  },

  // Glassmorphism overlay
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 0.5,
    ...(Platform.OS === "ios"
      ? {
          // iOS only – RN does not support CSS backdropFilter but you can
          // replace this with BlurView if using @react-native-community/blur
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.35,
          shadowRadius: 40,
        }
      : {
          elevation: 0,
        }),
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  // Top chip
  topChip: {
    position: "absolute",
    top:
      Platform.OS === "android"
        ? (StatusBar.currentHeight || 20) + 8
        : 24,
    left: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.35)",
  },
  topChipDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "#22c55e",
    marginRight: 8,
  },
  topChipText: {
    color: "#E5E7EB",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },

  /* WELCOME TEXT */
  designerWelcome: {
    marginTop: 120,
    fontSize: 32,
    letterSpacing: 8,
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    color: "#F9FAFB",
    textTransform: "uppercase",
    marginBottom: 10,
    textShadowColor: "rgba(15, 23, 42, 0.85)",
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 18,
  },

  /* LOGO IMAGE */
  logoImage: {
    width: 220,
    height: 90,
    marginBottom: 6,
  },

  /* TAGLINES */
  tagline: {
    fontSize: 22,
    marginTop: 8,
    color: "#E5DEFF",
    fontFamily: "Nunito_800ExtraBold",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subTagline: {
    marginTop: 8,
    fontSize: 13,
    color: "#E5E7EB",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
    maxWidth: 320,
  },

  /* PRIMARY CTA */
  primaryCta: {
    marginTop: 32,
    width: "94%",
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(248,250,252,0.92)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  primaryCtaLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  primaryCtaText: {
    marginLeft: 10,
    color: "#020617",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  primaryCtaPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#4f46e5",
  },
  primaryCtaPillText: {
    color: "#F9FAFB",
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },

  /* Divider */
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    width: "86%",
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(148,163,184,0.6)",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#CBD5F5",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },

  /* SOCIAL BUTTONS */
  socialRow: {
    flexDirection: "row",
    marginTop: 20,
    width: "78%",
    justifyContent: "space-evenly",
  },

  socialButton: {
    backgroundColor: "rgba(15,23,42,0.85)",
    padding: 18,
    borderRadius: 64,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.6)",
  },
  socialPhone: {
    backgroundColor: "rgba(56,189,248,0.9)",
    borderColor: "rgba(56,189,248,0.9)",
  },
  socialFacebook: {
    backgroundColor: "rgba(37,99,235,0.9)",
    borderColor: "rgba(129,140,248,0.8)",
  },
  socialGoogle: {
    backgroundColor: "rgba(248,250,252,0.9)",
    borderColor: "rgba(148,163,184,0.6)",
  },

  /* TRUST ROW */
  trustRow: {
    marginTop: 26,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  trustDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "#22c55e",
    marginRight: 6,
  },
  trustText: {
    color: "#E5E7EB",
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
  },

  /* SIGN IN */
  signInContainer: {
    flexDirection: "row",
    marginTop: 32,
    alignItems: "center",
  },
  signInText: {
    color: "#E5E7EB",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  signInLink: {
    color: "#e0aaff",
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    textDecorationLine: "underline",
  },

  /* FOOTER TEXT */
  footerText: {
    marginTop: 28,
    color: "#F3EAFE",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    maxWidth: 320,
  },
  footerTextSmall: {
    marginTop: 8,
    color: "#CBD5F5",
    fontSize: 11,
    lineHeight: 18,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    maxWidth: 340,
  },
  linkText: {
    color: "#c77dff",
    fontFamily: "Poppins_700Bold",
  },
});
