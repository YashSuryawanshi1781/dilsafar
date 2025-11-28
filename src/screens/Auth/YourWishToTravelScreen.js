// src/screens/Auth/YourWishToTravelScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import BaseStepScreen from "./BaseStepScreen";
import SearchIcon from "../../assets/icons/search.svg";

const placeImages = {
  Gujarat: require("../../assets/images/places/gujrat.jpg"),
  Goa: require("../../assets/images/places/goa.jpg"),
  Kashmir: require("../../assets/images/places/kashmir.jpg"),
  Kerala: require("../../assets/images/places/kerala.jpg"),
  Hampi: require("../../assets/images/places/hampi.jpg"),
  Sikkim: require("../../assets/images/places/sikkim.jpg"),
  Manali: require("../../assets/images/places/manali.jpg"),
  Rajasthan: require("../../assets/images/places/rajasthan.jpg"),
};

export default function YourWishToTravelScreen({ navigation }) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const { width } = useWindowDimensions();

  // ⭐ SAME RESPONSIVE LOGIC AS PlacesYouExploredScreen
  const cardWidth = (width - 50) / 2.2;
  const cardHeight = cardWidth * 0.45;
  const borderRadius = cardWidth * 0.22;

  const places = [
    { name: "Gujarat", img: placeImages.Gujarat },
    { name: "Goa", img: placeImages.Goa },
    { name: "Kashmir", img: placeImages.Kashmir },
    { name: "Kerala", img: placeImages.Kerala },
    { name: "Hampi", img: placeImages.Hampi },
    { name: "Sikkim", img: placeImages.Sikkim },
    { name: "Manali", img: placeImages.Manali },
    { name: "Rajasthan", img: placeImages.Rajasthan },
  ];

  const filtered = places.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (place) => {
    selected.includes(place)
      ? setSelected(selected.filter((x) => x !== place))
      : setSelected([...selected, place]);
  };

  const handleNext = () => {
    navigation.navigate("BioScreen");
  };

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={6}
      totalSteps={7}
      title="Your wish to travel"
      subtitle="Pick the places that call you. We’ll help you meet people who share your travel dreams."
      onNext={handleNext}
    >
      {/* Search Box */}
      <View style={styles.searchBox}>
        <SearchIcon width={18} height={18} style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={{ flex: 1, fontSize: 15 }}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Responsive Grid */}
      <View style={styles.grid}>
        {filtered.map((item, index) => {
          const isSelected = selected.includes(item.name);

          return (
            <TouchableOpacity
              key={index}
              style={[
                {
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius,
                },
                styles.placeCard,
                isSelected && styles.selectedCard,
              ]}
              onPress={() => toggleSelect(item.name)}
            >
              <Image
                source={item.img}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius,
                }}
              />

              <View style={[styles.overlay, { borderRadius }]} />

              <Text style={[styles.placeText, { fontSize: width * 0.045 }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </BaseStepScreen>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  placeCard: {
    overflow: "hidden",
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedCard: {
    borderWidth: 3,
    borderColor: "#A04DFF",
    shadowColor: "#A04DFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  placeText: {
    position: "absolute",
    color: "#fff",
    fontWeight: "700",
  },
});
