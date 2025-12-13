import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";

import Slider from "@react-native-community/slider";
import BackArrow from "../../../assets/icons/backarrow.svg";

import styles from "./FilterScreen.styles";

/* ---------------- MAIN SCREEN ---------------- */

export default function FilterScreen({ navigation }) {
    /* ---------------- HOOKS ---------------- */
    const [search, setSearch] = useState("");
    const [interestedIn, setInterestedIn] = useState("");
    const [lookingFor, setLookingFor] = useState("");
    const [travelStyle, setTravelStyle] = useState("");
    const [zodiac, setZodiac] = useState("");
    const [ageRange, setAgeRange] = useState(28);
    const [location, setLocation] = useState("");
    const [wishToTravel, setWishToTravel] = useState("");
    const [pastTravel, setPastTravel] = useState("");
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showLookingForModal, setShowLookingForModal] = useState(false);
    const [showZodiacModal, setShowZodiacModal] = useState(false);

    /* ---------------- RENDER ---------------- */
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackArrow width={18} height={18} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Dating preferences</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Search */}
                <TextInput
                    style={styles.searchBox}
                    placeholder="🔍 Search by name"
                    value={search}
                    onChangeText={setSearch}
                />

                {/* Interested In */}
                <FilterRow
                    title="I'm interested in"
                    value={interestedIn || "Select Gender"}
                    onPress={() => setShowGenderModal(true)}
                />

                {/* Looking For */}
                <FilterRow
                    title="What you're looking for"
                    value={lookingFor || "Select"}
                    onPress={() => setShowLookingForModal(true)}
                />


                {/* Travel Style */}
                <FilterRow
                    title="Travel style"
                    value={travelStyle || "Show people with same lifestyle"}
                    onPress={() => setTravelStyle("Backpacker")}
                />

                {/* Zodiac */}
                <FilterRow
                    title="Zodiac sign"
                    value={zodiac || "Select Zodiac Sign"}
                    onPress={() => setShowZodiacModal(true)}
                />

                {/* Age Range */}
                <View style={styles.section}>
                    <View style={styles.ageHeader}>
                        <Text style={styles.sectionTitle}>Age range</Text>
                        <Text style={styles.ageValue}>20 – {ageRange}</Text>
                    </View>

                    <Slider
                        style={styles.slider}
                        minimumValue={18}
                        maximumValue={60}
                        step={1}
                        value={ageRange}
                        minimumTrackTintColor="#000"
                        maximumTrackTintColor="#E0E0E0"
                        thumbTintColor="#000"
                        onValueChange={setAgeRange}
                    />
                </View>

                {/* Location */}
                <InputBlock
                    title="Location"
                    value={location}
                    onChangeText={setLocation}
                />

                {/* Wish To Travel */}
                <InputBlock
                    title="Wish To Travel"
                    subtitle="Show people with same interest to travel"
                    value={wishToTravel}
                    onChangeText={setWishToTravel}
                />

                {/* Past Travel */}
                <InputBlock
                    title="Past Travel"
                    subtitle="Show people with same interest to travel"
                    value={pastTravel}
                    onChangeText={setPastTravel}
                />

                <View style={{ height: 30 }} />
            </ScrollView>

            {/* ---------------- GENDER BOTTOM SHEET ---------------- */}
            {showGenderModal && (
                <View style={styles.bottomOverlay}>
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={() => setShowGenderModal(false)}
                    />

                    <View style={styles.bottomSheet}>
                        <Text style={styles.sheetTitle}>Select Gender</Text>

                        {["Man", "Woman", "Other"].map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.sheetItem,
                                    interestedIn === item && styles.sheetItemActive,
                                ]}
                                onPress={() => {
                                    setInterestedIn(item);
                                    setShowGenderModal(false);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.sheetText,
                                        interestedIn === item && styles.sheetTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
            {/* ---------------- LOOKING FOR BOTTOM SHEET ---------------- */}
            {showLookingForModal && (
                <View style={styles.bottomOverlay}>
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={() => setShowLookingForModal(false)}
                    />

                    <View style={styles.bottomSheet}>
                        <Text style={styles.sheetTitle}>What You're Looking</Text>

                        {[
                            "Looking For My Next Adventure Partner",
                            "Open To New Chats, Vibes, And Friendships",
                            "Here To Explore And See What Fits",
                        ].map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.choicePill,
                                    lookingFor === item && styles.choicePillActive,
                                ]}
                                onPress={() => {
                                    setLookingFor(item);
                                    setShowLookingForModal(false);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.choiceText,
                                        lookingFor === item && styles.choiceTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
            {/* ---------------- ZODIAC BOTTOM SHEET ---------------- */}
            {showZodiacModal && (
                <View style={styles.bottomOverlay}>
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={() => setShowZodiacModal(false)}
                    />

                    <View style={styles.bottomSheet}>
                        <Text style={styles.sheetTitle}>Select Zodiac Sign</Text>

                        <View style={styles.zodiacGrid}>
                            {[
                                "Aries",
                                "Taurus",
                                "Gemini",
                                "Cancer",
                                "Leo",
                                "Virgo",
                                "Libra",
                                "Scorpio",
                                "Sagittarius",
                                "Capricorn",
                                "Aquarius",
                                "Pisces",
                            ].map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={[
                                        styles.zodiacItem,
                                        zodiac === item && styles.zodiacItemActive,
                                    ]}
                                    onPress={() => {
                                        setZodiac(item);
                                        setShowZodiacModal(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.zodiacText,
                                            zodiac === item && styles.zodiacTextActive,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            )}

        </View>
    );
}

/* ---------------- PURE COMPONENTS ---------------- */

const FilterRow = ({ title, value, onPress }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
        <View>
            <Text style={styles.rowTitle}>{title}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
);

const InputBlock = ({ title, subtitle, value, onChangeText }) => (
    <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.subText}>{subtitle}</Text> : null}
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);
