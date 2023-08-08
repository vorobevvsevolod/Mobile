import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useLinkTo} from "@react-navigation/native";

const RegisterOrEnter = () => {
	const linkTo = useLinkTo();
	const onClickRegister = () =>{
		linkTo('/RegisterStart')
	}
	
	const onClickEnter = () =>{
		linkTo('/EnterStart')
	}
	
	return (
		<View style={styles.container}>
			<Image style={styles.startImage} source={require('../../assets/FotoEnter.jpg')}/>
			<View style={styles.bottomContainer}>
				
				<View style={styles.textContainer}>
					<Text style={styles.title}>Добро пожаловать в AnimalCult.</Text>
					<Text style={styles.subTitle}>Ведущая социальная сеть для знакомств питомцев</Text>
				</View>
				
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.buttonRegister} onPress={onClickRegister}>
						<Text style={styles.buttonRegisterText}>Я новенький</Text>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.buttonEnter} onPress={onClickEnter}>
						<Text style={styles.buttonEnterText}>Войти</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		flex: 1
	},
	startImage:{
		height: '60%',
		width: '100%',
	},
	bottomContainer:{
		justifyContent: 'center',
		flex: 1,
		padding: 10,
		backgroundColor: '#181818'
	},
	buttonContainer:{
		flexDirection: "row",
		justifyContent: "space-between"
	},
	buttonRegister:{
		paddingHorizontal: 30,
		paddingTop: 10,
		paddingBottom:12,
		backgroundColor: '#ff6900',
		borderRadius: 20,
		width: '52%',
		alignItems: "center"
	},
	buttonRegisterText:{
		fontWeight: 900,
		fontSize: 13,
		letterSpacing: 0.5
	},
	
	buttonEnter:{
		paddingHorizontal: 30,
		paddingTop: 10,
		paddingBottom:10,
		borderWidth: 2,
		borderColor: '#575757',
		borderRadius: 20,
		width: '45%',
		alignItems: "center"
	},
	buttonEnterText:{
		fontSize: 13,
		letterSpacing: 0.5,
		color: '#7c7c7c',
		fontWeight: 700
	},
	textContainer:{
		textAlign: "left",
		marginBottom: 18
	},
	title: {
		fontSize: 22
	},
	subTitle:{
		fontSize:17,
		color: '#6e6e6e'
	}
})
export default RegisterOrEnter;