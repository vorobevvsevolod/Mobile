import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useLinkTo} from "@react-navigation/native";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setEmailNewUser, setPasswordNewUser} from "../../../Redux/Slice/NewUserRegistration";

const Register = () => {
	const [loading, setLoading] = React.useState(false);
	const { email, password } = useSelector(state => state.newUserRegistration)
	
	const linkTo = useLinkTo();
	const dispatch = useDispatch();
	
	const onClick = () =>{
		if(email && password){
			setLoading(true)
			axios.get('https://64ab30660c6d844abedf3a82.mockapi.io/users?email=' + email).then(res =>{
				setLoading(false);
				if(res.data.length){
					alert('Данная электронная почта уже используется')
					
				} else linkTo('/RegisterStepUsername')
				
			})
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.subTitle}><Text style={styles.title}>Добро пожаловать</Text> введи адрес эл.почты и придумайте пароль</Text>
				
				<View>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={(value) => dispatch(setEmailNewUser(value))}
						placeholder="Email"
						cursorColor='#ff6900'
						textContentType={"emailAddress"}
					/>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={(value) => dispatch(setPasswordNewUser(value))}
						placeholder="Пароль"
						cursorColor='#ff6900'
						textContentType={"password"}
						secureTextEntry={true}
					/>
				</View>
				
				<TouchableOpacity style={[styles.buttonRegister, (email && password.length >= 5) ? styles.buttonRegisterActive  : styles.buttonRegisterNotActive]} onPress={onClick}>
					{
						loading ? <ActivityIndicator color={'#ffffff'} size={"small"}/> :<Text style={styles.buttonRegisterText}>Далее</Text>
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


export default Register;