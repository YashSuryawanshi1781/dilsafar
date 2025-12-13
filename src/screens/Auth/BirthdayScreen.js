// src/screens/Auth/BirthdayScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

import BackArrow from '../../assets/icons/backarrow.svg';
import DobVector from '../../assets/vectors/dobvector.svg';
import Stepper from '../../components/Stepper';
import LockIcon from '../../assets/icons/lock.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/* ---- SVG ORIGINAL SIZE (adjust to your SVG viewBox) ---- */
const DOB_ORIGINAL = { width: 370, height: 700 };
const dobScale = SCREEN_WIDTH / DOB_ORIGINAL.width;

const DOB_SVG_RENDER = {
  width: SCREEN_WIDTH,
  height: DOB_ORIGINAL.height * dobScale - 40,
};

export default function BirthdayScreen({ route, navigation }) {
  const { firstName } = route.params;

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleChange = (event, newDate) => {
    setShowPicker(false);
    if (newDate) {
      setDate(newDate);
      setSelected(true);
    }
  };

  const handleContinue = () => {
    navigation.navigate('GenderScreen');
  };

  const day = selected ? date.getDate().toString().padStart(2, '0') : '';
  const month = selected ? (date.getMonth() + 1).toString().padStart(2, '0') : '';
  const year = selected ? date.getFullYear().toString() : '';

  const topPadding =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || 24
      : 44;

  return (
    <View style={styles.container}>

      {/* SVG BACKGROUND */}
      <DobVector
        width={DOB_SVG_RENDER.width}
        height={DOB_SVG_RENDER.height}
        style={styles.svgBackground}
      />

      {/* BACK BUTTON */}
      <TouchableOpacity
        style={[styles.backButton, { paddingTop: topPadding }]}
        onPress={() => navigation.goBack()}
      >
        <BackArrow width={28} height={28} fill="#000" />
      </TouchableOpacity>

      {/* STEPPER */}
      <View style={styles.stepperWrapper}>
        <Stepper totalSteps={7} currentStep={2} />
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Nice to meet you{firstName ? `, ${firstName}` : ''}.
        </Text>
        <Text style={styles.title}>When’s your birthday?</Text>
        <Text style={styles.smallText}>We use this to show your age</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.box} onPress={() => setShowPicker(true)}>
            <Text style={styles.label}>Day</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{day || ''}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => setShowPicker(true)}>
            <Text style={styles.label}>Month</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{month || ''}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => setShowPicker(true)}>
            <Text style={styles.label}>Year</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{year || ''}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            maximumDate={new Date()}
            display={Platform.OS === 'ios' ? 'spinner' : 'spinner'} //default
            onChange={handleChange}
          />
        )}

        <View style={styles.footerNote}>
          <LockIcon width={14} height={14} />
          <Text style={styles.footerText}>
            We won’t use it for anything else
          </Text>
        </View>

      </ScrollView>

      {/* CONTINUE BUTTON */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={handleContinue} disabled={!selected}>
          <LinearGradient
            colors={
              selected
                ? ['#6A5AE0', '#8A6FF0']
                : ['#C4C4C4', '#D7D7D7']
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  svgBackground: {
    position: 'absolute',
    top: 270,
    left: 0,
    zIndex: 0,
    marginTop: 50,
  },

  backButton: {
    paddingLeft: 22,
    width: 50,
    zIndex: 10,
  },

  stepperWrapper: {
    zIndex: 10,
    marginTop: 12,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 10,
    marginTop: -120,
  },


  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
    textAlign: 'left', 
  },

  smallText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
    textAlign: 'left', 
  },


  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  box: {
    flex: 1,
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },

  inputBox: {
    width: 100,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 14,
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },

  inputText: {
    textAlign: 'center',
    fontSize: 20,
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



  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
});
