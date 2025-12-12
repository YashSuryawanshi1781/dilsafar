// src/screens/Auth/HomeScreen/HomeScreen.styles.js
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export default StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },

    header: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logoHeader: {
        marginTop: 50,
        marginBottom: 10,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    logoImage: {
        width: width * 0.42,
        height: width * 0.09,
        resizeMode: "contain",
    },


    // USER CARD
    card: {
        width: "48%",
        marginTop: 18,
        borderRadius: 16,
        overflow: "hidden",
    },

    cardImage: {
        width: "100%",
        height: 200,
        borderRadius: 16,
    },

    overlay: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "50%",
    },

    textContainer: {
        position: "absolute",
        bottom: 10,
        left: 10,
    },

    name: { fontSize: 18, color: "#fff", fontWeight: "700" },
    age: { fontSize: 16, color: "#fff" },
    location: { fontSize: 14, color: "#fff", marginTop: 2 },

    // SKELETON STYLES
    skeletonCard: {
        width: "48%",
        marginTop: 18,
        backgroundColor: "#eee",
        borderRadius: 16,
        paddingBottom: 10,
    },

    skeletonImage: {
        width: "100%",
        height: 200,
        backgroundColor: "#ddd",
        borderRadius: 16,
    },

    skeletonTextShort: {
        width: "60%",
        height: 12,
        backgroundColor: "#ddd",
        marginTop: 10,
        borderRadius: 6,
        marginLeft: 8,
    },

    skeletonTextLong: {
        width: "40%",
        height: 12,
        backgroundColor: "#ddd",
        marginTop: 6,
        borderRadius: 6,
        marginLeft: 8,
    },
    badgeWrapper: {
        marginTop: 15,
        alignSelf: "flex-start",
    },

});
