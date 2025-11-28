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
  FlatList,
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
  const [suggestions, setSuggestions] = useState([]);

  const GOOGLE_API_KEY = "AIzaSyCcRhBaB3nT_NcBXklHECienWkIQ-n83-g";

  const { width } = useWindowDimensions();
  const cardWidth = (width - 50) / 2.2;
  const cardHeight = cardWidth * 0.45;
  const borderRadius = cardWidth * 0.22;

  // Static places
  const [places, setPlaces] = useState([
    { name: "Gujarat", img: Gujarat },
    { name: "Goa", img: Goa },
    { name: "Kashmir", img: Kashmir },
    { name: "Kerala", img: Kerala },
    { name: "Hampi", img: Hampi },
    { name: "Sikkim", img: Sikkim },
    { name: "Manali", img: Manali },
    { name: "Rajasthan", img: Rajasthan },
  ]);

  // Fetch Google Places suggestions
  const fetchPlaces = async (text) => {
    if (!text) {
      setSuggestions([]);
      return;
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=(cities)&key=${GOOGLE_API_KEY}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json?.predictions) {
        setSuggestions(json.predictions);
      }
    } catch (err) {
      console.log("Places API Error:", err);
    }
  };

  const handleSearchChange = (text) => {
    setSearch(text);
    fetchPlaces(text);
  };

  const toggleSelect = (city) => {
    selected.includes(city)
      ? setSelected(selected.filter((c) => c !== city))
      : setSelected([...selected, city]);
  };

  const handleSearchSubmit = () => {
    if (!search.trim()) return;

    const exists = places.some(
      (p) => p.name.toLowerCase() === search.toLowerCase()
    );

    if (!exists) {
      setPlaces([...places, { name: search, img: null }]);
    }

    toggleSelect(search);
    setSearch("");
    setSuggestions([]);
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
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="done"
        />
      </View>

      {/* Google Autocomplete Dropdown */}
      {suggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  const city = item.terms[0]?.value;

                  const exists = places.some(
                    (p) => p.name.toLowerCase() === city.toLowerCase()
                  );

                  if (!exists) {
                    setPlaces([...places, { name: city, img: null }]);
                  }

                  toggleSelect(city);
                  setSearch("");
                  setSuggestions([]);
                }}
              >
                <Text style={{ fontSize: 15 }}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Responsive Grid - show all places always */}
      <View style={styles.grid}>
        {places.map((item, index) => {
          const isSelected = selected.includes(item.name);

          return (
            <TouchableOpacity
              key={index}
              style={[
                {
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius,
                  backgroundColor: item.img ? "transparent" : "#3B82F6", // BLUE DEFAULT
                },
                styles.placeCard,
                isSelected && styles.selectedCard,
              ]}
              onPress={() => toggleSelect(item.name)}
            >
              {item.img ? (
                <Image
                  source={item.img}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.dynamicPlaceText}>{item.name}</Text>
                </View>
              )}

              {/* Overlay only for images */}
              {item.img && <View style={[styles.overlay, { borderRadius }]} />}

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

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 6,
    marginBottom: 12,
    elevation: 3,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
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

  dynamicPlaceText: {
    color: "#000",
    fontWeight: "700",
  },
});
