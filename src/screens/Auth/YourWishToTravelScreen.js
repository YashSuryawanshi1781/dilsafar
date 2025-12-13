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
  FlatList,
  Dimensions
} from "react-native";

import BaseStepScreen from "./BaseStepScreen";
import SearchIcon from "../../assets/icons/search.svg";
import PlacesExploredVector from "../../assets/vectors/wishtoexplore.svg";

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
  const [suggestions, setSuggestions] = useState([]);

  const GOOGLE_API_KEY = "AIzaSyCcRhBaB3nT_NcBXklHECienWkIQ-n83-g";

  const { width } = useWindowDimensions();

  // Responsive UI
  const cardWidth = (width - 50) / 2.2;
  const cardHeight = cardWidth * 0.45;
  const borderRadius = cardWidth * 0.22;

  // Dynamic + Static Places
  const [places, setPlaces] = useState([
    { name: "Gujarat", img: placeImages.Gujarat },
    { name: "Goa", img: placeImages.Goa },
    { name: "Kashmir", img: placeImages.Kashmir },
    { name: "Kerala", img: placeImages.Kerala },
    { name: "Hampi", img: placeImages.Hampi },
    { name: "Sikkim", img: placeImages.Sikkim },
    { name: "Manali", img: placeImages.Manali },
    { name: "Rajasthan", img: placeImages.Rajasthan },
  ]);

  // Google Places API
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
    } catch (error) {
      console.log("Places API Error:", error);
    }
  };

  const handleSearchChange = (text) => {
    setSearch(text);
    fetchPlaces(text);
  };

  const toggleSelect = (place) => {
    selected.includes(place)
      ? setSelected(selected.filter((x) => x !== place))
      : setSelected([...selected, place]);
  };

  // Add custom place on Enter
  const handleSearchSubmit = () => {
    if (!search.trim()) return;

    const exists = places.some(
      (p) => p.name.toLowerCase() === search.toLowerCase()
    );

    if (!exists) {
      setPlaces([...places, { name: search, img: null }]);
      toggleSelect(search);
    }

    setSearch("");
    setSuggestions([]);
  };

  const handleNext = () => {
    navigation.navigate("TravelStyleScreen");
  };

  const filtered = places.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  /* ---- SVG ORIGINAL SIZE (match biovector.svg viewBox) ---- */
  const PLACES_ORIGINAL = { width: 300, height: 440 };
  const placesScale = SCREEN_WIDTH / PLACES_ORIGINAL.width;

  const PLACES_SVG_RENDER = {
    width: SCREEN_WIDTH + 80,
    height: PLACES_ORIGINAL.height * placesScale - 40,
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
      <PlacesExploredVector
        width={PLACES_SVG_RENDER.width}
        height={PLACES_SVG_RENDER.height}
        style={styles.svgBackground} />
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

      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  const city = item.terms[0]?.value || item.description;

                  const exists = places.some(
                    (p) => p.name.toLowerCase() === city.toLowerCase()
                  );
                  if (!exists) setPlaces([...places, { name: city, img: null }]);
                  toggleSelect(city);
                  setSearch("");
                  setSuggestions([]);
                }}
              >
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Responsive Grid */}
      <View style={styles.grid}>
        {/* Selected items first */}
        {selected
          .map((name) => places.find((p) => p.name === name))
          .filter(Boolean) // remove nulls
          .map((item, index) => {
            const hasImage = !!item.img;
            return (
              <TouchableOpacity
                key={`selected-${index}`}
                style={[
                  styles.placeCard,
                  {
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius,
                    backgroundColor: hasImage ? "#cfe0fbff" : "#A04DFF",
                    borderWidth: hasImage ? 3 : 0,
                    borderColor: hasImage ? "#A04DFF" : "transparent",
                  },
                ]}
                onPress={() => toggleSelect(item.name)}
                activeOpacity={0.7}
              >
                {hasImage ? (
                  <>
                    <Image
                      source={item.img}
                      style={{ width: "100%", height: "100%", borderRadius }}
                    />
                    <View style={[styles.overlay, { borderRadius }]} />
                    <Text style={[styles.placeText, { fontSize: width * 0.045 }]}>
                      {item.name}
                    </Text>
                  </>
                ) : (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                      {item.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

        {/* Filtered unselected items */}
        {filtered
          .filter((item) => !selected.includes(item.name))
          .map((item, index) => {
            const hasImage = !!item.img;
            return (
              <TouchableOpacity
                key={`filtered-${index}`}
                style={[
                  styles.placeCard,
                  {
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius,
                    backgroundColor: hasImage
                      ? "#cfe0fbff"
                      : "#3B82F6",
                    borderWidth: hasImage && selected.includes(item.name) ? 3 : 0,
                    borderColor:
                      hasImage && selected.includes(item.name)
                        ? "#A04DFF"
                        : "transparent",
                  },
                ]}
                onPress={() => toggleSelect(item.name)}
                activeOpacity={0.7}
              >
                {hasImage ? (
                  <>
                    <Image
                      source={item.img}
                      style={{ width: "100%", height: "100%", borderRadius }}
                    />
                    <View style={[styles.overlay, { borderRadius }]} />
                    <Text style={[styles.placeText, { fontSize: width * 0.045 }]}>
                      {item.name}
                    </Text>
                  </>
                ) : (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                      {item.name}
                    </Text>
                  </View>
                )}
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
  svgBackground: {
    position: "absolute",
    top: 80,
    left: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 6,
    marginBottom: 10,
    elevation: 3,
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxHeight: 50, // optional, prevents stretching too long
  },

  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  suggestionText: {
    fontSize: 15,
    color: "#333",
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
});
