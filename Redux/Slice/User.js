import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {getAuthToken} from "../../Utilities/token";

export const fetchUserInfo = createAsyncThunk('userInfo/fetchUserInfo', async () =>{
    const idUser = await getAuthToken().then(async (res) => {
        return res
    })
	
	const userId = await getAuthToken();
	
	const { data } = await axios.get('https://64ab30660c6d844abedf3a82.mockapi.io/users/'+ idUser)
    return {...data, userId: userId}
})

const UserSlice = createSlice({
    name: 'User',
    initialState:{
        login:'',
        username: '',
        password:'',
        avatar:'',
        createdAt: '',
        email:'',
        token:'',
	    userId: null,
	    favoritePost: []
    },
    reducers:{
		setFavoritePost: (state, action) =>{
			state.favoritePost = action.payload;
		}
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchUserInfo.pending, (state) => {
        })
        .addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.name = action.payload.username;
            state.login = action.payload.login;
            state.avatar = action.payload.avatar;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
			state.favoritePost = action.payload.favoritePost;
        })
        .addCase(fetchUserInfo.rejected, (state, action) => {
        })
    }
})

export const { setFavoritePost } = UserSlice.actions;
export const UserInfo = UserSlice.reducer;

