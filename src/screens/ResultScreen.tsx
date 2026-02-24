import React from 'react';
import { View, TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import CopyButton from '../components/CopyButton';
import { theme } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route }: Props) {
    const { extractedText, imageUri } = route.params;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>

                    <View style={styles.card}>
                        <TextInput
                            style={styles.textInput}
                            multiline
                            value={extractedText}
                            editable={false} // Make it selectable but not directly editable to prevent accidental keyboards popping up constantly, though users might want to edit. MVP: strictly copy.
                            placeholder="No text was found."
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.thumbnail}
                            resizeMode="cover"
                        />
                        <View style={styles.actionContainer}>
                            <CopyButton textToCopy={extractedText} />
                        </View>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        padding: theme.spacing.lg,
        gap: theme.spacing.lg,
    },
    card: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    textInput: {
        flex: 1,
        color: theme.colors.text,
        fontSize: theme.typography.sizes.body,
        lineHeight: 24,
        textAlignVertical: 'top',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.surface,
    },
    actionContainer: {
        flex: 1,
    },
});
