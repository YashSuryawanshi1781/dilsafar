import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

// SVG imports
import WelcomeSvg from '../../assets/images/welcome.svg';
import PhoneIcon from '../../assets/icons/phone.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import GoogleIcon from '../../assets/icons/google.svg';

const { width, height } = Dimensions.get('window');

// Utility to scale UI
const scale = width / 390;   // Base Figma width
const vScale = height / 844; // Base Figma height

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Top Illustration */}
      <View style={styles.topImageWrapper}>
        <WelcomeSvg width={width} height={434 * vScale} />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>

        {/* Continue with Phone */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PhoneNumber')}
        >
          <PhoneIcon width={22 * scale} height={22 * scale} style={styles.icon} />
          <Text style={styles.buttonText}>Continue With Phone</Text>
        </TouchableOpacity>

        {/* Continue with Facebook */}
        <TouchableOpacity style={styles.button}>
          <FacebookIcon width={22 * scale} height={22 * scale} style={styles.icon} />
          <Text style={styles.buttonText}>Continue With Facebook</Text>
        </TouchableOpacity>

        {/* Continue with Google */}
        <TouchableOpacity style={styles.button}>
          <GoogleIcon width={22 * scale} height={22 * scale} style={styles.icon} />
          <Text style={styles.buttonText}>Continue With Google</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.link}>Sign In</Text>
        </Text>

        {/* Disclaimer */}
        <Text style={styles.smallText}>
          We’ll never share anything without your permission
        </Text>

        <Text style={styles.smallText}>
          By signing up, you agree to our <Text style={styles.link}>terms and conditions</Text>,{' '}
          learn how we use your data in our <Text style={styles.link}>privacy policy</Text>
        </Text>

      </View>
    </View>
  );
}

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  topImageWrapper: {
    width: width,
    height: 400 * vScale,
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  buttonContainer: {
    paddingTop: 20 * vScale,
    paddingHorizontal: 20 * scale,
    alignItems: 'center',
  },

  button: {
    width: 347 * scale,
    height: 68 * vScale,
    borderWidth: 1.2,
    borderColor: '#DADADA',
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16 * vScale,
    backgroundColor: '#FFF',
    elevation: 2,
    paddingHorizontal: 0,
  },

  icon: {
    marginRight: 10 * scale,
  },

  buttonText: {
    fontSize: 17 * scale,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },

  loginText: {
    marginTop: 4 * vScale,
    fontSize: 14 * scale,
    color: '#777',
    textAlign: 'center',
  },

  link: {
    color: '#9A4AFF',
    fontWeight: '600',
  },

  smallText: {
    marginTop: 10 * vScale,
    fontSize: 12 * scale,
    lineHeight: 16 * vScale,
    textAlign: 'center',
    color: '#888',
    paddingHorizontal: 20 * scale,
  },
});
