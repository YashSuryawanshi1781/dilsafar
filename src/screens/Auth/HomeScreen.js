import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import FilterIcon from "../../assets/icons/filter.svg";

export default function HomeScreen({ navigation }) {
    const users = [
        { id: 1, name: "Varun", age: 20, location: "Goa", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress" },
        { id: 2, name: "Natasha", age: 20, location: "Mumbai", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress" },
        { id: 3, name: "Aron", age: 20, location: "Pune", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress" },
        { id: 4, name: "Swizel", age: 20, location: "Goa", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress" },
        { id: 5, name: "Priya", age: 20, location: "Delhi", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress" },
        { id: 6, name: "Jos", age: 20, location: "Bangalore", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress" },
    ];

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("UserDetail", { user: item })}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.overlay} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}, <Text style={styles.age}>{item.age}</Text></Text>
                <Text style={styles.location}>{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/images/dilsafar.png")}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <TouchableOpacity>
                    <FilterIcon width={30} height={27} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={renderCard}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false} // <-- hide scrollbar
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
    header: { marginTop: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    logoImage: { width: 140, height: 40 },
    card: { width: "48%", marginTop: 18, borderRadius: 16, overflow: "hidden" },
    cardImage: { width: "100%", height: 200, borderRadius: 16 },
    overlay: { position: "absolute", bottom: 0, width: "100%", height: "50%" },
    textContainer: { position: "absolute", bottom: 10, left: 10 },
    name: { fontSize: 18, color: "#fff", fontWeight: "700" },
    age: { fontSize: 16, color: "#fff" },
    location: { fontSize: 14, color: "#fff", marginTop: 2 },
});
