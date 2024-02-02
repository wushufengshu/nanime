import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AnimeInfoScreen from './screens/AnimeInfoScreen';
import AnimeWatchScreen from './screens/AnimeWatchScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AnimeInfo" component={AnimeInfoScreen} />
                <Stack.Screen name="AnimeWatch" component={AnimeWatchScreen} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}
