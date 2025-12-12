import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Modal,
    FlatList,
    Dimensions,
    Platform,
    StatusBar,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

// Your SVG back arrow
import BackArrow from "../../assets/icons/backarrow.svg";

// IMPORT YOUR SVG BACKGROUND
// Update this relative path if needed. Example assumes this screen file is inside src/... so '../../assets/..' might change.
// If you're using react-native-svg-transformer you can import the svg as a component:
import PhoneVector from "../../assets/vectors/phonevector.svg";

const COUNTRIES = [
    /* ... keep your COUNTRIES array exactly as before ... */
    { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91', maxLength: 10 },
    { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1', maxLength: 10 },
    /* (rest omitted here for brevity - use your original list) */
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Original SVG art size you gave
const SVG_ORIG = { width: 390, height: 844 };
// Scale the SVG so it fills width and keeps aspect ratio (you can adjust to cover more height if desired)
const svgScale = SCREEN_WIDTH / SVG_ORIG.width;
const SVG_RENDER = {
    width: SCREEN_WIDTH,
    height: SVG_ORIG.height * svgScale - 80,
};

export default function PhoneNumberScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default India
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const isValidLength = phoneNumber.length === selectedCountry.maxLength;
        setIsValid(isValidLength && phoneNumber.length > 0);
    }, [phoneNumber, selectedCountry]);

    const handleContinue = () => {
        const fullNumber = `${selectedCountry.dialCode}${phoneNumber}`;
        navigation.navigate("OTP", { phoneNumber: fullNumber });
    };

    const handlePhoneChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, "");
        if (numericText.length <= selectedCountry.maxLength) {
            setPhoneNumber(numericText);
        }
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setPhoneNumber('');
        setShowCountryPicker(false);
        setSearchQuery('');
    };

    const filteredCountries = COUNTRIES.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery)
    );

    // safe top padding
    const topPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

    return (
        <View style={styles.container}>
            {/* SVG Background (positioned absolutely behind everything) */}
            <PhoneVector
                width={SVG_RENDER.width}
                height={SVG_RENDER.height}
                style={styles.svgBackground}
            />

            {/* Back Arrow */}
            <TouchableOpacity style={[styles.backButton, { paddingTop: topPadding }]} onPress={() => navigation.goBack()}>
                <BackArrow width={30} height={30} fill="#000" />
            </TouchableOpacity>

            {/* Center Content */}
            <View style={styles.centerContent}>
                <Text style={styles.title}>Enter your phone number</Text>
                <Text style={styles.subtitle}>
                    We'll send you a verification code to continue.
                </Text>

                {/* Phone Input Container */}
                <View style={styles.phoneContainer}>
                    {/* Country Picker Button */}
                    <TouchableOpacity
                        style={styles.countryButton}
                        onPress={() => setShowCountryPicker(true)}
                    >
                        <Text style={styles.flag}>{selectedCountry.flag}</Text>
                        <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
                        <Text style={styles.dropdownArrow}>▼</Text>
                    </TouchableOpacity>

                    {/* Vertical Divider */}
                    <View style={styles.divider} />

                    {/* Phone Number Input */}
                    <TextInput
                        style={styles.textInput}
                        value={phoneNumber}
                        onChangeText={handlePhoneChange}
                        placeholder="Enter phone number"
                        placeholderTextColor="#999"
                        keyboardType="number-pad"
                        maxLength={selectedCountry.maxLength}
                        autoFocus={true}
                    />
                </View>

                {/* Hint Text */}
                <Text style={styles.hint}>
                    Max {selectedCountry.maxLength} digits for {selectedCountry.name}
                </Text>
            </View>

            {/* Gradient Button */}
            <View style={styles.footer}>
                <TouchableOpacity disabled={!isValid} onPress={handleContinue}>
                    <LinearGradient
                        colors={
                            isValid
                                ? ["#1E1E1E", "#2A2A2A", "#3A3A3A"]
                                : ["#BFBFBF", "#D3D3D3"]
                        }
                        style={[styles.button]}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>


            {/* Country Picker Modal */}
            <Modal
                visible={showCountryPicker}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setShowCountryPicker(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                            <Text style={styles.closeButton}>✕</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Select Country</Text>
                        <View style={{ width: 30 }} />
                    </View>

                    <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search country or code"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <FlatList
                        data={filteredCountries}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.countryItem,
                                    selectedCountry.code === item.code && styles.selectedCountryItem
                                ]}
                                onPress={() => handleCountrySelect(item)}
                            >
                                <Text style={styles.countryFlag}>{item.flag}</Text>
                                <View style={styles.countryInfo}>
                                    <Text style={styles.countryName}>{item.name}</Text>
                                    <Text style={styles.countryDialCode}>{item.dialCode}</Text>
                                </View>
                                {selectedCountry.code === item.code && (
                                    <Text style={styles.checkMark}>✓</Text>
                                )}
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        position: 'relative',
    },

    svgBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 1,
        zIndex: 0,
        marginTop: 60,
    },

    backButton: {
        paddingLeft: 22,
        paddingBottom: 10,
        width: 50,
        zIndex: 10,
    },

    centerContent: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 40,
        paddingHorizontal: 26,
        zIndex: 10,
    },

    /** ↓↓↓ FONT SIZE REDUCED ↓↓↓ **/
    title: {
        fontSize: 24,
        fontWeight: "700",
        fontFamily: "Poppins-Bold",
        color: "#000",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#5A5A5A",
        marginBottom: 28,
        lineHeight: 20,
    },

    /** ↓↓↓ INPUT FIELD TRANSPARENT + SMALLER ↓↓↓ **/
    phoneContainer: {
        width: '100%',
        height: 65,
        borderRadius: 14,
        borderWidth: 1.2,
        borderColor: '#ddd',
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 12,
    },

    countryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },

    flag: {
        fontSize: 22,
        marginRight: 6,
    },

    dialCode: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#000",
        marginRight: 6,
    },

    dropdownArrow: {
        fontSize: 10,
        color: "#666",
    },

    divider: {
        width: 1,
        height: 30,
        backgroundColor: '#ccc',
        marginRight: 10,
    },

    textInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: "#000",
        height: '100%',
        backgroundColor: 'transparent',    // transparent input
    },

    hint: {
        fontSize: 11,
        fontFamily: "Poppins-Regular",
        color: "#999",
        marginTop: 8,
    },

    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        zIndex: 10,
    },

    button: {
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "Poppins-SemiBold",
    },

    /** ↓↓↓ Modal text fonts reduced ↓↓↓ **/
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },

    closeButton: {
        fontSize: 24,
        color: '#000',
        fontWeight: '300',
    },

    modalTitle: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
        color: "#000",
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        paddingHorizontal: 16,
        height: 45,
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },

    searchIcon: {
        fontSize: 16,
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#000",
    },

    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    selectedCountryItem: {
        backgroundColor: '#F0F0FF',
    },

    countryFlag: {
        fontSize: 22,
        marginRight: 14,
    },

    countryInfo: {
        flex: 1,
    },

    countryName: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#000",
        marginBottom: 2,
    },

    countryDialCode: {
        fontSize: 13,
        fontFamily: "Poppins-Regular",
        color: "#666",
    },

    checkMark: {
        fontSize: 18,
        color: "#6A5AE0",
        fontWeight: 'bold',
    },
});

