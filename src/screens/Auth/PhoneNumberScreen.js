import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList, ScrollView } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

// Your SVG back arrow
import BackArrow from "../../assets/icons/backarrow.svg";

const COUNTRIES = [
    { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91', maxLength: 10 },
    { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1', maxLength: 10 },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', maxLength: 10 },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1', maxLength: 10 },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61', maxLength: 9 },
    { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86', maxLength: 11 },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81', maxLength: 10 },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49', maxLength: 11 },
    { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33', maxLength: 9 },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39', maxLength: 10 },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34', maxLength: 9 },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55', maxLength: 11 },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52', maxLength: 10 },
    { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '+7', maxLength: 10 },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82', maxLength: 10 },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27', maxLength: 9 },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234', maxLength: 10 },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬', dialCode: '+20', maxLength: 10 },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰', dialCode: '+92', maxLength: 10 },
    { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', dialCode: '+880', maxLength: 10 },
    { code: 'AE', name: 'UAE', flag: '🇦🇪', dialCode: '+971', maxLength: 9 },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966', maxLength: 9 },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '+60', maxLength: 9 },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65', maxLength: 8 },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭', dialCode: '+66', maxLength: 9 },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84', maxLength: 9 },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63', maxLength: 10 },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩', dialCode: '+62', maxLength: 11 },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷', dialCode: '+90', maxLength: 10 },
    { code: 'PL', name: 'Poland', flag: '🇵🇱', dialCode: '+48', maxLength: 9 },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', dialCode: '+31', maxLength: 9 },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪', dialCode: '+32', maxLength: 9 },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪', dialCode: '+46', maxLength: 9 },
    { code: 'NO', name: 'Norway', flag: '🇳🇴', dialCode: '+47', maxLength: 8 },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰', dialCode: '+45', maxLength: 8 },
    { code: 'FI', name: 'Finland', flag: '🇫🇮', dialCode: '+358', maxLength: 9 },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭', dialCode: '+41', maxLength: 9 },
    { code: 'AT', name: 'Austria', flag: '🇦🇹', dialCode: '+43', maxLength: 11 },
    { code: 'GR', name: 'Greece', flag: '🇬🇷', dialCode: '+30', maxLength: 10 },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351', maxLength: 9 },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪', dialCode: '+353', maxLength: 9 },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', dialCode: '+64', maxLength: 9 },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54', maxLength: 10 },
    { code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '+56', maxLength: 9 },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '+57', maxLength: 10 },
    { code: 'PE', name: 'Peru', flag: '🇵🇪', dialCode: '+51', maxLength: 9 },
    { code: 'VE', name: 'Venezuela', flag: '🇻🇪', dialCode: '+58', maxLength: 10 },
];

export default function PhoneNumberScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default India
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Validate phone number based on length
        const isValidLength = phoneNumber.length === selectedCountry.maxLength;
        setIsValid(isValidLength && phoneNumber.length > 0);
    }, [phoneNumber, selectedCountry]);

    const handleContinue = () => {
        const fullNumber = `${selectedCountry.dialCode}${phoneNumber}`;
        navigation.navigate("OTP", { phoneNumber: fullNumber });
    };

    const handlePhoneChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, "");
        
        // Strictly limit to country-specific max length
        if (numericText.length <= selectedCountry.maxLength) {
            setPhoneNumber(numericText);
        }
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setPhoneNumber(''); // Clear phone number when country changes
        setShowCountryPicker(false);
        setSearchQuery('');
    };

    const filteredCountries = COUNTRIES.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery)
    );

    return (
        <View style={styles.container}>

            {/* Back Arrow */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
                        colors={isValid ? ["#6A5AE0", "#8A6FF0"] : ["#BFBFBF", "#D3D3D3"]}
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
                    
                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                            <Text style={styles.closeButton}>✕</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Select Country</Text>
                        <View style={{ width: 30 }} />
                    </View>

                    {/* Search Bar */}
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

                    {/* Country List */}
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
    },

    backButton: {
        paddingTop: 55,
        paddingLeft: 22,
        paddingBottom: 10,
        width: 50,
    },

    centerContent: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 26,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        fontFamily: "Poppins-Bold",
        color: "#000",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: "#5A5A5A",
        marginBottom: 35,
        lineHeight: 22,
    },

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
        paddingRight: 12,
    },

    flag: {
        fontSize: 28,
        marginRight: 8,
    },

    dialCode: {
        fontSize: 16,
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
        height: 35,
        backgroundColor: '#ddd',
        marginRight: 12,
    },

    textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: "#000",
        height: '100%',
    },

    hint: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: "#999",
        marginTop: 8,
    },

    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },

    button: {
        paddingVertical: 16,
        borderRadius: 35,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontFamily: "Poppins-SemiBold",
    },

    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },

    closeButton: {
        fontSize: 28,
        color: '#000',
        fontWeight: '300',
    },

    modalTitle: {
        fontSize: 20,
        fontFamily: "Poppins-SemiBold",
        color: "#000",
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        paddingHorizontal: 16,
        height: 50,
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },

    searchIcon: {
        fontSize: 18,
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: "#000",
    },

    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    selectedCountryItem: {
        backgroundColor: '#F0F0FF',
    },

    countryFlag: {
        fontSize: 28,
        marginRight: 16,
    },

    countryInfo: {
        flex: 1,
    },

    countryName: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: "#000",
        marginBottom: 2,
    },

    countryDialCode: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#666",
    },

    checkMark: {
        fontSize: 20,
        color: "#6A5AE0",
        fontWeight: 'bold',
    },
});