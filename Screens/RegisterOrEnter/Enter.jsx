import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useLinkTo} from "@react-navigation/native";
import axios from "axios";
import {saveAuthToken} from "../../Utilities/token";

const Enter = () => {
	const [valueEmail, setValueEmail] = React.useState('');
	const [valuePassword, setValuePassword] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const linkTo = useLinkTo();
	const onClick = () =>{
		if(valuePassword && valueEmail){
			setLoading(true)
			axios.get('https://64ab30660c6d844abedf3a82.mockapi.io/users?email=' + valueEmail).then(res =>{
				setLoading(false)
				if(!res.data.length){
					alert('Неправильная эл.почта или пароль')
				} else {
					if(res.data[0].password === valuePassword){
						saveAuthToken(res.data[0].id)
						linkTo('/Home')
					} else  alert('Неправильная эл.почта или пароль')
					
				}
			})
		}
	}
	
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.subTitle}><Text style={styles.title}>Отлично,</Text> введи адрес эл.почты и пароль, чтобы продолжить</Text>
				
				<View>
					<TextInput
						style={styles.input}
						value={valueEmail}
						onChangeText={(value) => setValueEmail(value)}
						placeholder="Email"
						cursorColor='#ff6900'
						textContentType={"emailAddress"}
					/>
					<TextInput
						style={styles.input}
						value={valuePassword}
						onChangeText={(value) => setValuePassword(value)}
						placeholder="Пароль"
						cursorColor='#ff6900'
						textContentType={"password"}
						secureTextEntry={true}
					/>
				</View>
				
				<TouchableOpacity style={[styles.buttonRegister, (valueEmail && valuePassword.length >= 5) ? styles.buttonRegisterActive  : styles.buttonRegisterNotActive]} onPress={onClick}>
					{
						loading ? <ActivityIndicator color={'#ffffff'} size={"small"}/> : <Text style={styles.buttonRegisterText}>Далее</Text>
					}
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
		paddingTop: 11,
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
		marginBottom: 60,
		color: '#ffffff'
	},
	subTitle:{
		fontSize:18,
		color: '#6c6c6c',
		marginBottom: 15
	},
	input:{
		backgroundColor: '#232323',
		color: '#ffffff',
		marginBottom: 10,
		fontSize: 16,
		paddingHorizontal: 8,
		paddingVertical: 10,
		borderRadius: 5
	}
	
})


export default Enter;