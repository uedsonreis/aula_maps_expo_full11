import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as placeRepo from '../services/place.repository'
import { Place } from '../models';

export default function ListPage() {

    const navigation = useNavigation<any>();

    const [places, setPlaces] = React.useState<Place[]>([]);

    React.useEffect(() => {

        navigation.setOptions({
            headerLeft: () => <Ionicons name='menu' size={32} onPress={() => navigation.openDrawer()} />
        })

        placeRepo.getPlaces().then(list => setPlaces(list))

        navigation.addListener('focus', () => {
            placeRepo.getPlaces().then(list => setPlaces(list))
        })

    }, []);

    function goToEditPlace(place: Place) {
        navigation.navigate('EditPlace', place)
    }

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => `${item.latitude}_${item.longitude}`}
                data={places}
                renderItem={({ item }) => (
                    <View onTouchEnd={() => goToEditPlace(item)}>
                        <Text style={styles.label}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        padding: 20,
        borderColor: 'gray',
        borderBottomWidth: 1,
    },
});