import React, { useState } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import PlaceScreen from "../screens/PlaceScreen";
import UserScreen from "../screens/UserScreen";
import MessageScreen from "../screens/MessageScreen";

// Import other screens here


export default function AppNavigation() {


    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // This function could be triggered after successful login
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state'
    ]);


    function HomeStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                {/* Add other Stack Screens for Home here if needed */}
            </Stack.Navigator>
        );
    }


    function PlaceStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Place" options={{ headerShown: false }} component={PlaceScreen} />
                {/* Add other Stack Screens for Login here if needed */}
            </Stack.Navigator>
        );
    }

    function MessageStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Message" options={{ headerShown: false }} component={MessageScreen} />
                {/* Add other Stack Screens for Login here if needed */}
            </Stack.Navigator>
        );
    }


    function UserStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="User" options={{ headerShown: false }} component={UserScreen} />
                {/* Add other Stack Screens for Login here if needed */}
            </Stack.Navigator>
        );
    }


    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <Tab.Navigator>
                    <Tab.Screen
                        name="Home"
                        component={HomeStack}
                        options={{
                            title: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="menu-outline" color={color} size={size} />
                            )
                        }}
                    />


                    <Tab.Screen
                        name="Place"
                        component={PlaceStack}
                        options={{
                            title: 'Place',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="analytics-outline" color={color} size={size} />
                            )
                        }}
                    />

                    <Tab.Screen
                        name="User"
                        component={UserStack}
                        options={{
                            title: 'User',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="people-outline" color={color} size={size} />
                            )
                        }}
                    />


                    <Tab.Screen
                        name="Message"
                        component={MessageStack}
                        options={{
                            title: 'Message',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} />
                            )
                        }}
                    />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login">
                        {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
                    </Stack.Screen>
                </Stack.Navigator>
            )}

        </NavigationContainer>
    );
}
