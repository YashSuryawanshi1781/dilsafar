import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../assets/icons/backarrow.svg";

export default function UserDetailScreen({ route }) {
    const navigation = useNavigation();
    const { user } = route.params; // Only the clicked user

    // Gallery only contains the clicked user's image
    const galleryImages = [user.image];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* MAIN IMAGE */}
            <View style={styles.topWrap}>
                <Image source={{ uri: user.image }} style={styles.mainImage} />

                {/* BACK BUTTON */}
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <BackArrow width={24} height={24} fill="#fff" />
                </TouchableOpacity>

                {/* HEART BUTTON */}
                <TouchableOpacity style={styles.heartBtn}>
                    <Text style={{ color: "#fff", fontSize: 22 }}>❤️</Text>
                </TouchableOpacity>

                {/* Name + Active */}
                <View style={styles.topInfo}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.active}>● Active now</Text>
                </View>

                {/* Verified */}
                <View style={styles.verifyRow}>
                    <Text style={{ color: "#6A2BFF", fontSize: 18 }}>✔️</Text>
                    <Text style={styles.verifyText}>Verified</Text>
                </View>
            </View>

            {/* PROFILE QUICK INFO CARD */}
            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text>🎂</Text>
                        <Text style={styles.infoText}>{user.age}</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text>♀️</Text>
                        <Text style={styles.infoText}>Woman</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text>📍</Text>
                        <Text style={styles.infoText}>{user.location}</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text>🍷</Text>
                        <Text style={styles.infoText}>Yes</Text>
                    </View>
                </View>

                <View style={styles.singleLine}>
                    <Text>✨</Text>
                    <Text style={styles.singleLineText}>Capricorn</Text>
                </View>

                <View style={styles.singleLine}>
                    <Text>💼</Text>
                    <Text style={styles.singleLineText}>Lawyer</Text>
                </View>

                <View style={styles.singleLine}>
                    <Text>👥</Text>
                    <Text style={styles.singleLineText}>Open To Connections & Friendship</Text>
                </View>
            </View>

            {/* GALLERY IMAGE */}
            {galleryImages.map((img, index) => (
                <Image
                    key={index}
                    source={{ uri: img }}
                    style={styles.galleryImage}
                />
            ))}

            {/* ABOUT ME */}
            <View style={styles.aboutCard}>
                <Text style={styles.sectionTitle}>About me</Text>
                <Text style={styles.aboutText}>
                    Explorer of hidden places, motorbike enthusiast, and a foodie who likes experimenting.
                </Text>
            </View>

            {/* TRAVEL */}
            <View style={styles.travelCard}>
                <Text style={styles.sectionTitle}>Wish to travel</Text>

                <View style={styles.tagsRow}>
                    {["Mumbai", "Hyderabad", "Bangalore"].map((city) => (
                        <View key={city} style={styles.tag}>
                            <Text style={styles.tagText}>{city}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    topWrap: { position: "relative" },
    mainImage: { width: "100%", height: 400, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    backBtn: {
        position: "absolute",
        top: 40,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 8,
        borderRadius: 30,
        zIndex: 10,
    },
    heartBtn: {
        position: "absolute",
        top: 40,
        right: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 10,
        borderRadius: 30,
    },
    topInfo: { position: "absolute", bottom: 60, left: 20 },
    name: { fontSize: 32, fontWeight: "700", color: "#fff" },
    active: { color: "#fff", marginTop: 4, fontSize: 14 },
    verifyRow: { position: "absolute", bottom: 30, left: 20, flexDirection: "row", alignItems: "center" },
    verifyText: { marginLeft: 6, color: "#fff", fontWeight: "600" },
    infoCard: { backgroundColor: "#fff", marginTop: 20, marginHorizontal: 16, padding: 14, borderRadius: 12, elevation: 2 },
    infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
    infoItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    infoText: { fontSize: 14, color: "#000" },
    singleLine: { flexDirection: "row", paddingVertical: 8, alignItems: "center", gap: 8, borderTopWidth: 1, borderTopColor: "#eee" },
    singleLineText: { fontSize: 14, color: "#000" },
    galleryImage: { width: "92%", height: 270, alignSelf: "center", marginTop: 14, borderRadius: 12 },
    aboutCard: { backgroundColor: "#fff", padding: 16, marginTop: 10, marginHorizontal: 16, borderRadius: 12 },
    sectionTitle: { fontSize: 16, fontWeight: "700", color: "#000" },
    aboutText: { marginTop: 6, fontSize: 14, color: "#444" },
    travelCard: { backgroundColor: "#fff", padding: 16, marginTop: 10, marginHorizontal: 16, borderRadius: 12 },
    tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 10 },
    tag: { backgroundColor: "#F3F3F3", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 18 },
    tagText: { fontSize: 13, color: "#333" },
});
