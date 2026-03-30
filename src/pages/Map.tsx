import React from 'react';
import MapView, { LongPressEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import { Alert, StyleSheet, View } from 'react-native';

export default function MapPage() {

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

    }, []);

    function goToCreatePlace(event: LongPressEvent) {
        Alert.alert('Long Press', 'Localização: ' + JSON.stringify(event.nativeEvent.coordinate));
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