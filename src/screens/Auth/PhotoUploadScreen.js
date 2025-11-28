// src/screens/Auth/PhotoUploadScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../assets/icons/backarrow.svg';
import GalleryAdd from '../../assets/icons/galleryadd.svg';
import BaseStepScreen from './BaseStepScreen';

export default function PhotoUploadScreen({ navigation }) {
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);

  const pickImage = (index) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 3,
      },
      (response) => {
        if (response.didCancel) return;

        if (response.assets && response.assets.length > 0) {
          const updated = [...photos];
          response.assets.forEach((img, i) => {
            if (index + i < updated.length) updated[index + i] = img.uri;
          });
          setPhotos(updated);
        }
      }
    );
  };

  const handleNext = () => {
    navigation.navigate('PlacesYouExploredScreen');
  };

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={4}
      totalSteps={7}
      title="Choose your photos"
      subtitle="Upload at least 3 photos to get started"
      onNext={handleNext}
    >
      <ScrollView contentContainerStyle={styles.grid}>
        {photos.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageBox}
            onPress={() => pickImage(index)}
            activeOpacity={0.7}
          >
            {item ? (
              <Image source={{ uri: item }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <View style={styles.iconCircle}>
                  <GalleryAdd width={30} height={30} />
                </View>
                <Text style={styles.addText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BaseStepScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageBox: {
    width: '30%',
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#EDEDED',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  addText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#777',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
});
