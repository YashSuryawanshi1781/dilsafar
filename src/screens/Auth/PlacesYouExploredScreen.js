// src/screens/Auth/PlacesYouExploredScreen.js
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

// Local images
import Gujarat from "../../assets/images/places/gujrat.jpg";
import Goa from "../../assets/images/places/goa.jpg";
import Kashmir from "../../assets/images/places/kashmir.jpg";
import Kerala from "../../assets/images/places/kerala.jpg";
import Hampi from "../../assets/images/places/hampi.jpg";
import Sikkim from "../../assets/images/places/sikkim.jpg";
import Manali from "../../assets/images/places/manali.jpg";
import Rajasthan from "../../assets/images/places/rajasthan.jpg";

export default function PlacesYouExploredScreen({ navigation }) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const { width } = useWindowDimensions();
  const cardWidth = (width - 50) / 2.2; // dynamic 2-column responsive layout
  const cardHeight = cardWidth * 0.45;
  const borderRadius = cardWidth * 0.22;

  const places = [
    { name: "Gujarat", img: Gujarat },
    { name: "Goa", img: Goa },
    { name: "Kashmir", img: Kashmir },
    { name: "Kerala", img: Kerala },
    { name: "Hampi", img: Hampi },
    { name: "Sikkim", img: Sikkim },
    { name: "Manali", img: Manali },
    { name: "Rajasthan", img: Rajasthan },
  ];

  const filtered = places.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (city) => {
    selected.includes(city)
      ? setSelected(selected.filter((c) => c !== city))
      : setSelected([...selected, city]);
  };

  const handleNext = () => {
    navigation.navigate("YourWishToTravelScreen");
  };

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={5}
      totalSteps={7}
      title="Places you’ve explored"
      subtitle="Pick places you’ve traveled to"
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
              onPress={()=> toggleSelect(item.name)}
            >
              <Image
                source={item.img}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius,
                }}
              />

              <View
                style={[
                  styles.overlay,
                  { borderRadius },
                ]}
              />

              <Text
                style={[
                  styles.placeText,
                  { fontSize: width * 0.045 },
                ]}
              >
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
