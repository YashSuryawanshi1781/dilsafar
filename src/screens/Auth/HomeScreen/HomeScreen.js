import React from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import FastImage from "react-native-fast-image";
import FilterIcon from "../../../assets/icons/filter.svg";

import styles from "./HomeScreen.styles";
import { useHomeScreenLogic } from "./HomeScreen.logic";

// Import Badge
import ActiveMembersBadge from "./ActiveMembersBadge";

export default function HomeScreen({ navigation }) {
    const {
        users,
        loadingMore,
        skeletonLoading,
        loadMoreUsers,
    } = useHomeScreenLogic();

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
            renderItem={SkeletonCard}
            keyExtractor={(i) => i.toString()}
            columnWrapperStyle={{ justifyContent: "space-between" }}
        />
    );

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("UserDetail", { user: item })}
        >
            <FastImage
                source={{ uri: item.image }}
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
            {/* Header with Logo Only */}
            <View style={styles.logoHeader}>
                <Image
                    source={require("../../../assets/images/dilsafar.png")}
                    style={styles.logoImage}
                />
            </View>

            {/* Row: Badge + Filter */}
            <View style={styles.topRow}>
                <ActiveMembersBadge activeCount={users?.length || 0} />

                <TouchableOpacity
                    onPress={() => navigation.navigate("FilterScreen")}
                >
                    <FilterIcon width={30} height={27} />
                </TouchableOpacity>

            </View>



            {/* Content */}
            {skeletonLoading ? (
                renderSkeletons()
            ) : (
                <FlatList
                    data={users}
                    numColumns={2}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    onEndReached={loadMoreUsers}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={
                        loadingMore ? (
                            <ActivityIndicator
                                size="large"
                                style={{ marginVertical: 20 }}
                            />
                        ) : null
                    }
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}
