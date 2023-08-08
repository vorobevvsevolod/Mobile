import { StatusBar } from 'expo-status-bar';
import React from "react";

import {Provider} from "react-redux";
import { store } from "./Redux";
import {Navigation} from "./router";


export default function App() {
	
	
        return (
            <Provider store={store}>
	            <Navigation/>
	            {/*<StatusBar style={'auto'}/>*/}
            </Provider>
        );
}




