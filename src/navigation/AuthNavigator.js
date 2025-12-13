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
import FilterScreen from '../screens/Auth/FilterScreen/FilterScreen'
import ChatScreenpersonal from '../screens/Auth/ChatScreenpersonal'
import PurposeSelectionScreen from '../screens/Auth/PurposeSelectionScreen'
import FaceScreen from '../screens/Auth/FaceScanScreen'
import TravelStyleScreen from '../screens/Auth/TravelStyleScreen'
import CosmicConnectionsScreen from '../screens/Auth/CosmicConnectionsScreen'
import CareerCompassScreen from '../screens/Auth/CareerCompassScreen'
import SettingsScreen from '../screens/Auth/SettingsScreen'
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
      <Stack.Screen name="PurposeSelection" component={PurposeSelectionScreen} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="FaceScanScreen" component={FaceScreen} />
      <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
      <Stack.Screen name="PlacesYouExploredScreen" component={PlacesYouExploredScreen} />
      <Stack.Screen name="YourWishToTravelScreen" component={YourWishToTravelScreen} />
      <Stack.Screen name="TravelStyleScreen" component={TravelStyleScreen} />
      <Stack.Screen name="CosmicConnectionsScreen" component={CosmicConnectionsScreen} />
      <Stack.Screen name="CareerCompassScreen" component={CareerCompassScreen} />
      <Stack.Screen name="BioScreen" component={BioScreen} />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />

      {/* Main App with Bottom Tabs */}
      <Stack.Screen name="MainApp" component={BottomTabs} />

      {/* Other Screens */}
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreenpersonal} />

    </Stack.Navigator>
  );
}
