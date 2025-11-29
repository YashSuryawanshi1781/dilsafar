// // src/screens/Auth/PhotoUploadScreen.js
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Platform,
//   Alert,
// } from 'react-native';

// import { launchImageLibrary } from 'react-native-image-picker';
// import RNFS from 'react-native-fs';

// import BaseStepScreen from './BaseStepScreen';
// import GalleryAdd from '../../assets/icons/galleryadd.svg';

// // --------------------------------------------------
// //  CLOUD VISION API KEY
// // --------------------------------------------------
// const CLOUD_VISION_API_KEY = "AIzaSyCcRhBaB3nT_NcBXklHECienWkIQ-n83-g";

// // --------------------------------------------------
// //  CLOUD VISION FACE DETECTION FUNCTION
// // --------------------------------------------------
// async function detectFaceCloudVision(base64) {
//   const body = {
//     requests: [
//       {
//         image: { content: base64 },
//         features: [{ type: "FACE_DETECTION", maxResults: 5 }],
//       },
//     ],
//   };

//   try {
//     const response = await fetch(
//       `https://vision.googleapis.com/v1/images:annotate?key=${CLOUD_VISION_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       }
//     );

//     const json = await response.json();

//     // Log response for debugging
//     console.log("Cloud Vision API response:", json);

//     return json?.responses?.[0]?.faceAnnotations || [];
//   } catch (error) {
//     console.log("Vision API Error:", error);
//     return [];
//   }
// }

// // --------------------------------------------------

// export default function PhotoUploadScreen({ navigation }) {
//   const [photos, setPhotos] = useState([null, null, null, null, null, null]);
//   const [isValid, setIsValid] = useState(false);

//   // Validate number of uploaded photos
//   useEffect(() => {
//     const uploaded = photos.filter((p) => p !== null).length;
//     setIsValid(uploaded >= 3);
//   }, [photos]);

//   // --------------------------------------------------
//   //  PICK IMAGE
//   // --------------------------------------------------
//   const pickImage = async (index) => {
//     launchImageLibrary(
//       {
//         mediaType: "photo",
//         quality: 1,
//         includeBase64: false,
//         selectionLimit: 1,
//       },
//       async (response) => {
//         if (response.didCancel) return;

//         const img = response.assets?.[0];
//         if (!img) return;

//         let filePath = img.uri;

//         // Fix for Android content:// URI
//         if (Platform.OS === "android" && filePath.startsWith("content://")) {
//           const dest = `${RNFS.ExternalDirectoryPath}/temp_${Date.now()}.jpg`;
//           await RNFS.copyFile(filePath, dest);
//           filePath = dest;
//         }

//         // Remove file:// prefix
//         filePath = filePath.replace("file://", "");

//         try {
//           // Convert to Base64
//           const base64Image = await RNFS.readFile(filePath, "base64");

//           // Run Cloud Vision API face detection
//           const faces = await detectFaceCloudVision(base64Image);

//           if (!faces || faces.length === 0) {
//             Alert.alert(
//               "Face Required",
//               "Please upload a clear photo containing your face."
//             );
//             return;
//           }

//           if (faces.length > 1) {
//             Alert.alert(
//               "One Person Only",
//               "Upload a photo with only YOUR face."
//             );
//             return;
//           }

//           // Face size validation
//           const face = faces[0];
//           const v = face?.boundingPoly?.vertices;

//           const x1 = v?.[0]?.x || 0;
//           const x2 = v?.[1]?.x || 0;
//           const faceWidth = Math.abs(x2 - x1);

//           if (faceWidth < 80) {
//             Alert.alert(
//               "Too Far",
//               "Your face is too small. Please upload a clearer close-up."
//             );
//             return;
//           }

//           // Save image
//           const updated = [...photos];
//           updated[index] = img.uri;
//           setPhotos(updated);
//         } catch (e) {
//           console.log("Image error:", e);
//           Alert.alert("Error", "Something went wrong while processing the image.");
//         }
//       }
//     );
//   };

//   // --------------------------------------------------
//   //  REMOVE IMAGE
//   // --------------------------------------------------
//   const removePhoto = (index) => {
//     const updated = [...photos];
//     updated[index] = null;
//     setPhotos(updated);
//   };

