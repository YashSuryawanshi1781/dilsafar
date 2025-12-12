import React from "react";
import { View, Text } from "react-native";
import styles from "./ActiveMembersBadge.styles";

export default function ActiveMembersBadge({ activeCount }) {
    return (
        <View style={styles.container}>
            <View style={styles.dot} />
            <Text style={styles.text}>{activeCount}</Text>
            <Text style={[styles.text, { marginLeft: 4 }]}>Active Members</Text>
        </View>
    );
}
