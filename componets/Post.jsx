import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {getAuthToken} from "../Utilities/token";
import {setFavoritePost} from "../Redux/Slice/User";
import {useLinkTo} from "@react-navigation/native";
import {setSelectPostViewAllLike, addUsersLiked, removeUserLiked} from "../Redux/Slice/PostsSlice";

const Post = (props) => {
	const dispatch = useDispatch();
	const linkTo = useLinkTo();
	
	const [liked, setLiked] = React.useState(false)
	const [countLike, setCountLike] = React.useState(0)
	const { avatar, favoritePost, userId } = useSelector(state => state.userInfo);
	
	const handleLike = () => {
		setCountLike((prevCount) => prevCount + 1);
		const newUserLiked = [...props.item.usersLiked];
		newUserLiked.push({
			userId: userId,
			avatar: avatar
		})

		dispatch(addUsersLiked({postId: props.item.id, newUsersLiked: newUserLiked}))
		axios
			.put('https://64ab30660c6d844abedf3a82.mockapi.io/posts/' + props.item.id, {
				likeCount: countLike + 1, usersLiked: newUserLiked
			})
			.then((res) => {
				const newFavoritePost = [...favoritePost];
				newFavoritePost.push({
					postId: props.item.id,
					date: Date.now(),
				});
					
				axios
					.put('https://64ab30660c6d844abedf3a82.mockapi.io/users/' + userId, {
						favoritePost: newFavoritePost,
					})
					.then((res) => {
						dispatch(setFavoritePost(newFavoritePost));
					})
					.catch((error) => {
						setLiked(false);
						alert('Ошибка! Попробуйте позже.');
						setCountLike((prevCount) => prevCount - 1);
					});
			})
			.catch((error) => {
				setLiked(false);
				alert('Ошибка! Попробуйте позже.');
				setCountLike((prevCount) => prevCount - 1);
			});
	};
	
	const handleUnlike = () => {
		setCountLike((prevCount) => prevCount - 1);
		setLiked(false);
		
		const postIdToRemove = props.item.id;
		const newFavoritePost = favoritePost.filter(
			(item) => item.postId !== postIdToRemove
		);
		const newUserLiked = props.item.usersLiked.filter(
			(item) => item.userId !== userId
		);

		dispatch(removeUserLiked({postId: postIdToRemove, userId: userId}))
		dispatch(setFavoritePost(newFavoritePost));
		
		axios
			.put('https://64ab30660c6d844abedf3a82.mockapi.io/posts/' + props.item.id, {
				likeCount: countLike - 1, usersLiked: newUserLiked
			})
			.then((res) => {
				getAuthToken().then((res) => {
					axios
						.put('https://64ab30660c6d844abedf3a82.mockapi.io/users/' + res, {
							favoritePost: newFavoritePost,
						})
						.then((res) => {
							// ...
						})
						.catch((error) => {
							setLiked(true);
							alert('Ошибка! Попробуйте позже.');
							setCountLike((prevCount) => prevCount + 1);
						});
				});
			})
			.catch((error) => {
				setLiked(true);
				alert('Ошибка! Попробуйте позже.');
				setCountLike((prevCount) => prevCount + 1);
			});
	};
	
	const LinkToAllUsersLiked = () =>{
		dispatch(setSelectPostViewAllLike(props.item.usersLiked))
		linkTo('/AllUsersLiked')
	}
	
	React.useEffect(() => {
		if (liked && !favoritePost.find((item) => item.postId === props.item.id)) {
			handleLike();
		} else if (
			!liked &&
			favoritePost.find((item) => item.postId === props.item.id) &&
			countLike
		) {
			handleUnlike();
		}
	}, [liked]);
	
	React.useEffect(() =>{
		if(props.item.likeCount) setCountLike(props.item.likeCount)
	},[props.item.likeCount])
	
	React.useEffect(() =>{
		if(props.item.favorite) setLiked(true)
	}, [props.item.favorite])
	const formatDate = (dateString) => {
		const date = new Date(dateString * 1000);
		const currentDate = new Date();
		const diffInMs = Math.abs(currentDate - date);
		const diffInSeconds = Math.floor(diffInMs / 1000);
		const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
		const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
		const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
		
		if (diffInSeconds < 60) {
			return `${diffInSeconds} секунд назад`;
		} else if (diffInMinutes < 60) {
			return `${diffInMinutes} минут назад`;
		} else if (diffInHours < 24) {
			return `${diffInHours} часов назад`;
		} else if (diffInDays === 1) {
			return 'Вчера';
		} else {
			return `${diffInDays} дней назад`;
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.itemContainer}>
				<View style={styles.userInfoContainer}>
					<Image source={{ uri: props.item.avatar ? props.item.avatar : require('../assets/anonimFoto.jpg') }} style={styles.avatar} />
					<View>
						<Text >Пользователь <Text style={styles.userName}>{props.item.username}</Text> </Text>
						<Text style={styles.userText}>опубликовал событие</Text>
						<Text style={styles.createdAt}>{formatDate(props.item.createdAt)}</Text>
					
					</View>
				</View>
				<Text style={styles.itemText}>{props.item.text}</Text>
			
			</View>
			{props.item.imgUrl && (
				<Image source={{ uri: props.item.imgUrl }} style={styles.itemImage} resizeMode="cover" />
			)}
			
			<View style={styles.actionsContainer}>
				<View style={styles.actionContainer}>
					<TouchableOpacity style={styles.heartButton} onPress={() => setLiked(!liked)}>
						{ liked ? <Image style={styles.actionImage} source={require('../assets/heartLiked.png')}/> : <Image style={styles.actionImage} source={require('../assets/heartNotLiked.png')}/>}
						<Text style={styles.actionCount}>{countLike ? countLike : ''}</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.heartCountButton} onPress={LinkToAllUsersLiked}>
					<View style={styles.miniatuContainer}>
						{props.item.usersLiked.slice(0, 3).map((user, index) => (
							<Image
								key={index}
								source={{ uri: user.avatar }}
								style={[styles.miniaturAvatar, { zIndex: index }]}
							/>
						))}
					</View>
					
				</TouchableOpacity>
			</View>
			
			<TouchableOpacity style={styles.comentContainer}>
				<Image source={{ uri: avatar ? avatar : require('../assets/anonimFoto.jpg') }} style={styles.comentAvatar} />
				<Text style={styles.comentText}>Оставь комментарий...</Text>
			</TouchableOpacity>
				
			
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#eaeaea',
		marginBottom: 10
	},
	itemContainer: {
		padding: 10,
		paddingTop: 5,
		marginTop: 8,
		paddingHorizontal: 10,
	},
	userInfoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 50,
		marginRight: 10,
	},
	userName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	userText: {
		fontSize: 14,
	},
	
	itemText: {
		fontSize: 14,
		marginBottom: 5,
	},
	itemImage: {
		width: '100%',
		aspectRatio: 4 / 3,
	},
	createdAt:{
		fontSize: 12
	},
	actionsContainer:{
		flexDirection: "row",
		padding: 5,
		
		marginTop:5
	},
	actionContainer:{
		flexDirection: "row",
		alignItems: "center",
		width: 70,
	},
	actionImage: {
		width: 32,
		height: 32
	},
	actionButton:{
		marginRight: 5
	},
	actionCount:{
		fontSize: 14,
	},
	heartButton:{
		flexDirection:"row",
		alignItems: "center",
	},
	heartCountButton:{
		width: 40,
	},
	comentContainer:{
		flexDirection:"row",
		alignItems: "center",
		padding: 7,
	},
	comentAvatar:{
		width: 35,
		height: 35,
		borderRadius: 50,
	},
	comentText:{
		fontSize:13,
		marginLeft:10,
		fontWeight: 400
	},
	miniaturAvatar:{
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 2,
		borderColor: 'white',
		marginLeft: -15,
	},
	miniatuContainer:{
		position: "absolute",
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	}
});

export default Post;