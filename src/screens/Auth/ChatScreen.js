import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
  Modal,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons"; // optional: for toolbar icons

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ChatListScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const initialChats = [
    {
      id: "1",
      name: "Rahul",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Bro are you coming?",
      time: "10:24 AM",
      unread: 2,
      online: true,
      lastSeen: "Last seen today at 9:30 AM",
      archived: false,
    },
    {
      id: "2",
      name: "Meera",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "Okay, finished!",
      time: "09:12 AM",
      unread: 0,
      online: false,
      lastSeen: "Yesterday 11:20 PM",
      archived: false,
    },
    {
      id: "3",
      name: "Saurabh",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Typing…",
      time: "08:02 AM",
      unread: 1,
      online: true,
      lastSeen: "Online",
      archived: true,
    },
    {
      id: "4",
      name: "Priya",
      avatar: "https://i.pravatar.cc/150?img=4",
      lastMessage: "See you soon!",
      time: "Yesterday",
      unread: 0,
      online: false,
      lastSeen: "Yesterday 7:00 PM",
      archived: false,
    },
  ];

  const [chats, setChats] = useState(initialChats);
  const [selectedChats, setSelectedChats] = useState([]);
  const [actionChat, setActionChat] = useState(null);
  const [showSheet, setShowSheet] = useState(false);
  const [showArchivedList, setShowArchivedList] = useState(false);

  // ---------------- SELECT / UNSELECT CHATS ----------------
  const toggleSelect = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedChats.includes(id)) {
      setSelectedChats((prev) => prev.filter((c) => c !== id));
    } else {
      setSelectedChats((prev) => [...prev, id]);
    }
  };

  const clearSelection = () => setSelectedChats([]);

  const isSelected = (id) => selectedChats.includes(id);

  const selectionMode = selectedChats.length > 0;

  // ---------------- ARCHIVE / UNARCHIVE ----------------
  const toggleArchive = (id) => {
    setChats((prev) => prev.map((chat) => (chat.id === id ? { ...chat, archived: !chat.archived } : chat)));
    // remove from selection if present
    if (isSelected(id)) {
      setSelectedChats((prev) => prev.filter((c) => c !== id));
    }
  };

  // archive/unarchive multiple selected
  const bulkArchive = (archiveFlag = true) => {
    setChats((prev) => prev.map((chat) => (selectedChats.includes(chat.id) ? { ...chat, archived: archiveFlag } : chat)));
    clearSelection();
  };

  const bulkDelete = () => {
    Alert.alert(
      `Delete ${selectedChats.length} chat(s)?`,
      "This will remove the chats locally.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setChats((prev) => prev.filter((c) => !selectedChats.includes(c.id)));
            clearSelection();
          },
        },
      ]
    );
  };

  // ---------------- HOLD ACTIONS (show bottom sheet) ----------------
  const onLongPressChat = (chat) => {
    // enter selection mode if user long-press (like WhatsApp)
    toggleSelect(chat.id);
    // also open action sheet for single long-press (optional)
    setActionChat(chat);
    setShowSheet(true);
  };

  // ---------------- OPEN CHAT SCREEN ----------------
  const openChat = (item) => {
    if (selectionMode) {
      toggleSelect(item.id);
    } else {
      navigation.navigate("ChatScreen", { user: item });
    }
  };

  // ---------------- FILTER SEARCH ----------------
  const filteredChats = chats
    .filter((c) => !c.archived)
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const archivedChats = chats.filter((c) => c.archived);

  // ---------------- SWIPEABLE (left action) ----------------
  const renderLeftActions = (progress, dragX, chat) => {
    // dragX is an Animated node from gesture handler; interpolate safely
    const trans = dragX
      ? dragX.interpolate
        ? dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [-30, 0],
            extrapolate: "clamp",
          })
        : 0
      : 0;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          toggleArchive(chat.id);
        }}
        style={styles.leftAction}
      >
        <Animated.Text style={[styles.actionText, { transform: [{ translateX: trans }] }]}>
          {chat.archived ? "Unarchive" : "Archive"}
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  // ---------------- RENDER ITEM ----------------
  const renderChatItem = ({ item }) => {
    return (
      <Swipeable
        renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item)}
        leftThreshold={30}
        overshootLeft={false}
      >
        <TouchableOpacity
          style={[styles.chatRow, isSelected(item.id) && styles.selectedRow]}
          onLongPress={() => onLongPressChat(item)}
          onPress={() => openChat(item)}
        >
          <View>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            {item.online && <View style={styles.greenDot} />}
            {selectionMode && (
              <View style={[styles.checkbox, isSelected(item.id) && styles.checkboxSelected]}>
                {isSelected(item.id) && <Icon name="check" size={14} color="#fff" />}
              </View>
            )}
          </View>

          <View style={styles.chatContent}>
            <View style={styles.chatRowTop}>
              <Text style={styles.chatName}>{item.name}</Text>
              {item.unread > 0 && <Text style={styles.unreadInline}> • {item.unread}</Text>}
            </View>

            <Text style={styles.lastMsg} numberOfLines={1}>
              {item.lastMessage}
            </Text>
            <Text style={styles.lastSeen}>{item.lastSeen}</Text>
          </View>

          <View style={styles.rightSection}>
            <Text style={styles.time}>{item.time}</Text>
            {item.unread > 0 && (
              <View style={styles.unreadBubble}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
            {item.archived && <Text style={styles.archivedText}>Archived</Text>}
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  // ---------------- TOP SELECTION TOOLBAR ----------------
  const SelectionToolbar = () => {
    if (!selectionMode) return null;
    return (
      <View style={styles.selectionToolbar}>
        <TouchableOpacity onPress={() => clearSelection()} style={styles.toolbarLeft}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>{selectedChats.length} selected</Text>

        <View style={styles.toolbarActions}>
          <TouchableOpacity
            style={styles.toolbarBtn}
            onPress={() => {
              // Archive selected
              bulkArchive(true);
            }}
          >
            <Icon name="archive" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolbarBtn} onPress={bulkDelete}>
            <Icon name="delete" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // ---------------- BOTTOM ACTION SHEET ----------------
  const ActionSheet = () => (
    <Modal transparent visible={showSheet} animationType="slide" onRequestClose={() => setShowSheet(false)}>
      <TouchableOpacity style={styles.sheetOverlay} activeOpacity={1} onPress={() => setShowSheet(false)} />

      <View style={styles.actionSheet}>
        <View style={styles.sheetHandle} />

        <TouchableOpacity
          style={styles.sheetItem}
          onPress={() => {
            if (actionChat) toggleArchive(actionChat.id);
            setShowSheet(false);
          }}
        >
          <Text style={styles.sheetText}>{actionChat?.archived ? "Unarchive" : "Archive"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sheetItem}
          onPress={() => {
            if (actionChat) {
              Alert.alert("Reported", actionChat.name + " has been reported");
            }
            setShowSheet(false);
          }}
        >
          <Text style={[styles.sheetText, { color: "red" }]}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sheetItem}
          onPress={() => {
            if (actionChat) {
              Alert.alert("Blocked", actionChat.name + " has been blocked");
            }
            setShowSheet(false);
          }}
        >
          <Text style={[styles.sheetText, { color: "red" }]}>Block</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.sheetItem, { marginTop: 6 }]} onPress={() => setShowSheet(false)}>
          <Text style={[styles.sheetText, { fontWeight: "600" }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  // ---------------- ARCHIVE HEADER ROW ----------------
  const ArchiveHeader = () => {
    const count = archivedChats.length;
    if (count === 0) return null;
    return (
      <TouchableOpacity
        style={styles.archiveHeader}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setShowArchivedList(!showArchivedList);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="archive" size={20} color="#075E54" />
          <Text style={styles.archiveHeaderText}> Archived ({count})</Text>
        </View>
        <Icon name={showArchivedList ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={22} color="#333" />
      </TouchableOpacity>
    );
  };

  const renderArchivedItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.chatRow, { backgroundColor: "#fafafa" }]}
      onLongPress={() => onLongPressChat(item)}
      onPress={() => {
        if (selectionMode) toggleSelect(item.id);
        else navigation.navigate("ChatScreen", { user: item });
      }}
    >
      <View>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      </View>

      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMsg} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.archivedText}>Archived</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#075E54" barStyle="light-content" />

      {/* Top Header */}
      {!selectionMode ? (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chats</Text>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              Alert.alert("Header button", "Add chat / settings");
            }}
          >
            <Icon name="chat" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <SelectionToolbar />
      )}

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Search" placeholderTextColor="#777" style={styles.searchInput} value={search} onChangeText={setSearch} />
      </View>

      {/* ARCHIVED SECTION HEADER */}
      <ArchiveHeader />

      {/* SHOW ARCHIVED LIST (collapsible) */}
      {showArchivedList && archivedChats.length > 0 && (
        <FlatList data={archivedChats} keyExtractor={(item) => "arch-" + item.id} renderItem={renderArchivedItem} scrollEnabled={false} />
      )}

      {/* CHAT LIST */}
      <FlatList data={filteredChats} keyExtractor={(item) => item.id} renderItem={renderChatItem} contentContainerStyle={{ paddingBottom: 120 }} />

      <ActionSheet />
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 60,
    backgroundColor: "#075E54",
    justifyContent: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  headerBtn: {
    padding: 8,
  },

  // SELECTION TOOLBAR
  selectionToolbar: {
    height: 56,
    backgroundColor: "#075E54",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  toolbarLeft: {
    padding: 6,
    marginRight: 8,
  },
  toolbarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  toolbarActions: {
    flexDirection: "row",
  },
  toolbarBtn: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  searchBar: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  archiveHeader: {
    backgroundColor: "#fff",
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  archiveHeaderText: {
    fontSize: 15,
    color: "#075E54",
    marginLeft: 8,
    fontWeight: "600",
  },

  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.4,
    borderColor: "#ccc",
  },
  selectedRow: {
    backgroundColor: "#e7f4ff",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  greenDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#25D366",
    position: "absolute",
    right: -2,
    bottom: -2,
    borderWidth: 2,
    borderColor: "white",
  },
  checkbox: {
    position: "absolute",
    left: -8,
    top: -8,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#999",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#075E54",
    borderColor: "#075E54",
  },

  chatContent: {
    flex: 1,
    marginLeft: 15,
  },
  chatRowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatName: {
    fontSize: 17,
    fontWeight: "600",
  },
  unreadInline: {
    fontSize: 13,
    color: "#25D366",
    fontWeight: "600",
  },
  lastMsg: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  lastSeen: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 12,
    color: "#555",
  },
  unreadBubble: {
    marginTop: 6,
    backgroundColor: "#25D366",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  archivedText: {
    marginTop: 6,
    fontSize: 11,
    color: "#999",
  },

  // LEFT SWIPE ACTION (archive)
  leftAction: {
    justifyContent: "center",
    backgroundColor: "#e6fff0",
    paddingHorizontal: 20,
  },
  actionText: {
    color: "#075E54",
    fontWeight: "600",
  },

  // BOTTOM ACTION SHEET
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  actionSheet: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 30,
  },

  sheetHandle: {
    width: 45,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 12,
  },

  sheetItem: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: "#e5e5e5",
  },

  sheetText: {
    fontSize: 17,
    color: "#075E54",
  },
});
