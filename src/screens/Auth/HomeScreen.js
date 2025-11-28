// src/screens/Auth/HomeScreen.js
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import FastImage from "react-native-fast-image";  // Image caching
import FilterIcon from "../../assets/icons/filter.svg";

export default function HomeScreen({ navigation }) {

    // Fake backend user list
    const ALL_USERS = [
        { id: 1, name: "Varun", age: 20, location: "Goa", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
        { id: 2, name: "Natasha", age: 20, location: "Mumbai", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" },
        { id: 3, name: "Aron", age: 20, location: "Pune", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" },
        { id: 4, name: "Swizel", age: 20, location: "Goa", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" },
        { id: 5, name: "Priya", age: 20, location: "Delhi", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
        { id: 6, name: "Jos", age: 20, location: "Bangalore", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" },

        // Extra for pagination
        { id: 7, name: "Simran", age: 21, location: "Chennai", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
        { id: 8, name: "Kabir", age: 23, location: "Hyderabad", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
        { id: 9, name: "Riya", age: 19, location: "Noida", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" },
        { id: 10, name: "Krish", age: 22, location: "Surat", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" },
        { id: 11, name: "Maya", age: 24, location: "Indore", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" },
        { id: 12, name: "Dev", age: 21, location: "Ahmedabad", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" },
    ];

    const PAGE_SIZE = 6;

    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [skeletonLoading, setSkeletonLoading] = useState(true);

    // Show skeleton for 1 second
    useEffect(() => {
        setTimeout(() => {
            setSkeletonLoading(false);
            loadMoreUsers();
        }, 1000);
    }, []);

    // Load paginated users
    const loadMoreUsers = () => {
        if (loadingMore) return;

        setLoadingMore(true);

        setTimeout(() => {
            const start = (page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const newUsers = ALL_USERS.slice(start, end);

            if (newUsers.length > 0) {
                setUsers(prev => [...prev, ...newUsers]);
                setPage(prev => prev + 1);
            }
            setLoadingMore(false);
        }, 600);
    };

    // --------- Skeleton UI ---------
    const SkeletonCard = () => (
        <View style={styles.skeletonCard}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonTextShort} />
            <View style={styles.skeletonTextLong} />
        </View>
    );

    const renderSkeletons = () => (
        <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            numColumns={2}
            keyExtractor={(item) => item.toString()}
            renderItem={SkeletonCard}
            columnWrapperStyle={{ justifyContent: "space-between" }}
        />
    );

    // --------- Actual User Card ---------
    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("UserDetail", { user: item })}
        >
            <FastImage
                source={{ uri: item.image, priority: FastImage.priority.normal }}
                style={styles.cardImage}
                resizeMode={FastImage.resizeMode.cover}
            />

            <View style={styles.overlay} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>
                    {item.name}, <Text style={styles.age}>{item.age}</Text>
                </Text>
                <Text style={styles.location}>{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            {/* Header */}
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

            {/* Skeleton Loading */}
            {skeletonLoading ? (
                renderSkeletons()
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={renderCard}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreUsers}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={
                        loadingMore ? (
                            <ActivityIndicator size="large" color="#000" style={{ marginVertical: 20 }} />
                        ) : null
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },

    header: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    logoImage: { width: 140, height: 40 },

    // USER CARD
    card: {
        width: "48%",
        marginTop: 18,
        borderRadius: 16,
        overflow: "hidden",
    },

    cardImage: {
        width: "100%",
        height: 200,
        borderRadius: 16,
    },

    overlay: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "50%",
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    textContainer: {
        position: "absolute",
        bottom: 10,
        left: 10,
    },

    name: { fontSize: 18, color: "#fff", fontWeight: "700" },
    age: { fontSize: 16, color: "#fff" },
    location: { fontSize: 14, color: "#fff", marginTop: 2 },

    // SKELETON STYLES
    skeletonCard: {
        width: "48%",
        marginTop: 18,
        backgroundColor: "#eee",
        borderRadius: 16,
        paddingBottom: 10,
    },

    skeletonImage: {
        width: "100%",
        height: 200,
        backgroundColor: "#ddd",
        borderRadius: 16,
    },

    skeletonTextShort: {
        width: "60%",
        height: 12,
        backgroundColor: "#ddd",
        marginTop: 10,
        borderRadius: 6,
        marginLeft: 8,
    },

    skeletonTextLong: {
        width: "40%",
        height: 12,
        backgroundColor: "#ddd",
        marginTop: 6,
        borderRadius: 6,
        marginLeft: 8,
    },
});
