import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place } from "../models";

const PLACE_LIST_KEY = 'place@place_list';

export async function getPlaces() {
    const json = await AsyncStorage.getItem(PLACE_LIST_KEY);
    const list: Place[] = json ? JSON.parse(json) : [];
    return list;
}

export async function savePlace(place: Place) {
    const list = await getPlaces();

    const registered = list.find(p => p.latitude === place.latitude && p.longitude === place.longitude);
    if (registered) {
        registered.name = place.name;
        registered.description = place.description;
        registered.imageUri = place.imageUri;

    } else {
        list.push(place);
    }
    
    await AsyncStorage.setItem(PLACE_LIST_KEY, JSON.stringify(list));
}

export async function removePlace(place: Place) {
    let list = await getPlaces();
    list = list.filter(p => p.latitude !== place.latitude && p.longitude !== place.longitude);
    await AsyncStorage.setItem(PLACE_LIST_KEY, JSON.stringify(list));
}
