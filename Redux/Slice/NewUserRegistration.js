import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {SubmitImageToFireBase} from "../../Utilities/SubmitImageToFireBase";
import {saveAuthToken} from "../../Utilities/token";
export const fetchNewUser = createAsyncThunk(
	"newUserRegistration/fetchNewUserRegistration",
	async (option, thunkAPI) => {
		const state = thunkAPI.getState();
		const uriAvatar = state.newUserRegistration.avatar ? await SubmitImageToFireBase(state.newUserRegistration.avatar) : '';
		const login = state.newUserRegistration.email.split("@")[0];
		const data = {
			username: state.newUserRegistration.username,
			avatar: uriAvatar,
			password: state.newUserRegistration.password,
			login: login,
			email: state.newUserRegistration.email,
			age: state.newUserRegistration.age,
		};
		const result = await axios.post(
			"https://64ab30660c6d844abedf3a82.mockapi.io/users",
			data
		);
		
		const res = await saveAuthToken(result.data.id)
		 thunkAPI.dispatch(setPublish(true));
		 thunkAPI.dispatch(CleanAllNewUser());
	}
);
const NewUserRegistrationSlice = createSlice({
	name: 'newUserRegistration',
	initialState:{
		login:'',
		username: '',
		password:'',
		avatar:'',
		email:'',
		age: 0,
		publish: false
	},
	reducers:{
		setLoginNewUser: (state, action) =>{
			state.login = action.payload;
		},
		setUsernameNewUser: (state, action) =>{
			state.username = action.payload;
		},
		setPasswordNewUser: (state, action) =>{
			state.password = action.payload;
		},
		setAvatarNewUser: (state, action) =>{
			state.avatar = action.payload;
		},
		setEmailNewUser: (state, action) =>{
			state.email = action.payload;
		},
		setAgeNewUser: (state, action) =>{
			state.age = action.payload;
		},
		setPublish: (state, action) =>{
			state.publish = action.payload;
		},
		CleanAllNewUser: (state, action) =>{
			state.login = '';
			state.username = '';
			state.password = '';
			state.avatar = '';
			state.email = '';
			state.age = 0;
		},
	}
})

export const { setLoginNewUser, setAvatarNewUser, setEmailNewUser, setPasswordNewUser, setUsernameNewUser, CleanAllNewUser, setAgeNewUser,setPublish } = NewUserRegistrationSlice.actions
export const NewUserRegistration = NewUserRegistrationSlice.reducer;