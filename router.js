import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import {NavigationContainer} from "@react-navigation/native";
import NewPost from "./Screens/NewPost";
import { StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import {setSubmitClick} from "./Redux/Slice/NewPost";
import RegisterOrEnter from "./Screens/RegisterOrEnter/RegisterOrEnter";
import RegisterStart from "./Screens/RegisterOrEnter/Registration/RegisterStart";
import EnterStart from "./Screens/RegisterOrEnter/EnterStart";
import Enter from "./Screens/RegisterOrEnter/Enter";
import LoadingStart from "./Screens/LoadingStart";
import Register from "./Screens/RegisterOrEnter/Registration/Register";
import RegisterStepUsername from "./Screens/RegisterOrEnter/Registration/RegisterStepUsername";
import RegisterStepAge from "./Screens/RegisterOrEnter/Registration/RegisterStepAge";
import RegisterStepAvatarAndEnd from "./Screens/RegisterOrEnter/Registration/RegisterStepAvatarAndEnd";
import {fetchNewUser, setAvatarNewUser} from "./Redux/Slice/NewUserRegistration";
import AllUsersLiked from "./Screens/AllUsersLiked";

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({

	button: {
		paddingLeft:20
	},
	buttonTextNewPost: {
		color: '#ff6900',
		fontSize: 16,
		textTransform: 'capitalize',
		fontWeight: "600"
	},
	
	buttonTextNewUser: {
		color: '#ff6900',
		fontSize: 16,
		textTransform: 'capitalize',
		fontWeight: "600"
	},
});
export const Navigation = () => {
	const dispatch = useDispatch();
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Loading" component={LoadingStart} options={{ headerShown: false }} />
				<Stack.Screen name="RegisterOrEnter" component={RegisterOrEnter} options={{ headerShown: false }} />
				<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
				<Stack.Screen name="RegisterStart" component={RegisterStart} options={{ title: 'Регистрация' }}/>
				<Stack.Screen name="EnterStart" component={EnterStart} options={{ title: 'Вход' }}/>
				<Stack.Screen name="Enter" component={Enter} options={{ title: '' }}/>
				<Stack.Screen name="Register" component={Register} options={{ title: '' }}/>
				<Stack.Screen name="RegisterStepUsername" component={RegisterStepUsername} options={{ title: '' }}/>
				<Stack.Screen name="RegisterStepAge" component={RegisterStepAge} options={{ title: '' }}/>
				<Stack.Screen name="AllUsersLiked" component={AllUsersLiked} options={{ title: 'Это понравилось' }}/>
				<Stack.Screen
					name="RegisterStepAvatarAndEnd"
					component={RegisterStepAvatarAndEnd}
					options={{
						title: '',
						headerRight: () => (
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									dispatch(setAvatarNewUser(''))
									dispatch(fetchNewUser())
								}}
							>
								<Text style={styles.buttonTextNewUser}>Пропустить</Text>
							</TouchableOpacity>
						)
						
				
				}}/>
				<Stack.Screen
					name="NewPost"
					component={NewPost}
					options={{
						title: 'Поделиться событием',
						headerRight: () => (
							<TouchableOpacity
								style={styles.button}
								onPress={() => dispatch(setSubmitClick(true))} // Переход на страницу "Home"
							>
								<Text style={styles.buttonTextNewPost}>Поделиться</Text>
							</TouchableOpacity>
						),
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};