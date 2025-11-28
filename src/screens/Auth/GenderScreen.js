// src/screens/Auth/GenderScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseStepScreen from './BaseStepScreen';

export default function GenderScreen({ navigation }) {
  const [selected, setSelected] = useState('man');

  const handleNext = () => {
    navigation.navigate('PhotoUploadScreen');
  };

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={3}
      totalSteps={7}
      title="Which gender best describes you?"
      subtitle="Pick the gender that best describes you. You can update it later if you want."
      onNext={handleNext}
    >
      {/* Gender Options */}
      <TouchableOpacity
        style={[styles.option, selected === 'man' && styles.optionActive]}
        onPress={() => setSelected('man')}
      >
        <Text style={[styles.optionText, selected === 'man' && styles.optionTextActive]}>
          I'm a man
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selected === 'woman' && styles.optionActive]}
        onPress={() => setSelected('woman')}
      >
        <Text style={[styles.optionText, selected === 'woman' && styles.optionTextActive]}>
          I'm a woman
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selected === 'other' && styles.optionActive]}
        onPress={() => setSelected('other')}
      >
        <Text style={[styles.optionText, selected === 'other' && styles.optionTextActive]}>
          Another gender
        </Text>
      </TouchableOpacity>
    </BaseStepScreen>
  );
}

const styles = StyleSheet.create({
  option: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  optionActive: {
    borderColor: '#C28FF5',
    backgroundColor: '#F3E5FF',
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
});
