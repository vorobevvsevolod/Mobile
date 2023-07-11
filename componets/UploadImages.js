import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { storage } from '../firabase'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"


const styles = StyleSheet.create({
    container: {
    },
    button: {
        backgroundColor: '#ff6900',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: "bold"
    },
});

const UploadPhotoButton = () => {
    const choosePhotoFromGallery = async () => {
        try {
            const result = await launchImageLibraryAsync({
                mediaTypes: 'Images',
                quality: 1,
                allowsEditing: true,
            });
            let nameFile = result.assets[0].uri.split('/')[result.assets[0].uri.split('/').length - 1];
            const storageRef = ref(storage, nameFile);
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();

            await uploadBytes(storageRef, blob);

            const downloadUrl = await getDownloadURL(storageRef);
            console.log('URL загруженного файла:', downloadUrl);


        } catch (error) {
            console.log('Ошибка при выборе фото:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={choosePhotoFromGallery}>
                <Text style={styles.buttonText}>Новый пост</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UploadPhotoButton;
