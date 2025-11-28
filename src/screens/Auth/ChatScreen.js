import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

export default function ChatScreen({ navigation }) {
  const chats = [
    {
      id: "1",
      name: "Aarav",
      message: "Hey, what's up?",
      time: "9:41 AM",
      unread: 2,
      avatar: require("../../assets/images/Ellipse.png"),
    },
    {
      id: "2",
      name: "Sneha",
      message: "I'll call you later.",
      time: "Yesterday",
      unread: 0,
      avatar: require("../../assets/images/Ellipse.png"),
    },
    {
      id: "3",
      name: "Rohan",
      message: "Did you finish the UI?",
      time: "Mon",
      unread: 1,
      avatar: require("../../assets/images/Ellipse.png"),
    },
    {
      id: "4",
      name: "Mia",
      message: "Okay 👍",
      time: "Sun",
      unread: 0,
      avatar: require("../../assets/images/Ellipse.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatCard}>
      <Image source={item.avatar} style={styles.avatar} />

      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {item.message}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.time}>{item.time}</Text>

        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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

  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 15,
  },

  chatInfo: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
    maxWidth: "90%",
  },

  rightSection: {
    alignItems: "flex-end",
  },

  time: {
    fontSize: 12,
    color: "#999",
  },

  unreadBadge: {
    backgroundColor: "#6A2BFF",
    minWidth: 22,
    height: 22,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 8,
  },

  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
