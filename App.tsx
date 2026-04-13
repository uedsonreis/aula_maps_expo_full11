import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapPage from './src/pages/Map';
import EditPlacePage from './src/pages/EditPlace';

const Stack = createNativeStackNavigator();

function MapStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Map" component={MapPage} options={{ headerShown: false }} />
            <Stack.Screen name="EditPlace" component={EditPlacePage} />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Map" component={MapStack} options={{ headerShown: false }} />
                <Stack.Screen name="EditPlace" component={EditPlacePage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
