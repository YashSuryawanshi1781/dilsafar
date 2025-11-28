// src/components/Stepper.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Stepper({ totalSteps, currentStep }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index < currentStep ? styles.completed : styles.pending,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  step: {
    height: 8,
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  completed: {
    backgroundColor: '#6A5AE0',
  },
  pending: {
    backgroundColor: '#D3D3D3',
  },
});
