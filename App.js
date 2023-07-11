import { StatusBar } from 'expo-status-bar';
import React from "react";

import {Provider} from "react-redux";
import { store } from "./Redux";
import Application from "./Application";




export default function App() {

        return (
            <Provider store={store}>
                <Application/>
            </Provider>
        );
}




