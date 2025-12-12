// FilterScreen.js
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList,
    Keyboard,
} from 'react-native';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or Ionicons

/* ===========================
   Replace this with your real geoapify key
   =========================== */
const GEOAPIFY_KEY = 'YOUR_GEOAPIFY_KEY_HERE';

/* ===========================
   Simple Filter Context (mimics AuthCtrl.find.filterData.value)
   =========================== */
const initialFilterData = {
    gender: '',
    minAge: '18',
    maxAge: '65',
    minPhotos: '0',
    list: '', // wish to travel
    pastTravels: '',
    travelStyles: '',
    cosmicStyles: '',
    location: '',
    lng: '',
    lat: '',
    bio: 'false',
    isAway: 'false',
    search: '',
    whyAreYouHere: '',
};

const FilterContext = createContext({
    filterData: initialFilterData,
    setFilterData: () => { },
});

export const FilterProvider = ({ children }) => {
    const [filterData, setFilterData] = useState(initialFilterData);

    return (
        <FilterContext.Provider value={{ filterData, setFilterData }}>
            {children}
        </FilterContext.Provider>
    );
};

/* ===========================
   Helper/AppUtils functions (mimic AppUtils.toMainGenderList/fromMainGenderList)
   =========================== */
const genderMapToMain = {
    Male: 'male',
    Female: 'female',
    Other: 'other',
};
const genderMapFromMain = {
    male: 'Male',
    female: 'Female',
    other: 'Other',
};

const toMainGenderList = (label) => genderMapToMain[label] ?? '';
const fromMainGenderList = (val) => genderMapFromMain[val] ?? 'Select';

const WHY_ARE_YOU_OPTIONS = [
    { label: 'Looking For My Next\nAdventure Partner', value: 'dating' },
    { label: 'Open To New Chats,\nVibes, And Friendships', value: 'friendship' },
    { label: 'Here To Explore And See\nWhat Fits', value: 'unsure' },
];

/* ===========================
   FilterScreen component
   =========================== */
