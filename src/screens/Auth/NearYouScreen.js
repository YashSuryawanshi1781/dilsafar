import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import LocationIcon from "../../assets/icons/location.svg";

export default function NearYouScreen() {
  const users = [
    { id: 1, name: "Varun", age: 20, distance: "Goa", active: true, image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress" },
    { id: 2, name: "Natasha", age: 20, distance: "Mumbai", active: false, image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress" },
    { id: 3, name: "Aron", age: 20, distance: "Pune", active: true, image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress" },
    { id: 4, name: "Swizel", age: 20, distance: "Goa", active: false, image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress" },
    { id: 5, name: "Priya", age: 20, distance: "Delhi", active: true, image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress" },
    { id: 6, name: "Jos", age: 20, distance: "Bangalore", active: false, image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress" },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.avatar} />

      {item.active && <View style={styles.activeDot} />}

      <View style={styles.infoBox}>
        <Text style={styles.name}>
          {item.name}, <Text style={styles.age}>{item.age}</Text>
        </Text>

        <View style={styles.distanceRow}>
          <LocationIcon width={16} height={16} fill="#6A2BFF" />
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Near You</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#6A2BFF",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },

  activeDot: {
    width: 14,
    height: 14,
    backgroundColor: "#00D26A",
    borderRadius: 7,
    position: "absolute",
    left: 58,
    top: 60,
    borderWidth: 2,
    borderColor: "#fff",
  },

  infoBox: {
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },

  age: {
    fontSize: 18,
    fontWeight: "400",
    color: "#555",
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  distanceText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#6A2BFF",
    fontWeight: "500",
  },
});
