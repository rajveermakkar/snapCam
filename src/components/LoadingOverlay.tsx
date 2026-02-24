import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface LoadingOverlayProps {
    label?: string;
}

export default function LoadingOverlay({ label = 'Processing...' }: LoadingOverlayProps) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.label}>{label}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        gap: theme.spacing.md,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    label: {
        color: theme.colors.text,
        fontSize: theme.typography.sizes.body,
        fontWeight: theme.typography.weights.medium as any,
    },
});
