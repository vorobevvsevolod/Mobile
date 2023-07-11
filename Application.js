import React from 'react';
import Header from "./componets/Header";
import Posts from "./componets/Posts";
import {fetchUserInfo} from "./Redux/Slice/User";
import {useDispatch} from "react-redux";
import {View, StyleSheet} from "react-native";
import { StatusBar } from 'expo-status-bar';

const Application = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchUserInfo());
    }, []);


    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.container}>
                <Posts/>
            </View>
            {/*<StatusBar style={'auto'}/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Application;