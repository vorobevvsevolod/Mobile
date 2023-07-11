import { configureStore } from '@reduxjs/toolkit';
import {UserInfo} from "./Slice/User";

export const store = configureStore({
    reducer:{
        userInfo: UserInfo
    }
})

