import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { storage } from '../firabase'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import {useLinkTo, useNavigation} from '@react-navigation/native';

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

const LinktoNewPost = () => {
	const linkTo = useLinkTo();
	
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => linkTo('/NewPost')}>
                <Text style={styles.buttonText}>Новый пост</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LinktoNewPost;
