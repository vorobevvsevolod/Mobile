import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useLinkTo} from "@react-navigation/native";

const RegisterStart = () => {
	const linkTo = useLinkTo();
	const onClick = () =>{
		linkTo('/Register')
	}
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.subTitle}>Давай создадим аккаунт для тебя.</Text>
				<Text style={styles.title}>Мы обещаем, это не займет много времени.</Text>
				
					<TouchableOpacity style={styles.buttonRegister} onPress={onClick}>
						<Text style={styles.buttonRegisterText}>Создать с помощью email</Text>
					</TouchableOpacity>
				<Text style={styles.text}>Нажимая продолжить ты соглашаешься с нашими условиями & использования и политикой конфиденциальности</Text>
			</View>
			
			
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		flex: 1,
		backgroundColor: '#181818',
		justifyContent: "center"
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
		marginBottom: 18,
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


export default RegisterStart;