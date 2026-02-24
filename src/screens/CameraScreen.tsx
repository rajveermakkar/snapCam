import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import ShutterButton from '../components/ShutterButton';
import LoadingOverlay from '../components/LoadingOverlay';
import { theme } from '../styles/theme';
import { extractTextFromImage } from '../services/aiService';

type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;

interface Props {
    navigation: CameraScreenNavigationProp;
}

export default function CameraScreen({ navigation }: Props) {
    const [permission, requestPermission] = useCameraPermissions();
    const [isProcessing, setIsProcessing] = useState(false);
    const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Text style={styles.permissionButton} onPress={requestPermission}>
                    Grant Permission
                </Text>
            </View>
        );
    }

    const handleCapture = async () => {
        if (!cameraRef.current || isProcessing) return;

        try {
            setIsProcessing(true);

            // Capture the photo and get base64
            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
                quality: 0.7, // Optimize for faster upload
            });

            if (!photo?.base64) {
                throw new Error('Failed to capture image');
            }

            // Immediately set the preview image so the camera appears to "freeze"
            setCapturedPreview(`data:image/jpeg;base64,${photo.base64}`);

            // Call Gemini API
            const extractedText = await extractTextFromImage(photo.base64);

            // Navigate to Result screen
            navigation.navigate('Result', {
                extractedText,
                imageUri: photo.uri,
            });

            // Clear the preview state *after* navigation so when they return it's live
            // Add a tiny delay so the navigation transition looks smooth
            setTimeout(() => setCapturedPreview(null), 500);

        } catch (error) {
            console.error(error);
            Alert.alert(
                'Extraction Failed',
                error instanceof Error ? error.message : 'Could not read text from the image. Please try again.',
                [{ text: 'OK' }]
            );
            // If failed, clear the preview to let them try again immediately
            setCapturedPreview(null);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <View style={styles.container}>
            {isProcessing && <LoadingOverlay label="Extracting Text..." />}

            {capturedPreview ? (
                <Image
                    source={{ uri: capturedPreview }}
                    style={styles.camera}
                />
            ) : (
                <CameraView
                    style={styles.camera}
                    facing="back"
                    ref={cameraRef}
                />
            )}

            <View style={styles.overlay}>
                {/* Top instruction text */}
                <View style={styles.instructionContainer}>
                    <Text style={styles.instructionText}>Point at text & tap to capture</Text>
                </View>

                {/* Bottom shutter area */}
                <View style={styles.controlsContainer}>
                    <ShutterButton
                        onPress={handleCapture}
                        disabled={isProcessing}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl,
    },
    message: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: theme.typography.sizes.body,
        marginBottom: theme.spacing.lg,
    },
    permissionButton: {
        color: theme.colors.primary,
        fontSize: theme.typography.sizes.h2,
        fontWeight: theme.typography.weights.medium as any,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        padding: theme.spacing.lg,
        paddingTop: theme.spacing.xl * 2,
    },
    instructionContainer: {
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.full,
        marginTop: theme.spacing.md,
    },
    instructionText: {
        color: theme.colors.onPrimary,
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.medium as any,
    },
    controlsContainer: {
        alignItems: 'center',
        paddingBottom: theme.spacing.xl,
    },
});
