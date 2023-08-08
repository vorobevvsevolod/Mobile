import React from 'react';
import {
	View,
	FlatList,
	ActivityIndicator,
	StyleSheet,
	RefreshControl,

} from 'react-native';
import axios from 'axios';
import {setLoading, setPublich, setSubmitClick, setText, setUriIMG} from "../Redux/Slice/NewPost";
import {useDispatch, useSelector} from "react-redux";
import LoadingNewPost from "./LoadingNewPost";
import {getAuthToken, saveAuthToken} from "../Utilities/token";
import {SubmitImageToFireBase} from "../Utilities/SubmitImageToFireBase";
import Post from "./Post";
import {fetchPosts, setPost} from "../Redux/Slice/PostsSlice";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        padding: 10,
        paddingTop: 5,
        marginTop: 8,
        paddingHorizontal: 10,
        backgroundColor: '#eaeaea',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userText: {
        fontSize: 14,
    },

    itemText: {
        fontSize: 14,
        marginBottom: 10,
    },
    itemImage: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 2,
    },
    createdAt:{
        fontSize: 12
    },
	actionsContainer:{
		flexDirection: "row",
		padding: 5,
		backgroundColor: '#eaeaea',
	},
	actionContainer:{
	
	},
	actionImage: {
		width: 30,
		height: 30
	},
	heartButton:{
	
	}
});

const Posts = () => {
	const { text, uriIMG, submitClick, loading } = useSelector((state) => state.newPost);
	const { email } = useSelector((state) => state.userInfo);
	const { loadingPosts, posts, refreshing} = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	
	const onRefresh = () => {
        dispatch(fetchPosts())
    };
	
	React.useEffect(() =>{
		if(submitClick)
			if(uriIMG){
				dispatch(setLoading(true))
				SubmitImageToFireBase(uriIMG).then(imgUrl =>{
					getAuthToken().then(userId =>{
						
						axios.post('https://64ab30660c6d844abedf3a82.mockapi.io/posts', {
							text: text, imgUrl: imgUrl, userId: userId
						}).then(res =>{
							dispatch(setSubmitClick(false))
							dispatch(setPublich(true))
							
							dispatch(setLoading(false))
							dispatch(setUriIMG(''))
							dispatch(setText(''))
							onRefresh()
						})
					})
				})
			}
	}, [submitClick])
	
	
	React.useEffect(() => {
		if(email) dispatch(fetchPosts())
	}, [email]);
	
    return (
        <View style={styles.container}>
	        {
		        loading && <LoadingNewPost photoUrl={uriIMG}/>
	        }
            {loadingPosts ? (
	            <View style={styles.loadingContainer}>
		            <ActivityIndicator size="large" color="#ff6900" />
	            </View>
            ) : (
                <FlatList
                    data={posts}
                    renderItem={(item) => <Post item={item.item}/>}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            )}
        </View>
    );
};

export default Posts;
