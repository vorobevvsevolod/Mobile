import {createSlice} from "@reduxjs/toolkit";

const NewPostSlice = createSlice({
	name: "newPost",
	initialState:{
		text: '',
		uriIMG: '',
		publich: false,
		loading: false,
		submitClick: false
		
	},
	reducers:{
		setText: (state, action) =>{
			state.text = action.payload;
		},
		setUriIMG: (state, action) =>{
			state.uriIMG = action.payload;
		},
		setPublich: (state, action) =>{
			state.publich = action.payload;
		},
		setLoading: (state, action) =>{
			state.loading = action.payload;
		},
		setSubmitClick: (state, action) =>{
			state.submitClick = action.payload;
		}
	}
})

export const { setText, setUriIMG, setPublich, setLoading, setSubmitClick  } = NewPostSlice.actions;
export const NewPost = NewPostSlice.reducer;
