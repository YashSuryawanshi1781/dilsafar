import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import BaseStepScreen from "./BaseStepScreen";
import TravelStyleVector from "../../assets/vectors/travelstyle.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/* ---- SVG ORIGINAL SIZE ---- */
const SVG_ORIGINAL = { width: 400, height: 540 };
const svgScale = SCREEN_WIDTH / SVG_ORIGINAL.width;

const SVG_RENDER = {
    width: SCREEN_WIDTH,
    height: SVG_ORIGINAL.height * svgScale - 40,
};

const OPTIONS = [
    "Staycation",
    "Art & Culture",
    "Hiking & Treks",
    "Backpacking",
    "Luxury Getaways",
    "Nightlife",
    "Adventure Travel",
    "Sight Seeing",
    "Spiritual",
    "Food & Restaurants",
];

export default function TravelStyleScreen({ navigation }) {
    const [selected, setSelected] = useState(["Nightlife"]);

    const toggle = (item) => {
        setSelected((prev) =>
            prev.includes(item)
                ? prev.filter((x) => x !== item)
                : [...prev, item]
        );
    };

    return (
        <BaseStepScreen
            navigation={navigation}
            currentStep={6}
            totalSteps={12}
            title="What’s your travel style?"
            onNext={() => navigation.navigate("CosmicConnectionsScreen")}
        >
            {/* SVG BACKGROUND */}
            <TravelStyleVector
                width={SVG_RENDER.width}
                height={SVG_RENDER.height}
                style={styles.svgBackground}
            />

            <Text style={styles.subtitle}>
                Select the styles of travel you enjoy exploring.
            </Text>

            <View style={styles.grid}>
                {OPTIONS.map((item) => {
                    const active = selected.includes(item);
                    return (
                        <TouchableOpacity
                            key={item}
                            onPress={() => toggle(item)}
                            style={[
                                styles.chip,
                                active && styles.activeChip,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    active && styles.activeText,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </BaseStepScreen>
    );
}

const styles = StyleSheet.create({
    svgBackground: {
        position: "absolute",
        top: 20,
        left: 10,
        zIndex: 0,
        pointerEvents: "none",
    },

    subtitle: {
        fontSize: 14,
        color: "#8A8A8A",
        lineHeight: 20,
        maxWidth: "90%",
        zIndex: 1,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 28,
        zIndex: 1,
    },

    /* 🔥 EXACTLY 2 CHIPS PER ROW */
    chip: {
        width: "48%",              // 2 per row
        marginHorizontal: "1%",    // spacing between chips
        paddingVertical: 12,
        alignItems: "center",
        backgroundColor: "#F4F4F4",
        borderRadius: 22,
        marginBottom: 12,
    },

    activeChip: {
        backgroundColor: "#F1E8FF",
        borderWidth: 1,
        borderColor: "#8B3DFF",
    },

    chipText: {
        fontSize: 14,
        color: "#000",
    },

    activeText: {
        color: "#8B3DFF",
        fontWeight: "600",
    },
});
