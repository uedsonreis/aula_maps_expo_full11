import React from 'react';
import { LatLng } from 'react-native-maps';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';

import * as placeRepo from '../../services/place.repository'

import styles from './styles';
import { Place } from '../../models';

export default function EditPlacePage() {

    const route = useRoute();
    const navigation = useNavigation<NavigationProp<any>>();

    const place = route.params as Place;

    const [name, setName] = React.useState(place.name ? place.name : '');
    const [description, setDescription] = React.useState(place.description ? place.description : '');

    React.useEffect(() => {

        navigation.setOptions({
            title: place.name ? 'Alterar Local' : 'Cadastrar Novo Local',
        });

    }, []);

    function save() {
        placeRepo.savePlace({
            latitude: place.latitude, longitude: place.longitude,
            name, description
        }).then(saved => {
            navigation.goBack()
        })
    }

    return (
        <View style={styles.container}>
            <Text>Latitude: {place.latitude}</Text>
            <Text>Longitude: {place.longitude}</Text>

            <View style={styles.main}>
                <Text style={styles.label}>Informe o nome do local referente as coordenadas acima</Text>

                <TextInput
                    style={styles.input} value={name}
                    placeholder='Nome' onChangeText={setName}
                />

                <TextInput
                    multiline={true} numberOfLines={10}
                    style={styles.textArea} value={description}
                    placeholder='Descrição' onChangeText={setDescription}
                />

                <View style={styles.buttonView}>
                    <Button title="Salvar" onPress={save} />
                </View>

            </View>

        </View>
    )
}