import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ResultScreen from '../screens/ResultScreen';
import { theme } from '../styles/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background,
                },
                headerTintColor: theme.colors.onPrimary,
                headerTitleStyle: {
                    fontWeight: theme.typography.weights.medium as any,
                },
                contentStyle: {
                    backgroundColor: theme.colors.background,
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'SnapText', headerTitleAlign: 'center', headerShown: false }}
            />
            <Stack.Screen
                name="Camera"
                component={CameraScreen}
                options={{ title: 'Capture Text', headerBackTitle: 'Home' }}
            />
            <Stack.Screen
                name="Result"
                component={ResultScreen}
                options={{ title: 'Extracted Text', headerBackTitle: 'Scan' }}
            />
        </Stack.Navigator>
    );
}
