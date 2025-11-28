import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from "react-native";

import LinearGradient from "react-native-linear-gradient"; // ADD THIS

// SVG Icons
import SettingsIcon from "../../assets/icons/setting.svg";
import LocationIcon from "../../assets/icons/location.svg";
import EditProfileIcon from "../../assets/icons/editprofile.svg";

const { width } = Dimensions.get("window");

export default function MyProfileScreen({ navigation }) {
    const plans = [
        { id: 1, label: "1 Month", price: 599, cut: 899, tag: "Save 35%" },
        { id: 2, label: "3 Months", price: 1299, cut: 2699, tag: "Save 30%" },
        { id: 3, label: "6 Months", price: 2299, cut: 4299, tag: "New" },
    ];

    const renderPlan = ({ item }) => (
        <LinearGradient
            colors={["#FFFFFFAA", "#FFFFFF"]}
            style={styles.planCard}
        >
            {/* Tag */}
            <View
                style={[
                    styles.planTag,
                    item.tag === "New" && { backgroundColor: "#6A2BFF" },
                ]}
            >
                <Text
                    style={[
                        styles.planTagText,
                        item.tag === "New" && { color: "#fff" },
                    ]}
                >
                    {item.tag}
                </Text>
            </View>

            {/* Plan Info */}
            <View style={{ marginBottom: 12 }}>
                <Text style={styles.planLabel}>{item.label}</Text>
                <Text style={styles.planPrice}>
                    ₹{item.price}{" "}
                    <Text style={styles.planCut}>₹{item.cut}</Text>
                </Text>
            </View>

            {/* Upgrade Button */}
            <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeText}>Upgrade</Text>
            </TouchableOpacity>
        </LinearGradient>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            
            {/* HEADER WITH GRADIENT */}
            <LinearGradient
                colors={["#6A2BFF", "#A68BFF"]}
                style={styles.header}
            >
                <Image
                    source={require("../../assets/images/dilsafar.png")}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <TouchableOpacity>
                    <SettingsIcon width={28} height={28} fill="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            {/* PROFILE */}
            <View style={styles.profileWrapper}>
                <View style={styles.profileCircle}>
                    <Image
                        source={{
                            uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                        }}
                        style={styles.profileImage}
                    />
                </View>

                {/* Completion Badge */}
                <View style={styles.completionBadge}>
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>60%</Text>
                </View>

                {/* Edit Icon */}
                <TouchableOpacity
                    style={styles.editIcon}
                    onPress={() => navigation.navigate("EditProfile")}
                >
                    <EditProfileIcon width={24} height={24} fill="#fff" />
                </TouchableOpacity>

                <Text style={styles.userName}>Diya, 21</Text>
                <View style={styles.locationRow}>
                    <LocationIcon width={16} height={16} fill="#777" />
                    <Text style={styles.locationText}>Panaji, Goa</Text>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>
                Unlock the Journey of{"\n"}Meaningful Connections
            </Text>

            {/* PLANS */}
            <FlatList
                data={plans}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPlan}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, marginTop: 30 }}
                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9F7FF" },

    header: {
        height: 120,
        paddingTop: 50,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 4,
        shadowColor: "#6A2BFF",
    },
    logoImage: { width: 150, height: 40 },

    profileWrapper: { alignItems: "center", marginTop: -50 },
    profileCircle: {
        width: 150,
        height: 150,
        borderRadius: 80,
        borderWidth: 4,
        borderColor: "#fff",
        padding: 3,
        backgroundColor: "#fff",
        shadowColor: "#6A2BFF",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        elevation: 10,
    },
    profileImage: { width: "100%", height: "100%", borderRadius: 75 },

    completionBadge: {
        marginTop: 10,
        backgroundColor: "#6A2BFF",
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 16,
        elevation: 4,
    },

    editIcon: {
        position: "absolute",
        right: width / 3,
        top: 100,
        width: 45,
        height: 45,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6A2BFF",
        elevation: 8,
        shadowColor: "#6A2BFF",
    },

    userName: { marginTop: 20, fontSize: 28, fontWeight: "800", color: "#222" },
    locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
    locationText: { fontSize: 15, color: "#666", marginLeft: 6 },

    title: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 20,
        color: "#222",
        fontWeight: "700",
        lineHeight: 28,
        paddingHorizontal: 16,
    },

    planCard: {
        width: width * 0.58,
        padding: 20,
        borderRadius: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E8DFFF",
        shadowColor: "#A86BFF",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 12,
        elevation: 8,
    },

    planTag: {
        backgroundColor: "#EDE2FF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
        marginBottom: 12,
    },

    planTagText: { fontSize: 12, fontWeight: "700", color: "#6A2BFF" },
    planLabel: { fontSize: 18, fontWeight: "800", marginBottom: 6, color: "#333" },
    planPrice: { fontSize: 22, fontWeight: "700", color: "#222" },
    planCut: { fontSize: 14, color: "#999", textDecorationLine: "line-through" },

    upgradeButton: {
        backgroundColor: "#6A2BFF",
        paddingVertical: 14,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
    },

    upgradeText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});
