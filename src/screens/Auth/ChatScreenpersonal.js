// ———————————————————————————————————————————————
// WHATSAPP-STYLE CHAT SCREEN (TEXT + IMAGES ONLY)
// ———————————————————————————————————————————————

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary } from "react-native-image-picker";

export default function ChatScreenPersonal({ route, navigation }) {
  const { user } = route.params;
  const flatListRef = useRef();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  // ---------- Emoji Panel ----------
  const [emojiPanel, setEmojiPanel] = useState(false);

  // ---------- Attachments Panel ----------
  const [attachPanel, setAttachPanel] = useState(false);

  // ---------- Selected Message ----------
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(false);

  // ---------- Auto Scroll ----------
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 50);
  }, [messages]);

  // ------------------------------------------
  // SEND MESSAGE (TEXT + IMAGE)
  // ------------------------------------------
  const sendMessage = (payload = {}) => {
    const newMsg = {
      id: Date.now().toString(),
      text: payload.text || "",
      image: payload.image || null,
      sender: "me",
      time: "now",
      status: "sent",
      replyTo: replyTo ? { id: replyTo.id, text: replyTo.text } : null,
    };

    setMessages((p) => [...p, newMsg]);
    setMessage("");
    setReplyTo(null);

    setTimeout(() => updateStatus(newMsg.id, "delivered"), 500);
    setTimeout(() => updateStatus(newMsg.id, "seen"), 1500);
  };

  const updateStatus = (id, newStatus) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg))
    );
  };

  // ------------------------------------------
  // PICK IMAGE (ONLY)
  // ------------------------------------------
  const pickImage = async () => {
    const res = await launchImageLibrary({ mediaType: "photo" });
    if (res.assets) {
      sendMessage({ image: res.assets[0].uri });
    }
  };

  // ------------------------------------------
  // RENDER MESSAGE BUBBLE
  // ------------------------------------------
  const renderMessage = (item) => (
    <TouchableOpacity
      onLongPress={() => {
        setSelectedMsg(item);
        setOptionsVisible(true);
      }}
    >
      <View
        style={[
          styles.messageBubble,
          item.sender === "me" ? styles.myMsg : styles.otherMsg,
        ]}
      >
        {/* REPLY PREVIEW */}
        {item.replyTo && (
          <View style={styles.replyBubble}>
            <Text style={styles.replyUser}>
              {item.replyTo.sender === "me" ? "You" : user.name}
            </Text>
            <Text numberOfLines={1} style={styles.replyContent}>
              {item.replyTo.text}
            </Text>
          </View>
        )}

        {/* IMAGE */}
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.sentImage} />
        )}

        {/* TEXT */}
        {item.text ? <Text style={styles.msgText}>{item.text}</Text> : null}

        <View style={styles.msgBottomRow}>
          <Text style={styles.msgTime}>{item.time}</Text>

          {item.sender === "me" && (
            <Icon
              name={
                item.status === "seen"
                  ? "done-all"
                  : item.status === "delivered"
                  ? "done-all"
                  : "done"
              }
              size={18}
              color={item.status === "seen" ? "#34B7F1" : "#777"}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Image source={{ uri: user.avatar }} style={styles.avatar} />

        <View>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.online}>Online</Text>
        </View>

        <View style={{ marginLeft: "auto", flexDirection: "row" }}>
          <Icon name="videocam" size={26} color="#fff" style={{ marginRight: 20 }} />
          <Icon name="call" size={26} color="#fff" />
        </View>
      </View>

      {/* ---------------- MESSAGES ---------------- */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => renderMessage(item)}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 10, paddingBottom: 120 }}
      />

      {/* ---------------- ATTACH PANEL ---------------- */}
      <Modal transparent visible={attachPanel} animationType="fade">
        <TouchableOpacity
          style={styles.modalBg}
          onPress={() => setAttachPanel(false)}
        />

        <View style={styles.attachBox}>
          <TouchableOpacity style={styles.attachItem} onPress={pickImage}>
            <Icon name="photo" size={28} color="#fff" />
            <Text style={styles.attachText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.attachItem}>
            <Icon name="camera-alt" size={28} color="#fff" />
            <Text style={styles.attachText}>Camera</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* ---------------- FOOTER ---------------- */}
      <KeyboardAvoidingView behavior="padding">
        {/* REPLY BAR */}
        {replyTo && (
          <View style={styles.replyContainer}>
            <View style={styles.replyLeftBar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.replyToName}>Replying to:</Text>
              <Text numberOfLines={1} style={styles.replyToText}>
                {replyTo.text}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setReplyTo(null)}>
              <Icon name="close" size={18} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footer}>
          {/* EMOJI BUTTON */}
          <TouchableOpacity onPress={() => setEmojiPanel(!emojiPanel)}>
            <Icon name="emoji-emotions" size={28} color="#555" />
          </TouchableOpacity>

          <View style={styles.inputBox}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Message"
              style={styles.input}
              multiline
            />
          </View>

          {/* ATTACH BUTTON */}
          <TouchableOpacity onPress={() => setAttachPanel(true)}>
            <Icon name="attach-file" size={26} color="#555" />
          </TouchableOpacity>

          {/* SEND BUTTON */}
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
              if (message.trim().length) sendMessage({ text: message });
            }}
          >
            <Icon name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* EMOJI PANEL */}
        {emojiPanel && (
          <View style={styles.emojiPanel}>
            <Text>😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 😘 😗</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

// ———————————————————————————————————
// STYLES
// ———————————————————————————————————

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECE5DD" },

  header: {
    height: 60,
    backgroundColor: "#075E54",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  username: { color: "#fff", fontSize: 18, fontWeight: "600" },
  online: { color: "#cceeff", fontSize: 13 },

  messageBubble: {
    padding: 10,
    marginVertical: 6,
    maxWidth: "80%",
    borderRadius: 12,
  },

  myMsg: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },

  otherMsg: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },

  msgText: { fontSize: 16 },
  msgBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  msgTime: { fontSize: 10, color: "#666" },

  sentImage: {
    width: 200,
    height: 140,
    borderRadius: 10,
    marginBottom: 6,
  },

  replyBubble: {
    backgroundColor: "#e6e6e6",
    padding: 6,
    borderRadius: 8,
    marginBottom: 6,
  },
  replyUser: { fontWeight: "600", fontSize: 12 },
  replyContent: { fontSize: 12 },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
  },

  inputBox: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    maxHeight: 120,
  },

  input: { fontSize: 16 },

  sendBtn: {
    backgroundColor: "#075E54",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  emojiPanel: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  modalBg: { flex: 1, backgroundColor: "#00000055" },

  attachBox: {
    backgroundColor: "#075E54",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },

  attachItem: {
    width: "30%",
    alignItems: "center",
    paddingVertical: 20,
  },

  attachText: { color: "#fff", marginTop: 8 },

  replyContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: "#f2f2f2",
  },

  replyLeftBar: {
    width: 3,
    height: 45,
    backgroundColor: "#075E54",
    marginRight: 10,
  },

  replyToName: { fontWeight: "bold", fontSize: 12 },
  replyToText: { color: "#444" },
});
