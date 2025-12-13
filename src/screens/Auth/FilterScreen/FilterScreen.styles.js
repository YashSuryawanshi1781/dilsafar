import { StyleSheet } from "react-native";

export default StyleSheet.create({
    /* -------- CONTAINER -------- */
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },

    /* -------- HEADER -------- */
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 12,
    },

    /* -------- SEARCH -------- */
    searchBox: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginVertical: 12,
    },

    /* -------- FILTER ROW -------- */
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },

    rowTitle: {
        fontSize: 14,
        color: "#555",
    },

    rowValue: {
        fontSize: 15,
        color: "#000",
        marginTop: 2,
    },

    arrow: {
        fontSize: 22,
        color: "#999",
    },

    /* -------- AGE RANGE -------- */
    section: {
        marginTop: 16,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "500",
    },

    ageHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    ageValue: {
        fontSize: 14,
        color: "#444",
    },

    slider: {
        width: "100%",
    },

    /* -------- INPUT BLOCK -------- */
    inputSection: {
        marginTop: 16,
    },

    subText: {
        fontSize: 12,
        color: "#777",
        marginVertical: 4,
    },

    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 6,
    },

    /* ================== BOTTOM SHEET ================== */

    bottomOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "flex-end",
    },

    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    bottomSheet: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 30,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
    },

    sheetTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 14,
    },

    sheetItem: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },

    sheetItemActive: {
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    sheetText: {
        fontSize: 15,
        color: "#333",
    },

    sheetTextActive: {
        fontWeight: "600",
    },
    choicePill: {
        backgroundColor: "#F2F2F2",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 30,
        marginBottom: 12,
    },

    choicePillActive: {
        backgroundColor: "#EFE3FF",
        borderWidth: 1,
        borderColor: "#B388FF",
    },

    choiceText: {
        fontSize: 14,
        color: "#333",
        textAlign: "center",
    },

    choiceTextActive: {
        color: "#6A1B9A",
        fontWeight: "600",
    },
    zodiacGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    zodiacItem: {
        width: "30%",          // 3 items per row
        paddingVertical: 12,
        marginBottom: 14,
        borderRadius: 12,
        backgroundColor: "#F2F2F2",
        alignItems: "center",
    },

    zodiacItemActive: {
        backgroundColor: "#EFE3FF",
        borderWidth: 1,
        borderColor: "#B388FF",
    },

    zodiacText: {
        fontSize: 13,
        color: "#333",
        textAlign: "center",
    },

    zodiacTextActive: {
        color: "#6A1B9A",
        fontWeight: "600",
    },

});
