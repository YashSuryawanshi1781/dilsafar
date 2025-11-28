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
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BannerImage from "../../assets/images/banner.png";
import LogoImage from "../../assets/images/dilsafar.png";

import PhoneIcon from "../../assets/images/phone.svg";
import FacebookIcon from "../../assets/images/facebook.svg";
import GoogleIcon from "../../assets/images/google.svg";

const { height, width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{ flexGrow: 1 }}
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
        <View style={styles.overlayGradient} />
        <View style={styles.glassOverlay} />

        {/* Top Chip */}
        <View style={styles.topChip}>
          <View style={styles.topChipDot} />
          <Text style={styles.topChipText}>Plan • Book • Travel</Text>
        </View>

        <View style={styles.contentContainer}>
          {/* WELCOME TEXT */}
          <Text style={styles.designerWelcome}>WELCOME TO</Text>

          {/* RESPONSIVE LOGO */}
          <Image
            source={LogoImage}
            style={[styles.logoImage, { width: width * 0.55, height: height * 0.1 }]}
            resizeMode="contain"
          />

          <Text style={styles.tagline}>Your Journey, Curated</Text>

          <Text style={styles.subTagline}>
            Discover flights, stays and experiences tailored just for you.
          </Text>

          {/* CTA BUTTON */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.primaryCta, { marginTop: height * 0.04 }]}
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

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* SOCIAL BUTTONS */}
          <View style={styles.socialRow}>
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

          {/* TRUST BADGES */}
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

          {/* SIGN-IN */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
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

  backgroundImage: {
    width: "100%",
    minHeight: height,
    justifyContent: "flex-start",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 16 : 60,
    paddingBottom: 40,
  },

  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5, 8, 22, 0.45)",
  },

  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 0.5,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: height * 0.12, // Responsive top gap
  },

  topChip: {
    position: "absolute",
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 8 : 24,
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
  },

  designerWelcome: {
    fontSize: width * 0.08,
    letterSpacing: 6,
    textAlign: "center",
    color: "#F9FAFB",
    fontWeight: "bold",
  },

  logoImage: {
    marginVertical: 12,
  },

  tagline: {
    fontSize: width * 0.055,
    color: "#E5DEFF",
    fontWeight: "800",
    marginTop: 8,
  },

  subTagline: {
    marginTop: 8,
    fontSize: width * 0.032,
    color: "#E5E7EB",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 320,
  },

  primaryCta: {
    width: "94%",
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(248,250,252,0.92)",
  },

  primaryCtaLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  primaryCtaText: {
    marginLeft: 10,
    color: "#020617",
    fontSize: 15,
    fontWeight: "600",
  },

  primaryCtaPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#4f46e5",
  },

  primaryCtaPillText: {
    color: "#F9FAFB",
    fontSize: 10,
    fontWeight: "600",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.03,
    width: "86%",
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(148,163,184,0.6)",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#CBD5F5",
    fontSize: 12,
  },

  socialRow: {
    flexDirection: "row",
    marginTop: height * 0.025,
    width: "78%",
    justifyContent: "space-evenly",
  },

  socialButton: {
    padding: 18,
    borderRadius: 64,
  },

  socialFacebook: {
    backgroundColor: "rgba(37,99,235,0.9)",
  },
  socialGoogle: {
    backgroundColor: "rgba(248,250,252,0.9)",
  },

  trustRow: {
    marginTop: height * 0.03,
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
  },

  signInContainer: {
    flexDirection: "row",
    marginTop: height * 0.03,
  },

  signInText: {
    color: "#E5E7EB",
    fontSize: 14,
  },
  signInLink: {
    color: "#e0aaff",
    fontSize: 15,
    fontWeight: "700",
  },

  footerText: {
    marginTop: height * 0.03,
    color: "#F3EAFE",
    fontSize: 13,
    textAlign: "center",
    maxWidth: 320,
  },

  footerTextSmall: {
    marginTop: 8,
    color: "#CBD5F5",
    fontSize: 11,
    textAlign: "center",
    maxWidth: 340,
  },

  linkText: {
    color: "#c77dff",
    fontWeight: "700",
  },
});
