// src/screens/Auth/FaceScanScreen.js

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import BaseStepScreen from './BaseStepScreen';
import FaceVector from '../../assets/vectors/facevector.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/* ---- SVG ORIGINAL SIZE ---- */
const FACE_ORIGINAL = { width: 300, height: 500 };
const faceScale = SCREEN_WIDTH / FACE_ORIGINAL.width;

const FACE_SVG_RENDER = {
    width: SCREEN_WIDTH,
    height: FACE_ORIGINAL.height * faceScale - 40,
};


export default function FaceScanScreen({ navigation }) {
    const handleNext = () => {
        navigation.navigate('PhotoUploadScreen');
    };
    return (
        <BaseStepScreen
            navigation={navigation}
            currentStep={5}
            totalSteps={12}
            title="Scan & Start"
            onNext={handleNext}
        >
            {/* SVG Background */}
            <FaceVector
                width={FACE_SVG_RENDER.width}
                height={FACE_SVG_RENDER.height}
                style={styles.svgBackground}
            />

            <View style={styles.container}>
                <Text style={styles.subtitle}>
                    A quick face scan keeps our community safe. Travel and connect
                    worry-free with genuine explorers.
                </Text>

                <View style={styles.scanWrapper}>
                    <View style={styles.oval} />
                </View>

                <View style={styles.instructionContainer}>
                    <Text style={styles.instructionText}>
                        Center Your Face In The Circle
                    </Text>
                </View>
            </View>
        </BaseStepScreen>
    );
}

const styles = StyleSheet.create({
    svgBackground: {
        position: 'absolute',
        top: 100,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
    },
    container: {
        flex: 1,
        zIndex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        marginTop: '-10%',
        fontSize: 14,
        color: '#8A8A8A',
        lineHeight: 20,
        maxWidth: '90%',
    },
    scanWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    oval: {
        width: SCREEN_WIDTH * 0.55,
        height: SCREEN_WIDTH * 0.7,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: '#B56CFF',
    },
    instructionContainer: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 79
    },
    instructionText: {
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        fontSize: 13,
        color: '#333',
    },
});

