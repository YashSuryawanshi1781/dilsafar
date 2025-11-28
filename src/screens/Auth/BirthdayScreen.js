// src/screens/Auth/BirthdayScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackArrow from '../../assets/icons/backarrow.svg';
import Stepper from '../../components/Stepper';

export default function BirthdayScreen({ navigation }) {
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

  const day = selected ? date.getDate().toString().padStart(2, "0") : "";
  const month = selected ? (date.getMonth() + 1).toString().padStart(2, "0") : "";
  const year = selected ? date.getFullYear().toString() : "";

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <BackArrow width={28} height={28} fill="#000" />
      </TouchableOpacity>

      <Stepper totalSteps={7} currentStep={2} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nice to meet you!</Text>
        <Text style={styles.subtitle}>When’s your birthday?</Text>
        <Text style={styles.smallText}>We use this to show your age</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.box} onPress={() => setShowPicker(true)}>
            <Text style={styles.label}>Day</Text>
            <View style={styles.inputBox}><Text style={styles.inputText}>{day || "--"}</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => setShowPicker(true)}>
            <Text style={styles.label}>Month</Text>
            <View style={styles.inputBox}><Text style={styles.inputText}>{month || "--"}</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => setShowPicker(true)}>
            <Text style={styles.label}>Year</Text>
            <View style={styles.inputBox}><Text style={styles.inputText}>{year || "----"}</Text></View>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            maximumDate={new Date()}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
          />
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>We won't use it for anything else</Text>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={handleContinue} disabled={!selected}>
          <LinearGradient
            colors={selected ? ['#6A5AE0', '#8A6FF0'] : ['#C4C4C4', '#D7D7D7']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  backButton: {
    paddingTop: 50,
    paddingLeft: 22,
    paddingBottom: 10,
    width: 50,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 18,
    color: '#5A5A5A',
    marginBottom: 6,
    textAlign: 'center',
  },

  smallText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
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
  },

  inputBox: {
    width: 70,
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
  },

  footer: {
    marginTop: 25,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 13,
    color: '#333',
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
