import { GoogleGenerativeAI } from '@google/generative-ai';
import { constants } from '../config/constants';

// Initialize the API with the key from constants
const genAI = new GoogleGenerativeAI(constants.geminiApiKey);

/**
 * Extracts text from an image using the Gemini multimodal API.
 * @param base64Image The base64 representation of the image
 * @returns The extracted text as a string
 */
export async function extractTextFromImage(base64Image: string): Promise<string> {
    if (!constants.geminiApiKey) {
        throw new Error('Gemini API key is not configured. Please add it to .env');
    }

    try {
        // Note: Using gemini-flash-latest as the standard capable endpoint
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        // Format the image for the API
        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: 'image/jpeg',
            },
        };

        const prompt = 'Extract all text from this image exactly as written. Preserve line breaks and formatting as much as possible. If there is no text, return an empty string. Only return the text, nothing else.';

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error('Error in AI extraction:', error);

        // Handle Gemini API rate limiting specifically
        if (error?.message?.includes('429') || error?.message?.includes('exceeded your current quota')) {
            throw new Error('API Rate limit exceeded. Please wait a few moments and try again (you may need to upgrade your API tier).');
        }

        throw new Error('Failed to extract text from the image.');
    }
}
