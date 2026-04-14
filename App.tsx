import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapPage from './src/pages/Map';
import ListPage from './src/pages/List';
import EditPlacePage from './src/pages/EditPlace';

const Stack = createNativeStackNavigator();

function MapStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Map" component={MapPage} options={{ title: '', headerTransparent: true }} />
            <Stack.Screen name="EditPlace" component={EditPlacePage} />
        </Stack.Navigator>
    )
}

function ListStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="List" component={ListPage} options={{ title: 'Lista' }} />
            <Stack.Screen name="EditPlace" component={EditPlacePage} />
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen
                    name="MapStack" component={MapStack}
                    options={{ drawerLabel: 'Mapa', headerShown: false }}
                />
                <Drawer.Screen
                    name="ListStack" component={ListStack}
                    options={{ drawerLabel: 'Lista', headerShown: false }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
