import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import PhoneNumberScreen from '../screens/Auth/PhoneNumberScreen';
import OTPScreen from '../screens/Auth/OTPScreen';
import ProfileScreen from '../screens/Auth/ProfileScreen';
import BirthdayScreen from '../screens/Auth/BirthdayScreen';
import GenderScreen from '../screens/Auth/GenderScreen';
import PhotoUploadScreen from '../screens/Auth/PhotoUploadScreen';
import PlacesYouExploredScreen from '../screens/Auth/PlacesYouExploredScreen';
import YourWishToTravelScreen from '../screens/Auth/YourWishToTravelScreen';
import BioScreen from '../screens/Auth/BioScreen';
import BottomTabs from './BottomTabs'; // <-- import bottom tabs
import EditProfileScreen from '../screens/Auth/EditProfileScreen';
import UserDetailScreen from '../screens/Auth/UserDetailScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth Flow */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="BirthdayScreen" component={BirthdayScreen} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
      <Stack.Screen name="PlacesYouExploredScreen" component={PlacesYouExploredScreen} />
      <Stack.Screen name="YourWishToTravelScreen" component={YourWishToTravelScreen} />
      <Stack.Screen name="BioScreen" component={BioScreen} />

      {/* Main App with Bottom Tabs */}
      <Stack.Screen name="MainApp" component={BottomTabs} />

      {/* Other Screens */}
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
    </Stack.Navigator>
  );
}
