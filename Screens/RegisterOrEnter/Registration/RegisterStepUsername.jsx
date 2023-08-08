import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useLinkTo} from "@react-navigation/native";
import axios from "axios";
import {saveAuthToken} from "../../../Utilities/token";
import {useDispatch, useSelector} from "react-redux";
import {setUsernameNewUser} from "../../../Redux/Slice/NewUserRegistration";

const RegisterStepUsername = () => {
	const { username } = useSelector(state => state.newUserRegistration)
	const linkTo = useLinkTo();
	const dispatch = useDispatch();
	const onClick = () =>{
		linkTo('/RegisterStepAge')
	}
	
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.subTitle}>Замечательно.</Text>
				<Text style={styles.title}>Как другие могут обращаться к тебе?</Text>
				<View>
					<TextInput
						style={styles.input}
						value={username}
						onChangeText={(value) => dispatch(setUsernameNewUser(value))}
						placeholder="Ваше имя"
						cursorColor='#ff6900'
						textContentType={"emailAddress"}
					/>

				</View>
				
				<TouchableOpacity style={[styles.buttonRegister, (username.length >= 5) ? styles.buttonRegisterActive  : styles.buttonRegisterNotActive]} onPress={onClick}>
					
					<Text style={styles.buttonRegisterText}>Далее</Text>
					
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
	buttonRegister:{
		paddingHorizontal: 30,
		paddingTop: 10,
		paddingBottom:12,
		borderWidth: 2,
		borderRadius: 20,
		width: '100%',
		alignItems: "center",
		marginTop: 10
	},
	buttonRegisterNotActive:{
		borderColor: '#575757',
	},
	buttonRegisterActive:{
		borderColor: 'transparent',
		backgroundColor: '#ff6900'
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
		marginBottom: 20,
		color: '#ffffff'
	},
	subTitle:{
		fontSize:18,
		color: '#6c6c6c',
	},
	input:{
		color: '#ffffff',
		marginBottom: 20,
		fontSize: 30,
		paddingHorizontal: 8,
		paddingVertical: 10,
		borderRadius: 5
	}
	
})


export default RegisterStepUsername;