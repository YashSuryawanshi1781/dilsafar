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

// Static places always selected
const STATIC_PLACES = [
  { name: "Gujarat", img: Gujarat, isStatic: true },
  { name: "Goa", img: Goa, isStatic: true },
  { name: "Kashmir", img: Kashmir, isStatic: true },
  { name: "Kerala", img: Kerala, isStatic: true },
  { name: "Hampi", img: Hampi, isStatic: true },
  { name: "Sikkim", img: Sikkim, isStatic: true },
  { name: "Manali", img: Manali, isStatic: true },
  { name: "Rajasthan", img: Rajasthan, isStatic: true },
];

export default function PlacesYouExploredScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 50) / 2.2;
  const cardHeight = cardWidth * 0.45;
  const borderRadius = cardWidth * 0.22;

  const [selectedPlaces, setSelectedPlaces] = useState(
    STATIC_PLACES.map((p) => p.name) // static places always selected initially
  );
  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [userAddedPlaces, setUserAddedPlaces] = useState([]);

  const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your key

  const allPlaces = [...STATIC_PLACES, ...userAddedPlaces];

  // Fetch Google places suggestions
  const fetchGooglePlaces = async (query) => {
    if (!query.trim()) {
      setSearchSuggestions([]);
      return;
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${GOOGLE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data?.predictions) setSearchSuggestions(data.predictions);
    } catch (error) {
      console.error(error);
      setSearchSuggestions([]);
    }
  };

  const onSearchChange = (text) => {
    setSearchText(text);
    fetchGooglePlaces(text);
  };

  const togglePlaceSelection = (place) => {
    if (selectedPlaces.includes(place.name)) {
      setSelectedPlaces(selectedPlaces.filter((p) => p !== place.name));
    } else {
      setSelectedPlaces([...selectedPlaces, place.name]);
    }
  };


  const addNewPlace = (cityName) => {
    if (!cityName.trim()) return;

    const exists = allPlaces.some(
      (p) => p.name.toLowerCase() === cityName.toLowerCase()
    );

    if (!exists) {
      const newPlace = { name: cityName, img: null, isStatic: false };
      setUserAddedPlaces([...userAddedPlaces, newPlace]);
    }

    if (!selectedPlaces.includes(cityName)) {
      setSelectedPlaces([...selectedPlaces, cityName]);
    }

    setSearchText("");
    setSearchSuggestions([]);
  };

  const onSearchSubmit = () => addNewPlace(searchText);

  const onSuggestionClick = (suggestion) => {
    const cityName = suggestion.terms[0]?.value || suggestion.description;
    addNewPlace(cityName);
  };

  const handleNext = () => navigation.navigate("YourWishToTravelScreen");

  return (
    <BaseStepScreen
      navigation={navigation}
      currentStep={5}
      totalSteps={7}
      title="Places you've explored"
      subtitle="Pick places you've traveled to"
      onNext={handleNext}
    >
      {/* Search Box */}
      <View style={styles.searchContainer}>
        <SearchIcon width={18} height={18} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={onSearchChange}
          onSubmitEditing={onSearchSubmit}
          returnKeyType="done"
        />
      </View>

      {/* Suggestions Dropdown */}
      {searchSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={searchSuggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => onSuggestionClick(item)}
              >
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Places Grid */}
      <View style={styles.placesGrid}>
        {allPlaces.map((place, index) => {
          const isSelected = selectedPlaces.includes(place.name);
          const hasImage = !!place.img;

          return (
            <TouchableOpacity
              key={`${place.name}-${index}`}
              style={[
                styles.placeCard,
                {
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: borderRadius,
                  backgroundColor: hasImage ? "#cfe0fbff" : isSelected ? "#A04DFF" : "#3B82F6",
                  borderWidth: hasImage && isSelected ? 0 : 3,
                  borderColor: hasImage && isSelected ? "transparent" : "#A04DFF",
                },
              ]}

              onPress={() => togglePlaceSelection(place)}
              activeOpacity={0.7}
            >
              {hasImage ? (
                <>
                  <Image
                    source={place.img}
                    style={[styles.placeImage, { borderRadius }]}
                  />
                  <View
                    style={[styles.imageOverlay, { borderRadius }]}
                  />
                  <Text style={[styles.placeName, { fontSize: width * 0.045 }]}>
                    {place.name}
                  </Text>
                </>
              ) : (
                <Text style={styles.pillText}>{place.name}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </BaseStepScreen>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
  },
  searchInput: { flex: 1, fontSize: 15, marginLeft: 8, color: "#000" },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  suggestionText: { fontSize: 15, color: "#333" },
  placesGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  placeCard: { marginBottom: 18, justifyContent: "center", alignItems: "center", overflow: "hidden" },
  selectedImageCard: { borderWidth: 3, borderColor: "#A04DFF" },
  placeImage: { width: "100%", height: "100%", resizeMode: "cover" },
  imageOverlay: { position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.25)" },
  placeName: { position: "absolute", color: "#fff", fontWeight: "700", textAlign: "center" },
  pillText: { color: "#fff", fontWeight: "700", fontSize: 14, textAlign: "center", paddingHorizontal: 8 },
});
