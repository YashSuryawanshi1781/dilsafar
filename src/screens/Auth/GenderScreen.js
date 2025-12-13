// src/screens/Auth/GenderScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';

import BaseStepScreen from './BaseStepScreen';

/* 👉 BACKGROUND SVG */
import GenderVector from '../../assets/vectors/gendervector.svg';
import LockIcon from '../../assets/icons/lock.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/* ---- SVG ORIGINAL SIZE (match your SVG viewBox) ---- */
const GENDER_ORIGINAL = { width: 300, height: 500 };
const genderScale = SCREEN_WIDTH / GENDER_ORIGINAL.width;

const GENDER_SVG_RENDER = {
  width: SCREEN_WIDTH,
  height: GENDER_ORIGINAL.height * genderScale - 40,
};

export default function GenderScreen({ navigation }) {
  const [selected, setSelected] = useState('man');

  const handleNext = () => {
    navigation.navigate('FaceScanScreen');
  };

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={3}
      totalSteps={7}
      title="Which gender best describes you?"
      onNext={handleNext}
    >
      {/* LEFT-ALIGNED SUBTITLE (handled here) */}
      <Text style={styles.subtitle}>
        Pick the gender that best describes you. You can update it later if you
        want.
      </Text>

      {/* SVG BACKGROUND */}
      <GenderVector
        width={GENDER_SVG_RENDER.width}
        height={GENDER_SVG_RENDER.height}
        style={styles.svgBackground}
      />

      {/* CONTENT */}
      <View style={styles.content}>
        {/* MAN */}
        <Pressable
          onPress={() => setSelected('man')}
          style={({ pressed, hovered }) => [
            styles.option,
            selected === 'man' && styles.optionActive,
            hovered && styles.optionHover,
            pressed && styles.optionPressed,
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selected === 'man' && styles.optionTextActive,
            ]}
          >
            I'm a man
          </Text>
        </Pressable>

        {/* WOMAN */}
        <Pressable
          onPress={() => setSelected('woman')}
          style={({ pressed, hovered }) => [
            styles.option,
            selected === 'woman' && styles.optionActive,
            hovered && styles.optionHover,
            pressed && styles.optionPressed,
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selected === 'woman' && styles.optionTextActive,
            ]}
          >
            I'm a woman
          </Text>
        </Pressable>

        {/* OTHER */}
        <Pressable
          onPress={() => setSelected('other')}
          style={({ pressed, hovered }) => [
            styles.option,
            selected === 'other' && styles.optionActive,
            hovered && styles.optionHover,
            pressed && styles.optionPressed,
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selected === 'other' && styles.optionTextActive,
            ]}
          >
            Another gender
          </Text>
        </Pressable>
      </View>
      <View style={styles.footerNote}>
        <LockIcon width={14} height={14} />
        <Text style={styles.footerText}>
          You can always update this later. We got you
        </Text>
      </View>
    </BaseStepScreen>
  );
}

const styles = StyleSheet.create({
  /* SUBTITLE */
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: -28,
    marginBottom: 24,
    alignSelf: 'flex-start', // 👈 LEFT ALIGN
    textAlign: 'left',
    maxWidth: '90%',
  },

  /* SVG background */
  svgBackground: {
    position: 'absolute',
    top: 80,
    left: 0,
    zIndex: 0,
    pointerEvents: 'none',
  },

  content: {
    zIndex: 1,
    width: '100%',
  },

  option: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    transitionDuration: '150ms', // 👈 web smoothness
  },

  optionActive: {
    borderColor: '#C28FF5',
    backgroundColor: '#F3E5FF',
  },

  optionHover: {
    borderColor: '#C28FF5',
    backgroundColor: '#FAF5FF',
    transform: [{ scale: 1.02 }],
  },

  optionPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  optionText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#555',
  },

  optionTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  footerNote: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  footerText: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
  },
});
