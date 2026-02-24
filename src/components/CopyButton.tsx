import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../styles/theme';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

interface CopyButtonProps {
    textToCopy: string;
    style?: ViewStyle;
}

export default function CopyButton({ textToCopy, style }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!textToCopy) return;

        await Clipboard.setStringAsync(textToCopy);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <TouchableOpacity
            style={[styles.button, copied ? styles.buttonCopied : null, style]}
            onPress={handleCopy}
            activeOpacity={0.8}
        >
            <Ionicons
                name={copied ? 'checkmark' : 'copy-outline'}
                size={24}
                color={theme.colors.onPrimary}
            />
            <Text style={styles.label}>
                {copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        gap: theme.spacing.md,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonCopied: {
        backgroundColor: theme.colors.success,
    },
    label: {
        color: theme.colors.onPrimary,
        fontSize: theme.typography.sizes.body,
        fontWeight: theme.typography.weights.bold as any,
    }
});
