import React from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import * as placeRepo from '../services/place.repository'
import { Place } from '../models';

export default function ListPage() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [places, setPlaces] = React.useState<Place[]>([])

    React.useEffect(() => {

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
                        <Text>{item.name}</Text>
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
    map: {
        width: '100%',
        height: '100%',
    },
});