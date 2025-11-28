import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import LikeIcon from "../../assets/images/like.svg";

export default function LikesScreen({ navigation }) {
  const likedUsers = [
    {
      id: "1",
      name: "Natasha",
      age: 20,
      location: "Mumbai",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress",
    },
    {
      id: "2",
      name: "Priya",
      age: 21,
      location: "Delhi",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress",
    },
    {
      id: "3",
      name: "Aarohi",
      age: 22,
      location: "Pune",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress",
    },
  ];

  const renderUser = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name}>
          {item.name}, <Text style={styles.age}>{item.age}</Text>
        </Text>

        <Text style={styles.location}>{item.location}</Text>
      </View>

      {/* Like icon */}
      <LikeIcon width={26} height={26} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Likes</Text>

      {/* If Likes Exist */}
      {likedUsers.length > 0 ? (
        <FlatList
          data={likedUsers}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      ) : (
        <View style={styles.emptyState}>
          <LikeIcon width={55} height={55} style={styles.likeIcon} />

          <Text style={styles.title}>No Likes Yet</Text>

          <Text style={styles.subtitle}>
            When someone likes you, they will appear here.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={styles.buttonText}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#6A2BFF",
    marginBottom: 20,
  },

  /* ---------- CARD ---------- */
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },

  info: { flex: 1 },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  age: {
    fontWeight: "400",
    color: "#555",
  },

  location: {
    fontSize: 14,
    marginTop: 3,
    color: "#6A2BFF",
  },

  /* ---------- EMPTY STATE ---------- */
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },

  illustration: {
    width: 220,
    height: 220,
    opacity: 0.8,
    marginBottom: 25,
  },

  likeIcon: {
    position: "absolute",
    right: 10,
    bottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 26,
    paddingHorizontal: 30,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#6A5AE0",
    paddingVertical: 14,
    paddingHorizontal: 34,
    borderRadius: 12,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
