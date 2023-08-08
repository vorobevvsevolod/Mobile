import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useLinkTo} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewUser, setAgeNewUser, setAvatarNewUser} from "../../../Redux/Slice/NewUserRegistration";
import {launchImageLibraryAsync} from "expo-image-picker";

const RegisterStepAvatarAndEnd = () => {
	const { age, username, email, avatar, publish } = useSelector(state => state.newUserRegistration)
	const [loading, setLoading] = React.useState(false);
	const linkTo = useLinkTo();
	const dispatch = useDispatch();
	const onClick = () =>{
		if (avatar){
			setLoading(true)
			dispatch(fetchNewUser())
		} else {
			choosePhotoFromGallery().then(res =>{
				dispatch(setAvatarNewUser(res))
			})
		}
	}
	
	React.useEffect(() =>{
		if(publish){
			linkTo('/Home')
			setLoading(false)
		}
	}, [publish])
	const choosePhotoFromGallery = async () => {
		try {
			const result = await launchImageLibraryAsync({
				mediaTypes: 'Images',
				quality: 1,
				allowsEditing: true,
			});
			return result.assets[0].uri;
			
		} catch (error) {
			console.log('Ошибка при выборе фото:', error);
		}
	};
	return (
		<View style={styles.container}>
			
			<View style={styles.contentContainer}>
				<View style={styles.buttonSelectImg}>
					{
						avatar
							? <Image source={{uri: avatar}} style={styles.selectImg} />
							: <Image source={require('../../../assets/camera.png')} style={styles.buttonImg} />
					}
				</View>
				<View style={{ flexDirection: "row", alignItems: "center"}}>
					<Text style={styles.title}>{username} </Text>
					<Text style={styles.age}>{age}</Text>
				</View>
				
				<Text style={styles.subTitle}>{email}</Text>
				<TouchableOpacity style={[styles.buttonRegister,  (avatar) ? styles.buttonRegisterActive  : styles.buttonRegisterNotActive]} onPress={onClick}>
					{
						loading ? <ActivityIndicator color={'#ffffff'} size={"small"}/> :<Text style={styles.buttonRegisterText}>{avatar ? "Создать" : "Добавить фото"}</Text>
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
	
	contentContainer:{
		justifyContent:"center",
		alignItems: "center",
		padding: 10,
	},
	title: {
		fontSize: 32,
	},
	subTitle:{
		fontSize:18,
		opacity: 0.2,
		marginBottom: 20
	},
	age:{
		fontSize: 18,
		opacity: 0.2,
	},
	input:{
		color: '#ffffff',
		marginBottom: 20,
		fontSize: 30,
		paddingHorizontal: 8,
		paddingVertical: 10,
		borderRadius: 5
	},
	buttonImg:{
		width: 90,
		height:90
	},
	buttonSelectImg:{
		backgroundColor: '#efefef',
		width: 200,
		height: 200,
		alignItems:"center",
		justifyContent: "center",
		borderRadius: 20,
		marginVertical: 10
	},
	selectImg:{
		borderRadius: 10,
		width: '100%',
		height: '100%'
	}
	
})


export default RegisterStepAvatarAndEnd;