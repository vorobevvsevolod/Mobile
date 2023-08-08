import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const LoadingPhoto = ({ photoUrl }) => {
	const progressAnimation = useRef(new Animated.Value(0)).current;
	
	useEffect(() => {
		animateProgress();
	}, []);
	
	const animateProgress = () => {
		Animated.loop(
			Animated.timing(progressAnimation, {
				toValue: 1,
				duration: 2700,
				useNativeDriver: false,
			})
		).start();
	};
	
	const progressPosition = progressAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ['10000%', '-10000%'],
	});
	
	return (
		<View style={styles.container}>
			<View style={styles.photoContainer}>
				<Image source={{ uri: photoUrl }} style={styles.photo} />
			</View>
			<View style={styles.progressBarContainer}>
				<View style={styles.progressBar}>
					<Animated.View style={[styles.progress, { right: progressPosition }]} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderWidth: 2,
		borderColor: '#3d3d3d',
		marginLeft: 2,
	},
	photoContainer: {
		marginRight: 10,
	},
	photo: {
		width: 50,
		height: 50,
		borderRadius: 2,
	},
	progressBarContainer: {
		flex: 1,
		height: 4,
		backgroundColor: '#f2f2f2',
		borderRadius: 2,
		overflow: 'hidden',
	},
	progressBar: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#6c6c6c',
	},
	progress: {
		backgroundColor: '#ff6900',
		borderRadius: 2,
		width: 100,
		height: '100%',
	},
});

export default LoadingPhoto;
