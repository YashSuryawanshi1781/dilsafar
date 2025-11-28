import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

// Import your SVG icons
import BackArrow from "../../assets/icons/backarrow.svg";
import AddIcon from "../../assets/icons/galleryadd.svg";

export default function EditProfileScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("Edit"); // Edit / View

  const [name, setName] = useState("Diya Konkani");
  const [age, setAge] = useState("28");
  const [job, setJob] = useState("Designer");
  const [zodiac, setZodiac] = useState("Virgo");
  const [about, setAbout] = useState(
    "Explorer Of Hidden Places, Motorbike Enthusiast, And A Foodie Who Loves Experimenting"
  );

  const [pastTravel, setPastTravel] = useState([
    "Not For Me",
    "Mountains",
    "Non-Smoking",
    "Beach",
  ]);

  const [wishTravel, setWishTravel] = useState(["Goa", "Pune", "Kerala", "Mumbai"]);
  const [travelInterests, setTravelInterests] = useState([
    "Hindi",
    "Konkani",
    "English",
  ]);

  const pickImages = () => {
    launchImageLibrary({ selectionLimit: 3, mediaType: "photo" }, (res) => {
      if (!res.didCancel && res.assets) {
        setImages([...images, ...res.assets].slice(0, 3)); // max 3
      }
    });
  };

  const removeImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  const [newTagType, setNewTagType] = useState(null);
  const [newTagText, setNewTagText] = useState("");
  const removeTag = (type, value) => {
    if (type === "past") setPastTravel(pastTravel.filter((t) => t !== value));
    if (type === "wish") setWishTravel(wishTravel.filter((t) => t !== value));
    if (type === "interest") setTravelInterests(travelInterests.filter((t) => t !== value));
  };

  const addTag = (type, value) => {
    if (!value) return;
    if (type === "past") setPastTravel([...pastTravel, value]);
    if (type === "wish") setWishTravel([...wishTravel, value]);
    if (type === "interest") setTravelInterests([...travelInterests, value]);
  };


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow width={28} height={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <Text style={styles.tipText}>
        A Profile With 3 Or More Photos Is 8x More Likely To Get Matches
      </Text>

      {/* Photo Row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.photoRow}>
          {images.map((item, index) => (
            <View key={index} style={styles.photoBox}>
              <Image source={{ uri: item.uri }} style={styles.photo} />
              {activeTab === "Edit" && (
                <TouchableOpacity onPress={() => removeImage(index)} style={styles.closeBtn}>
                  <Text style={{ color: "#fff", fontWeight: "700" }}>×</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {activeTab === "Edit" && images.length < 3 && (
            <TouchableOpacity onPress={pickImages} style={styles.addBox}>
              <AddIcon width={28} height={28} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setActiveTab("Edit")}>
          <Text style={[styles.tab, activeTab === "Edit" && styles.tabActive]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("View")}>
          <Text style={[styles.tab, activeTab === "View" && styles.tabActive]}>View</Text>
        </TouchableOpacity>
      </View>

      {/* Fields */}
      {["Name", "Age", "Job title", "Zodiac sign"].map((label) => {
        let value, setter, placeholder;
        if (label === "Name") (value = name), (setter = setName), (placeholder = "Enter name");
        if (label === "Age") (value = age), (setter = setAge), (placeholder = "Age");
        if (label === "Job title") (value = job), (setter = setJob), (placeholder = "Designer");
        if (label === "Zodiac sign") (value = zodiac), (setter = setZodiac), (placeholder = "Virgo");

        return (
          <View key={label} style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={value}
              onChangeText={setter}
              editable={activeTab === "Edit"}
            />
          </View>
        );
      })}

      {/* About Me */}
      <Text style={styles.sectionTitle}>About me</Text>
      <TextInput
        style={styles.aboutBox}
        multiline
        value={about}
        onChangeText={setAbout}
        editable={activeTab === "Edit"}
      />

      {/* Tags Sections */}
      {[
        { title: "Past travel", data: pastTravel, type: "past" },
        { title: "Wish to travel", data: wishTravel, type: "wish" },
        { title: "Travel interests", data: travelInterests, type: "interest" },
      ].map((section) => (
        <View key={section.title}>
          <Text style={styles.sectionTitle}>{section.title}</Text>

          <View style={styles.tagWrap}>
            {section.data.map((item, index) => (
              <View key={index} style={styles.tagBtn}>
                <Text style={styles.tagText}>{item}</Text>
                {activeTab === "Edit" && (
                  <TouchableOpacity onPress={() => removeTag(section.type, item)} style={{ marginLeft: 6 }}>
                    <Text style={{ color: "#fff", fontWeight: "700" }}>×</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {activeTab === "Edit" && (
              <>
                {newTagType === section.type ? (
                  <View style={[styles.tagBtn, { backgroundColor: "#fff", borderWidth: 1, borderColor: "#6A2BFF" }]}>
                    <TextInput
                      value={newTagText}
                      onChangeText={setNewTagText}
                      placeholder="New tag"
                      style={{ color: "#000", paddingHorizontal: 6, minWidth: 60 }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        if (newTagText.trim()) addTag(section.type, newTagText.trim());
                        setNewTagText("");
                        setNewTagType(null);
                      }}
                    >
                      <Text style={{ color: "#6A2BFF", fontWeight: "700" }}>✓</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setNewTagType(section.type)}
                    style={[styles.tagBtn, { backgroundColor: "#6A2BFF" }]}
                  >
                    <AddIcon width={16} height={16} fill="#fff" />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>

        </View>
      ))}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 14 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#000" },
  tipText: { marginTop: 10, fontSize: 12, color: "#777", textAlign: "center" },

  photoRow: { flexDirection: "row", marginTop: 20, paddingBottom: 5 },
  photoBox: { width: 120, height: 160, borderRadius: 12, marginRight: 10, overflow: "hidden" },
  photo: { width: "100%", height: "100%", borderRadius: 12 },
  addBox: {
    width: 120,
    height: 160,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  closeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#0008",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  tabRow: { flexDirection: "row", justifyContent: "center", marginTop: 20, borderBottomWidth: 1, borderBottomColor: "#eee" },
  tab: { marginHorizontal: 20, paddingBottom: 6, fontWeight: "700", color: "#777" },
  tabActive: { borderBottomWidth: 2, borderColor: "#6A2BFF", color: "#000" },

  field: { marginTop: 25 },
  label: { fontSize: 14, color: "#666", marginBottom: 4 },
  input: { backgroundColor: "#f8f8f8", padding: 12, borderRadius: 10, fontSize: 15 },

  sectionTitle: { marginTop: 25, fontSize: 16, fontWeight: "600", color: "#000" },
  aboutBox: { backgroundColor: "#f8f8f8", borderRadius: 12, padding: 12, marginTop: 10, fontSize: 14, lineHeight: 20 },

  tagWrap: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  tagBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#f2f2f2", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, margin: 5 },
  tagText: { color: "#555" },
});