export default function FilterScreen({ navigation }) {
    const { filterData, setFilterData } = useContext(FilterContext);

    // Local state mirrors the fields from Flutter
    const [gender, setGender] = useState('Select');
    const [whyAreYouHere, setWhyAreYouHere] = useState('Select');
    const [ageRange, setAgeRange] = useState([18, 65]);
    const [isAway, setIsAway] = useState(false);
    const [hasBio, setHasBio] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [minPhotos, setMinPhotos] = useState(0);
    const [selectedTravelInterests, setSelectedTravelInterests] = useState([]);
    const [selectedPastTravels, setSelectedPastTravels] = useState([]);
    const [availableTravelInterests, setAvailableTravelInterests] = useState([]); // loaded from context if any
    const [availablePastTravels, setAvailablePastTravels] = useState([]);
    const [selectedTravelStyles, setSelectedTravelStyles] = useState([]);
    const [selectedZodiac, setSelectedZodiac] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    // modals
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [whyModalVisible, setWhyModalVisible] = useState(false);
    const [travelStylesModalVisible, setTravelStylesModalVisible] = useState(false);
    const [zodiacModalVisible, setZodiacModalVisible] = useState(false);

    // geoapify search
    const [placeQuery, setPlaceQuery] = useState('');
    const [placeSuggestions, setPlaceSuggestions] = useState([]);
    const placeTimeoutRef = useRef(null);

    // On mount restore filterData
    useEffect(() => {
        _loadFromContext();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function _loadFromContext() {
        const fd = filterData || {};
        setGender(fromMainGenderList(fd.gender || ''));
        setAgeRange([Number(fd.minAge || 18), Number(fd.maxAge || 65)]);
        setMinPhotos(Number(fd.minPhotos || 0));
        setHasBio((fd.bio || 'false').toLowerCase() === 'true');
        setIsAway((fd.isAway || 'false').toLowerCase() === 'true');
        setAddress(fd.location || '');
        setLng(fd.lng ? Number(fd.lng) : null);
        setLat(fd.lat ? Number(fd.lat) : null);
        setSearchQuery(fd.search || '');
        if (fd.list) setSelectedTravelInterests(fd.list.split(',').filter(Boolean));
        if (fd.pastTravels) setSelectedPastTravels(fd.pastTravels.split(',').filter(Boolean));
        if (fd.travelStyles) setSelectedTravelStyles(fd.travelStyles.split(',').filter(Boolean));
        setSelectedZodiac(fd.cosmicStyles || '');
        setWhyAreYouHere(fd.whyAreYouHere || 'Select');
    }

    /* ---------- Geoapify suggestions ---------- */
    useEffect(() => {
        if (!placeQuery || placeQuery.length < 2) {
            setPlaceSuggestions([]);
            return;
        }
        if (placeTimeoutRef.current) clearTimeout(placeTimeoutRef.current);
        placeTimeoutRef.current = setTimeout(() => {
            _searchPlaces(placeQuery);
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeQuery]);

    async function _searchPlaces(q) {
        try {
            const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
                q
            )}&limit=6&apiKey=${GEOAPIFY_KEY}`;
            const res = await fetch(url);
            const json = await res.json();
            if (json && json.results) {
                setPlaceSuggestions(
                    json.results.map((r) => ({
                        id: r.place_id || r.properties?.place_id || r.properties?.formatted,
                        displayName: r.formatted || r.properties?.formatted || r.display_name || r.name,
                        lat: r.lat || (r.properties && r.properties.lat),
                        lng: r.lon || (r.properties && r.properties.lon),
                        city: r.city || r.properties?.city || '',
                        name: r.name || '',
                    }))
                );
            }
        } catch (e) {
            console.warn('Place search fail', e);
        }
    }

    function _selectPlace(place) {
        setAddress(place.displayName);
        setLat(place.lat);
        setLng(place.lng);
        setPlaceQuery('');
        setPlaceSuggestions([]);
        Keyboard.dismiss();
    }

    /* ---------- Buttons: Reset & Apply ---------- */
    function _onReset() {
        // reset context and local
        setGender('Select');
        setWhyAreYouHere('Select');
        setAgeRange([18, 65]);
        setMinPhotos(0);
        setHasBio(false);
        setIsAway(false);
        setSelectedTravelInterests([]);
        setSelectedPastTravels([]);
        setSelectedTravelStyles([]);
        setSelectedZodiac('');
        setAddress('');
        setLat(null);
        setLng(null);
        setSearchQuery('');

        setFilterData({ ...initialFilterData });

        // optionally navigate back with a 'reset' flag
        if (navigation) navigation.goBack();
    }

    function _onApply() {
        const newFilter = {
            gender: gender === 'Select' ? '' : toMainGenderList(gender),
            minAge: String(ageRange[0]),
            maxAge: String(ageRange[1]),
            minPhotos: String(minPhotos),
            list: selectedTravelInterests.join(','),
            pastTravels: selectedPastTravels.join(','),
            travelStyles: selectedTravelStyles.join(','),
            cosmicStyles: selectedZodiac,
            location: address || '',
            lng: lng ? String(lng) : '',
            lat: lat ? String(lat) : '',
            bio: String(hasBio),
            isAway: String(isAway),
            search: searchQuery,
            whyAreYouHere: whyAreYouHere === 'Select' ? '' : whyAreYouHere,
        };
        setFilterData(newFilter);
        // navigate back and signal success
        if (navigation) navigation.goBack();
    }

    /* ---------- UI small helpers ---------- */
    const togglePickInList = (listSetter, arr, val) => {
        if (arr.includes(val)) {
            listSetter(arr.filter((x) => x !== val));
        } else {
            listSetter([...arr, val]);
        }
    };

    /* ---------- Render ---------- */
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
                    <Icon name="arrow-back-ios" size={22} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Filter Preferences</Text>
                <View style={{ width: 32 }} />
            </View>

            <View style={styles.searchWrap}>
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search by name"
                    style={styles.searchInput}
                />
                {searchQuery.length > 0 && (
                    <View style={styles.searchIndicator}>
                        <Icon name="search" size={14} />
                        <Text style={styles.searchText}>Searching for: "{searchQuery}"</Text>
                        <TouchableOpacity onPress={() => { setSearchQuery(''); }}>
                            <Icon name="close" size={16} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 120 }}>
                {/* Interested In / Gender */}
                <TouchableOpacity style={styles.row} onPress={() => setGenderModalVisible(true)}>
                    <View>
                        <Text style={styles.rowTitle}>Interested In</Text>
                        {gender !== 'Select' ? (
                            <View style={styles.badge}><Text style={styles.badgeText}>{gender}</Text></View>
                        ) : (
                            <Text style={styles.rowSubtitle}>Select Gender</Text>
                        )}
                    </View>
                    <Icon name="keyboard-arrow-right" size={20} />
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Why are you here */}
                <TouchableOpacity style={styles.row} onPress={() => setWhyModalVisible(true)}>
                    <View>
                        <Text style={styles.rowTitle}>Why are you here?</Text>
                        {whyAreYouHere !== 'Select' ? (
                            <View style={styles.badge}><Text style={styles.badgeText}>
                                {
                                    WHY_ARE_YOU_OPTIONS.find(o => o.value === whyAreYouHere)?.label?.replace('\n', ' ') ||
                                    whyAreYouHere
                                }
                            </Text></View>
                        ) : (
                            <Text style={styles.rowSubtitle}>Select</Text>
                        )}
                    </View>
                    <Icon name="keyboard-arrow-right" size={20} />
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Travel styles */}
                <TouchableOpacity style={styles.row} onPress={() => setTravelStylesModalVisible(true)}>
                    <View>
                        <Text style={styles.rowTitle}>Travel Style</Text>
                        {selectedTravelStyles.length > 0 ? (
                            <Text style={styles.rowSubtitle}>{selectedTravelStyles.length} style(s) selected</Text>
                        ) : (
                            <Text style={styles.rowSubtitle}>Choose travel styles</Text>
                        )}
                    </View>
                    <Icon name="keyboard-arrow-right" size={20} />
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Zodiac */}
                <TouchableOpacity style={styles.row} onPress={() => setZodiacModalVisible(true)}>
                    <View>
                        <Text style={styles.rowTitle}>Cosmic Style</Text>
                        {selectedZodiac ? <Text style={styles.rowSubtitle}>Zodiac sign selected</Text> : <Text style={styles.rowSubtitle}>Select</Text>}
                    </View>
                    <Icon name="keyboard-arrow-right" size={20} />
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Age Range */}
                <View style={{ paddingVertical: 12 }}>
                    <Text style={styles.rowTitle}>Age Range</Text>
                    <Text style={styles.smallText}>{`${ageRange[0]} - ${ageRange[1] === 65 ? '65+' : ageRange[1]}`}</Text>
                    <View style={{ marginTop: 12 }}>
                        <View style={{ paddingVertical: 12 }}>
                            <Text style={styles.rowTitle}>Age Range</Text>
                            <Text style={styles.smallText}>{`${ageRange[0]} - ${ageRange[1]}`}</Text>

                            {/* Min Age Slider */}
                            <Text style={{ marginTop: 10 }}>Min Age: {ageRange[0]}</Text>
                            <Slider
                                minimumValue={18}
                                maximumValue={65}
                                step={1}
                                value={ageRange[0]}
                                onValueChange={(val) => setAgeRange([val, ageRange[1]])}
                                minimumTrackTintColor="#000"
                                maximumTrackTintColor="#ccc"
                            />

                            {/* Max Age Slider */}
                            <Text style={{ marginTop: 10 }}>Max Age: {ageRange[1]}</Text>
                            <Slider
                                minimumValue={18}
                                maximumValue={65}
                                step={1}
                                value={ageRange[1]}
                                onValueChange={(val) => setAgeRange([ageRange[0], val])}
                                minimumTrackTintColor="#000"
                                maximumTrackTintColor="#ccc"
                            />
                        </View>

                    </View>
                </View>

                <View style={styles.divider} />

                {/* Location */}
                <View style={{ marginVertical: 12 }}>
                    <Text style={styles.rowTitle}>Location</Text>
                    <TextInput
                        placeholder={address || 'Search for location...'}
                        value={placeQuery}
                        onChangeText={setPlaceQuery}
                        style={[styles.searchInput, { marginTop: 8 }]}
                    />
                    {placeSuggestions.length > 0 && (
                        <FlatList
                            keyboardShouldPersistTaps="handled"
                            data={placeSuggestions}
                            keyExtractor={(i) => i.id + (i.lat || '')}
                            style={{ maxHeight: 200, marginTop: 6 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => _selectPlace(item)} style={styles.suggestionItem}>
                                    <Text numberOfLines={1}>{item.displayName}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>

                <View style={styles.divider} />

                {/* Wish to Travel */}
                <View style={{ marginVertical: 12 }}>
                    <Text style={styles.rowTitle}>Wish to Travel</Text>
                    <TextInput
                        placeholder="Search wish to travel locations..."
                        value={placeQuery}
                        onChangeText={setPlaceQuery}
                        style={[styles.searchInput, { marginTop: 8 }]}
                        key={`wish_travel_${selectedTravelInterests.length}`}
                    />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                        {selectedTravelInterests.map((loc) => (
                            <TouchableOpacity key={loc} style={styles.chip} onPress={() => setSelectedTravelInterests(selectedTravelInterests.filter(x => x !== loc))}>
                                <Text style={styles.chipText}>{loc} ✕</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Past Travels */}
                <View style={{ marginVertical: 12 }}>
                    <Text style={styles.rowTitle}>Past Travels</Text>
                    <TextInput
                        placeholder="Search past travel locations..."
                        value={placeQuery}
                        onChangeText={setPlaceQuery}
                        style={[styles.searchInput, { marginTop: 8 }]}
                        key={`past_travel_${selectedPastTravels.length}`}
                    />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                        {selectedPastTravels.map((loc) => (
                            <TouchableOpacity key={loc} style={styles.chip} onPress={() => setSelectedPastTravels(selectedPastTravels.filter(x => x !== loc))}>
                                <Text style={styles.chipText}>{loc} ✕</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.btnReset} onPress={_onReset}>
                    <Text style={styles.btnResetText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnApply} onPress={_onApply}>
                    <Text style={styles.btnApplyText}>Apply</Text>
                </TouchableOpacity>
            </View>

            {/* Gender Modal */}
            <Modal
                visible={genderModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setGenderModalVisible(false)}
            >
                {/* Background overlay */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setGenderModalVisible(false)}
                    style={styles.modalOverlay}
                />

                {/* Modal Content */}
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Select Gender</Text>

                        {['Male', 'Female', 'Other'].map((g) => (
                            <TouchableOpacity
                                key={g}
                                style={styles.modalItem}
                                onPress={() => {
                                    setGender(g);
                                    setGenderModalVisible(false);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.modalItemText,
                                        gender === g && { fontWeight: "700" }
                                    ]}
                                >
                                    {g}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>


            {/* Why are you here Modal */}
            <Modal isVisible={whyModalVisible} onBackdropPress={() => setWhyModalVisible(false)}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Why are you here?</Text>
                    {WHY_ARE_YOU_OPTIONS.map((opt) => (
                        <TouchableOpacity key={opt.value} style={styles.modalItem} onPress={() => { setWhyAreYouHere(opt.value); setWhyModalVisible(false); }}>
                            <Text style={[styles.modalItemText, whyAreYouHere === opt.value && { fontWeight: '700' }]}>{opt.label.replace('\n', ' ')}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>

            {/* Travel Styles Modal (simple list for sample) */}
            <Modal isVisible={travelStylesModalVisible} onBackdropPress={() => setTravelStylesModalVisible(false)}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Travel Styles</Text>
                    {['Backpacking', 'Luxury', 'Adventure', 'Roadtrip', 'Beach'].map((s) => {
                        const selected = selectedTravelStyles.includes(s);
                        return (
                            <TouchableOpacity key={s} style={styles.modalItem} onPress={() => togglePickInList(setSelectedTravelStyles, selectedTravelStyles, s)}>
                                <Text style={[styles.modalItemText, selected && { fontWeight: '700' }]}>{s}</Text>
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity style={[styles.modalAction]} onPress={() => setTravelStylesModalVisible(false)}>
                        <Text style={{ color: '#fff' }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Zodiac Modal (simple list) */}
            <Modal isVisible={zodiacModalVisible} onBackdropPress={() => setZodiacModalVisible(false)}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Zodiac</Text>
                    {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(z => (
                        <TouchableOpacity key={z} style={styles.modalItem} onPress={() => { setSelectedZodiac(z); setZodiacModalVisible(false); }}>
                            <Text style={[styles.modalItemText, selectedZodiac === z && { fontWeight: '700' }]}>{z}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </SafeAreaView>
    );
}

/* ===========================
   Styles
   =========================== */

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, justifyContent: 'space-between' },
    headerTitle: { fontSize: 18, fontWeight: '600' },

    searchWrap: { paddingHorizontal: 16, paddingTop: 8 },
    searchInput: {
        borderRadius: 25, backgroundColor: '#f1f1f1', paddingHorizontal: 12, height: 44,
    },
    searchIndicator: { flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: '#ffd7e6', padding: 8, borderRadius: 20 },
    searchText: { marginLeft: 6, marginRight: 6 },

    body: { flex: 1, paddingHorizontal: 20, marginTop: 10 },

    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
    rowTitle: { fontSize: 16, fontWeight: '500' },
    rowSubtitle: { fontSize: 14, color: '#777', marginTop: 4 },
    badge: { backgroundColor: '#ffd7e6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, marginTop: 6 },
    badgeText: { fontSize: 12 },
    divider: { height: 1, backgroundColor: '#e6e6e6', marginVertical: 6 },

    smallText: { color: '#555', marginTop: 4 },

    suggestionItem: { padding: 10, borderBottomColor: '#eee', borderBottomWidth: 1 },

    chip: { backgroundColor: '#f5f5f5', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 20, marginRight: 8, marginBottom: 8 },
    chipText: { color: '#333' },

    bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', padding: 12, backgroundColor: '#fff', justifyContent: 'space-between' },
    btnReset: { flex: 1, marginRight: 8, backgroundColor: '#000', paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
    btnResetText: { color: '#fff', fontWeight: '600' },
    btnApply: { flex: 1, marginLeft: 8, backgroundColor: '#333', paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
    btnApplyText: { color: '#fff', fontWeight: '600' },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    modalContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        width: "75%",
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 12,
        elevation: 10,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
        textAlign: "center",
    },

    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    modalItemText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
    },

});
