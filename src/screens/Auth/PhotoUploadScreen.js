// src/screens/Auth/PhotoUploadScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../assets/icons/backarrow.svg';
import GalleryAdd from '../../assets/icons/galleryadd.svg';
import BaseStepScreen from './BaseStepScreen';

export default function PhotoUploadScreen({ navigation }) {
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);
  const [isValid, setIsValid] = useState(false);

  // Check if at least 3 photos are selected
  useEffect(() => {
    const uploadedCount = photos.filter(photo => photo !== null).length;
    setIsValid(uploadedCount >= 3);
  }, [photos]);

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

  const removePhoto = (index) => {
    const updated = [...photos];
    updated[index] = null;
    setPhotos(updated);
  };

  const handleNext = () => {
    if (isValid) {
      navigation.navigate('PlacesYouExploredScreen');
    }
  };

  const uploadedCount = photos.filter(photo => photo !== null).length;

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={4}
      totalSteps={7}
      title="Choose your photos"
      subtitle={`Upload at least 3 photos to get started (${uploadedCount}/3)`}
      onNext={handleNext}
      isButtonDisabled={!isValid}
    >
      <ScrollView contentContainerStyle={styles.grid}>
        {photos.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageBox}
            onPress={() => pickImage(index)}
            onLongPress={() => item && removePhoto(index)}
            activeOpacity={0.7}
          >
            {item ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePhoto(index)}
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
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

      {/* Validation Message */}
      {uploadedCount < 3 && (
        <Text style={styles.validationText}>
          Please upload at least {3 - uploadedCount} more photo{3 - uploadedCount > 1 ? 's' : ''}
        </Text>
      )}
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
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  validationText: {
    textAlign: 'center',
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 20,
  },
});