import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

/* Enable animation on Android */
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [lastActive, setLastActive] = useState(true);
  const [legalOpen, setLegalOpen] = useState(false);

  const toggleLegal = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLegalOpen(!legalOpen);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>settings</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Profile */}
      <Text style={styles.section}>Profile</Text>

      <View style={styles.row}>
        <Text style={styles.rowText}>Show Notification</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.rowColumn}>
        <View style={styles.rowTop}>
          <Text style={styles.rowText}>Show Last Active Status</Text>
          <Switch value={lastActive} onValueChange={setLastActive} />
        </View>
        <Text style={styles.subText}>
          people viewing your profile can see your last active status, and you
          can see theirs. your matches won't be shown your active status.
        </Text>
      </View>

      {/* Phone & Email */}
      <Text style={styles.section}>Phone & Email</Text>
      <Text style={styles.value}>+91 9820495527</Text>

      {/* Legal Accordion */}
      <Text style={styles.section}>Legal</Text>

      <TouchableOpacity style={styles.accordionHeader} onPress={toggleLegal}>
        <Text style={styles.rowText}>Legal Information</Text>
        <Text style={styles.arrow}>{legalOpen ? "−" : "+"}</Text>
      </TouchableOpacity>

      {legalOpen && (
        <View style={styles.accordionContent}>
          {[
            "Privacy Policy",
            "Terms Of Service",
            "Cookie Policy",
            "Refund Policy",
          ].map((item) => (
            <TouchableOpacity key={item} style={styles.linkRow}>
              <Text style={styles.link}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Account */}
      <Text style={styles.section}>Account</Text>

      <TouchableOpacity style={styles.linkRow}>
        <Text style={styles.link}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow}>
        <Text style={[styles.link, styles.danger]}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow}>
        <Text style={styles.link}>Deactivate Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  back: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 13,
    color: "#999",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  rowColumn: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowText: {
    fontSize: 14,
  },
  subText: {
    fontSize: 12,
    color: "#777",
    marginTop: 6,
    lineHeight: 16,
  },
  value: {
    fontSize: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  /* Accordion */
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  accordionContent: {
    paddingLeft: 10,
  },
  arrow: {
    fontSize: 18,
    fontWeight: "500",
  },

  linkRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  link: {
    fontSize: 14,
  },
  danger: {
    color: "#E53935",
  },
});
