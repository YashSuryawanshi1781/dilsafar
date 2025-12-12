import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderWidth: 1.5,
        borderRadius: 25,
        borderColor: "#D3D3D3",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#6B9C10",
    },
    text: {
        marginLeft: 4,
        fontSize: 12,
        color: "#000",
    },
});
