import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinktoNewPost from "./LinktoNewPost";
import {saveAuthToken} from "../Utilities/token";
import {useLinkTo} from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c1c1c1",
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



const Header = () => {
	const linkTo = useLinkTo();
	
	const onClick = () =>{
		saveAuthToken('').then(res =>{
			linkTo('/RegisterOrEnter')
		})
	}
    return (
        <View style={styles.container}>
	        <TouchableOpacity style={styles.button} onPress={onClick}>
		        <Text style={styles.buttonText}>Выйти из аккаунта</Text>
	        </TouchableOpacity>
        </View>
    );
};

export default Header;
