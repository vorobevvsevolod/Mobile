import { configureStore } from '@reduxjs/toolkit';
import {UserInfo} from "./Slice/User";
import {NewPost} from "./Slice/NewPost";
import {NewUserRegistration} from "./Slice/NewUserRegistration";
import {PostsSlice} from "./Slice/PostsSlice";


export const store = configureStore({
    reducer:{
        userInfo: UserInfo,
	    newPost: NewPost,
	    newUserRegistration: NewUserRegistration,
	    posts: PostsSlice
    }
})

