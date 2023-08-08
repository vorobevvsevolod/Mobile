import React from 'react';
import { Image, View} from "react-native";
import {getAuthToken} from "../Utilities/token";
import {useLinkTo} from "@react-navigation/native";

const LoadingStart = () => {
	const linkTo = useLinkTo();
	
	React.useEffect(() =>{
		getAuthToken().then(res =>{
			if(res) linkTo('/Home')
				else linkTo('/RegisterOrEnter')
		})
	},[])
	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#ff6900'}}>
			<Image source={require('../assets/adaptive-icon.png')} style={{ width: 100, height: 100}}/>
		</View>
	);
};


export default LoadingStart;