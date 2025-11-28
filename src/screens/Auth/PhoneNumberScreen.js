import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import LinearGradient from "react-native-linear-gradient";

// Your SVG back arrow
import BackArrow from "../../assets/icons/backarrow.svg";

export default function PhoneNumberScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [countryCode, setCountryCode] = useState('IN');
    const phoneInput = useRef(null);

    useEffect(() => {
        const valid = phoneInput.current?.isValidNumber(phoneNumber);
        setIsValid(valid || false);
    }, [phoneNumber]);

    const getFlagEmoji = (code) => {
        if (!code) return '🇮🇳';
        return code.toUpperCase().replace(/./g, char =>
            String.fromCodePoint(127397 + char.charCodeAt())
        );
    };

    const handleContinue = () => {
        if (phoneInput.current) {
            const full = phoneInput.current.getNumberAfterPossiblyEliminatingZero();
            navigation.navigate("OTP", { phoneNumber: full.formattedNumber });
        }
    };
    const handlePhoneChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, ""); // remove all non-numbers
        setPhoneNumber(numericText);
    };


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
                    We’ll send you a verification code to continue.
                </Text>

                <PhoneInput
                    ref={phoneInput}
                    defaultCode="IN"
                    layout="first"
                    autoFocus
                    withShadow={false}
                    keyboardType="number-pad"
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.textInputContainer}
                    textInputStyle={styles.textInput}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))} // allow only numbers
                    onChangeFormattedText={setPhoneNumber}
                    onChangeCountry={country => setCountryCode(country?.cca2 || 'IN')}
                    renderFlag={() => (
                        <Text style={styles.flag}>{getFlagEmoji(countryCode)}</Text>
                    )}
                />

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
        alignItems: "center",
        paddingLeft: 12,
    },

    textInputContainer: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
    },

    textInput: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: "#000",
    },

    flag: {
        fontSize: 32,
        marginRight: 12,
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
});
