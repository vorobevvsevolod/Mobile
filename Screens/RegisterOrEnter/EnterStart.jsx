import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useLinkTo} from "@react-navigation/native";

const EnterStart = () => {
	const linkTo = useLinkTo();
	const onClick = () =>{
		linkTo('/Enter')
	}
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.subTitle}>С возвращением</Text>
				<Text style={styles.title}>Быстрая авторизация.</Text>
				
				<TouchableOpacity style={styles.buttonRegister} onPress={onClick}>
					<Text style={styles.buttonRegisterText}>Войти с помощью email</Text>
				</TouchableOpacity>
				
			</View>
		
		
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		flex: 1,
		backgroundColor: '#181818',
	},
	bottomContainer:{
		justifyContent: 'center',
		flex: 1,
		padding: 10
	},
	buttonRegister:{
		paddingHorizontal: 30,
		paddingTop: 10,
		paddingBottom:12,
		borderWidth: 2,
		borderColor: '#575757',
		borderRadius: 20,
		width: '100%',
		alignItems: "center"
	},
	buttonRegisterText:{
		fontWeight: 700,
		fontSize: 13,
		letterSpacing: 0.5
	},
	textContainer:{
		textAlign: "left",
		padding: 10,
	},
	title: {
		fontSize: 22,
		marginBottom: 60
	},
	subTitle:{
		fontSize:17,
		color: '#6e6e6e'
	},
	text:{
		fontSize: 12,
		marginTop: 13
	}
})


export default EnterStart;