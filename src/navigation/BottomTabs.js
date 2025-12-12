// BottomTabs.js
import React from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Auth/HomeScreen/HomeScreen";
import MyProfileScreen from "../screens/Auth/MyProfileScreen";
import LikesScreen from "../screens/Auth/LikesScreen";
import NearYouScreen from "../screens/Auth/NearYouScreen";
import ChatScreen from "../screens/Auth/ChatScreen";

import LikeIcon from "../assets/images/like.svg";
import LocationIcon from "../assets/icons/location.svg";
import ChatIcon from "../assets/images/chat.svg";
import ProfileIcon from "../assets/images/Ellipse.png"; 
import HomeIcon from "../assets/images/home.png";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#6A2BFF",
        tabBarInactiveTintColor: "#A5A5A5",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 65,
          paddingBottom: 6,
          paddingTop: 6,
          borderTopWidth: 0,
        },

        tabBarIcon: ({ focused }) => {
          const highlightStyle = {
            width: 45,
            height: 45,
            borderRadius: 30,
            backgroundColor: focused ? "#EDE2FF" : "transparent",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: focused ? "#6A2BFF" : "transparent",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: focused ? 0.3 : 0,
            shadowRadius: 4,
          };

          // HOME
          if (route.name === "Home") {
            return (
              <View style={highlightStyle}>
                <Image
                  source={HomeIcon}
                  style={{
                    width: focused ? 30 : 26,
                    height: focused ? 30 : 26,
                    opacity: 1,
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          }

          // LIKES (SVG)
          if (route.name === "Likes") {
            return (
              <View style={highlightStyle}>
                <LikeIcon
                  width={focused ? 32 : 26}
                  height={focused ? 32 : 26}
                  fill={focused ? "#6A2BFF" : "#A5A5A5"}
                />
              </View>
            );
          }

          // NEAR YOU (SVG)
          if (route.name === "NearYou") {
            return (
              <View style={highlightStyle}>
                <LocationIcon
                  width={focused ? 32 : 26}
                  height={focused ? 32 : 26}
                  fill={focused ? "#6A2BFF" : "#A5A5A5"}
                />
              </View>
            );
          }

          // CHAT (SVG)
          if (route.name === "Chat") {
            return (
              <View style={highlightStyle}>
                <ChatIcon
                  width={focused ? 32 : 26}
                  height={focused ? 32 : 26}
                  fill={focused ? "#6A2BFF" : "#A5A5A5"}
                />
              </View>
            );
          }

          // PROFILE (PNG)
          if (route.name === "Profile") {
            return (
              <View style={highlightStyle}>
                <Image
                  source={ProfileIcon}
                  style={{
                    width: focused ? 32 : 26,
                    height: focused ? 32 : 26,
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="NearYou" component={NearYouScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={MyProfileScreen} />
    </Tab.Navigator>
  );
}
