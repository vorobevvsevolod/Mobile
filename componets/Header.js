import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import UploadPhotoButton from "./UploadImages";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c1c1c1",
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image source={require('../assets/icon.png')} style={styles.logo} />
                <Text style={styles.title}>Kidsnet</Text>
            </View>

            <View>
                <UploadPhotoButton />
            </View>
        </View>
    );
};

export default Header;
