import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.brandContainer}>
                    <Ionicons name="scan-outline" size={64} color={theme.colors.primary} />
                    <Text style={styles.title}>SnapText</Text>
                    <Text style={styles.subtitle}>Point, shoot, and copy any text instantly.</Text>
                </View>

                <TouchableOpacity
                    style={styles.startButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Camera')}
                >
                    <Ionicons name="camera" size={24} color={theme.colors.onPrimary} />
                    <Text style={styles.startButtonText}>Open Camera</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
        gap: theme.spacing.xxl * 2,
    },
    brandContainer: {
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    title: {
        fontSize: theme.typography.sizes.title,
        color: theme.colors.text,
        fontWeight: theme.typography.weights.bold as any,
    },
    subtitle: {
        fontSize: theme.typography.sizes.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        maxWidth: '80%',
    },
    startButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        borderRadius: theme.borderRadius.full,
        gap: theme.spacing.sm,
        elevation: 4,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    startButtonText: {
        color: theme.colors.onPrimary,
        fontSize: theme.typography.sizes.h2,
        fontWeight: theme.typography.weights.bold as any,
    }
});
