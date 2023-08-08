import React from 'react';
import {Image, StyleSheet,  TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {launchImageLibraryAsync} from "expo-image-picker";
import { setSubmitClick, setText, setUriIMG } from "../Redux/Slice/NewPost";
import { useLinkTo } from "@react-navigation/native";

const styles = StyleSheet.create({
	container:{
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerText: {
		flexDirection: "row",
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	input:{
		width: '80%',
		padding: 10,
		fontSize: 20,
		borderBottomColor: '#bbbbbb',
		borderBottomWidth: 2,
	},
	avatar: {
		width: 55,
		height: 55,
		borderRadius: 50,
		marginRight: 10,
	},
	
	button:{
		width: 300,
		height: 300,
		backgroundColor: '#dddddd',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginTop:30
	},
	buttonImg:{
		width: 60,
		height:60
	},
	selectImg:{
		borderRadius: 10,
		width: '100%',
		height: '100%'
	}
})

const NewPost = () => {
	const dispatch = useDispatch();
	const linkTo = useLinkTo();
	
	const { avatar } = useSelector(state => state.userInfo);
	const { text, uriIMG, submitClick, publish } = useSelector(state => state.newPost)
	
	const handleChange = (text) => {
		dispatch(setText(text))
	};
	
	const onClickImage = () =>{
		choosePhotoFromGallery().then(res =>{
			dispatch(setUriIMG(res))
		})
	}
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
	
	React.useEffect(() =>{
		if(submitClick)
			if(!uriIMG){
				dispatch(setSubmitClick(false))
				alert('Вы не добавили изображение')
			} else {
				linkTo('/Home')
			}
		
	}, [submitClick])
	
	
	return (
		<View style={styles.container}>
			<View style={styles.containerText}>
				<Image source={{ uri: avatar ? avatar : require('../assets/anonimFoto.jpg') }} style={styles.avatar} />
				<TextInput
					style={styles.input}
					value={text}
					onChangeText={handleChange}
					placeholder="Добавьте текст к вашему событию..."
					cursorColor='#ff6900'
					multiline={true}
				/>
			</View>
			<TouchableOpacity style={styles.button} onPress={() => onClickImage()}>
				{
					uriIMG
					? <Image source={{uri: uriIMG}} style={styles.selectImg} />
					: <Image source={require('../assets/camera.png')} style={styles.buttonImg} />
 				}
			</TouchableOpacity>
		</View>
	);
};

export default NewPost;