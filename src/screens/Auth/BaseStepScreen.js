import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../assets/icons/backarrow.svg';
import Stepper from '../../components/Stepper';

export default function BaseStepScreen({
  navigation,
  title,
  subtitle,
  children,
  currentStep,
  totalSteps,
  onNext,
  nextText = "Next",
  isButtonDisabled = false,

}) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <BackArrow width={28} height={28} fill="#000" />
      </TouchableOpacity>

      {/* Stepper */}
      <Stepper currentStep={currentStep} totalSteps={totalSteps} />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* 🔹 HEADER (LEFT ALIGNED) */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {children}
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            isButtonDisabled && styles.disabledButton,
          ]}
          onPress={onNext}
          disabled={isButtonDisabled}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#6A5AE0', '#8A6FF0']}
            style={styles.button}
          >
            <Text
              style={[
                styles.nextText,
                isButtonDisabled && styles.disabledText,
              ]}
            >
              Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  backButton: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingBottom: 10,
    width: 50,
  },

  /* 🔹 MAIN CONTENT */
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  nextText: {
    color: '#FFFFFF', // 👈 WHITE
    fontSize: 16,
    fontWeight: '600',
  },


  /* 🔹 HEADER */
  header: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    textAlign: 'left',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: '#5A5A5A',
    textAlign: 'left',
    maxWidth: '90%',
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.4,
  },

  disabledText: {
    color: '#FFFFFF',
  },

});
