import React from 'react';
import { LatLng } from 'react-native-maps';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';

export default function EditPlacePage() {

    const route = useRoute();
    const navigation = useNavigation<NavigationProp<any>>();

    const { coordinate } = route.params as { coordinate: LatLng };

    React.useEffect(() => {

        navigation.setOptions({
            title: 'Registro de Local',
        });

    }, []);

    return (
        <View style={styles.container}>
            <Text>Latitude: {coordinate.latitude}</Text>
            <Text>Longitude: {coordinate.longitude}</Text>

            <View style={styles.main}>
                <Text style={styles.label}>Informe o nome do local referente as coordenadas acima</Text>

                <TextInput style={styles.input} placeholder='Nome' />

                <TextInput style={styles.textArea} placeholder='Descrição' multiline={true} numberOfLines={10} />

                <View style={styles.buttonView}>
                    <Button title="Salvar" />
                </View>

            </View>

        </View>
    )
}