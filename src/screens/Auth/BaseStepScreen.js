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
      <ScrollView contentContainerStyle={styles.centerContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {children}
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={onNext}>
          <LinearGradient
            colors={['#6A5AE0', '#8A6FF0']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{nextText}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: { paddingTop: 50, paddingLeft: 20, paddingBottom: 10, width: 50 },
  centerContent: { paddingHorizontal: 30, alignItems: 'center' },
  title: { fontSize: 26, fontFamily: 'Roboto', fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 16, fontFamily: 'Roboto', color: '#5A5A5A', marginBottom: 30, textAlign: 'center' },
  footer: { paddingHorizontal: 24, paddingBottom: 40 },
  button: { paddingVertical: 16, borderRadius: 35, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 17, fontFamily: 'Roboto', fontWeight: '700' },
});
