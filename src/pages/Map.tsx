import React from 'react';
import * as Location from 'expo-location';
import { Alert, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import MapView, { LongPressEvent, Marker } from 'react-native-maps';

import * as placeRepo from '../services/place.repository'
import { Place } from '../models';

export default function MapPage() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [places, setPlaces] = React.useState<Place[]>([])

    const [location, setLocation] = React.useState<Location.LocationObject>();

    React.useEffect(() => {

        Location.requestForegroundPermissionsAsync().then((response: Location.LocationPermissionResponse) => {
            if (response.status === 'granted') {
                Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest }).then(location => {
                    setLocation(location);
                });
            } else {
                Alert.alert('Permissão negada', 'Permissão para acessar a localização foi negada');
            }
        });

        placeRepo.getPlaces().then(list => setPlaces(list))

        navigation.addListener('focus', () => {
            placeRepo.getPlaces().then(list => setPlaces(list))
        })

    }, []);

    function goToCreatePlace(event: LongPressEvent) {
        navigation.navigate('EditPlace', event.nativeEvent.coordinate);
    }

    function goToEditPlace(place: Place) {
        navigation.navigate('EditPlace', place)
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                zoomControlEnabled={true}
                camera={location && {
                    center: location?.coords,
                    heading: 0, pitch: 0, zoom: 15
                }}
                onLongPress={goToCreatePlace}
            >
                { places.map(p => (
                    <Marker
                        key={`${p.latitude}_${p.longitude}`}
                        title={p.name}
                        onPress={() => goToEditPlace(p)}
                        coordinate={{ latitude: p.latitude, longitude: p.longitude }}
                    />
                )) }
            </MapView>
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