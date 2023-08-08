import React from 'react';
import {Text, View, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';

const AllUsersLiked = () => {
	const { selectPostViewAllLike } = useSelector((state) => state.posts);
	

	const renderAvatarSquare = ({ item }) => {
		return (
			<TouchableOpacity style={styles.avatarSquare}>
				<Image source={{ uri: item.avatar }} style={styles.avatar} />
			</TouchableOpacity>
		);
	};
	
	return (
		<View style={styles.container}>
			<FlatList
				data={selectPostViewAllLike}
				numColumns={3} // Show three items per row
				renderItem={renderAvatarSquare}
				keyExtractor={(item) => item.userId.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	avatarSquare: {
		width: '32.3%',
		margin: 2,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		width: '100%',
		height: '100%',
	},
});

export default AllUsersLiked;