//   // --------------------------------------------------
//   //  HANDLE NEXT
//   // --------------------------------------------------
//   const handleNext = () => {
//     if (!isValid) return;
//     navigation.navigate("PlacesYouExploredScreen");
//   };

//   const uploaded = photos.filter((p) => p !== null).length;

//   return (
//     <BaseStepScreen
//       navigation={navigation}
//       currentStep={4}
//       totalSteps={7}
//       title="Choose your photos"
//       subtitle={`Upload at least 3 photos (${uploaded}/3)`}
//       onNext={handleNext}
//       isButtonDisabled={!isValid}
//     >
//       <ScrollView contentContainerStyle={styles.grid}>
//         {photos.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.imageBox}
//             onPress={() => pickImage(index)}
//             onLongPress={() => item && removePhoto(index)}
//             activeOpacity={0.7}
//           >
//             {item ? (
//               <View style={styles.imageContainer}>
//                 <Image source={{ uri: item }} style={styles.image} />
//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => removePhoto(index)}
//                 >
//                   <Text style={styles.removeText}>✕</Text>
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View style={styles.placeholder}>
//                 <View style={styles.iconCircle}>
//                   <GalleryAdd width={30} height={30} />
//                 </View>
//                 <Text style={styles.addText}>Add Photo</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {!isValid && (
//         <Text style={styles.validationText}>
//           Upload {3 - uploaded} more photo{3 - uploaded > 1 ? "s" : ""}
//         </Text>
//       )}
//     </BaseStepScreen>
//   );
// }

// // --------------------------------------------------
// //                    STYLES
// // --------------------------------------------------
// const styles = StyleSheet.create({
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   imageBox: {
//     width: "30%",
//     height: 120,
//     backgroundColor: "#F5F5F5",
//     borderRadius: 14,
//     marginBottom: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   placeholder: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   iconCircle: {
//     width: 50,
//     height: 50,
//     backgroundColor: "#EDEDED",
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   addText: {
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#777",
//   },
//   imageContainer: {
//     width: "100%",
//     height: "100%",
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 14,
//   },
//   removeButton: {
//     position: "absolute",
//     top: 4,
//     right: 4,
//     width: 24,
//     height: 24,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   removeText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   validationText: {
//     textAlign: "center",
//     color: "#FF6B6B",
//     fontSize: 14,
//     fontWeight: "500",
//     marginTop: 10,
//     marginBottom: 20,
//   },
// });
// src/screens/Auth/PhotoUploadScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import BaseStepScreen from './BaseStepScreen';
import GalleryAdd from '../../assets/icons/galleryadd.svg';

export default function PhotoUploadScreen({ navigation }) {
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);
  const [isValid, setIsValid] = useState(false);

  // Validate number of uploaded photos
  useEffect(() => {
    const uploaded = photos.filter((p) => p !== null).length;
    setIsValid(uploaded >= 3);
  }, [photos]);

  // Pick image from gallery
  const pickImage = (index) => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) return;
        const img = response.assets?.[0];
        if (!img) return;

        const updated = [...photos];
        updated[index] = img.uri;
        setPhotos(updated);
      }
    );
  };

  // Remove image
  const removePhoto = (index) => {
    const updated = [...photos];
    updated[index] = null;
    setPhotos(updated);
  };

  // Next button
  const handleNext = () => {
    if (!isValid) return;
    navigation.navigate("PlacesYouExploredScreen");
  };

  const uploaded = photos.filter((p) => p !== null).length;

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={4}
      totalSteps={7}
      title="Choose your photos"
      subtitle={`Upload at least 3 photos (${uploaded}/3)`}
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

      {!isValid && (
        <Text style={styles.validationText}>
          Upload {3 - uploaded} more photo{3 - uploaded > 1 ? "s" : ""}
        </Text>
      )}
    </BaseStepScreen>
  );
}

// --------------------------------------------------
//                    STYLES
// --------------------------------------------------
const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageBox: {
    width: "30%",
    height: 120,
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 50,
    height: 50,
    backgroundColor: "#EDEDED",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  addText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#777",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  validationText: {
    textAlign: "center",
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 20,
  },
});
