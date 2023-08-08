import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {getAuthToken} from "../../Utilities/token";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (options, thunkAPI) =>{
	const state = thunkAPI.getState();
	
	const response = await axios.get(
		'https://64ab30660c6d844abedf3a82.mockapi.io/posts?sortBy=createdAt&order=desc'
	);
	
	return await Promise.all(response.data.map(async (post) => {
		const userId = post.userId;
		const userResponse = await axios.get(`https://64ab30660c6d844abedf3a82.mockapi.io/users/${userId}`);
		const {username, avatar} = userResponse.data;
		
		const isFavorite = state.userInfo.favoritePost.some((favorite) => favorite.postId === post.id);
		
		return {...post, username, avatar, favorite: isFavorite};
	}));
})


const Posts = createSlice({
	name: 'posts',
	initialState:{
		loadingPosts: true,
		posts: [],
		refreshing: false,
		selectPostViewAllLike: {}
	},
	reducers: {
		setPost: (state, action) =>{
			state.posts = action.payload;
		},
		setSelectPostViewAllLike: (state, action) =>{
			state.selectPostViewAllLike = action.payload;
		},
		addUsersLiked: (state, action) => {
			const { postId, newUsersLiked } = action.payload;
			const postIndex = state.posts.findIndex((post) => post.id === postId);
			if (postIndex !== -1) {
				state.posts[postIndex].usersLiked = newUsersLiked;
			}
		},
		removeUserLiked: (state, action) => {
			const { postId, userId } = action.payload;
			const postIndex = state.posts.findIndex((post) => post.id === postId);
			if (postIndex !== -1) {
				state.posts[postIndex].usersLiked = state.posts[postIndex].usersLiked.filter(
					(user) => user.userId !== userId
				);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.loadingPosts = true;
				state.refreshing = true;
				state.refreshing = false;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loadingPosts = false;
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state) => {
				state.loadingPosts = false;
				state.refreshing = false;
			});
	},
});

export const { setPost, setSelectPostViewAllLike, addUsersLiked, removeUserLiked } = Posts.actions;
export const PostsSlice = Posts.reducer;

