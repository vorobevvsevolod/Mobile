import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, Image } from 'react-native';
import axios from 'axios';
import UploadPhotoButton from "./UploadImages";

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
        aspectRatio: 16 / 9,
        borderRadius: 5,
    },
    createdAt:{
        fontSize: 12
    }
});

const Posts = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);

        try {
            const response = await axios.get('https://64ab30660c6d844abedf3a82.mockapi.io/posts');

            const sortedData = response.data.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA; // Сортировка по убыванию
            });

            const updatedData = await Promise.all(sortedData.map(async (post) => {
                const userId = post.userId;
                const userResponse = await axios.get(`https://64ab30660c6d844abedf3a82.mockapi.io/users/${userId}`);
                const { username, avatar } = userResponse.data;

                return {
                    ...post,
                    username,
                    avatar
                };
            }));

            setNews(updatedData);
            setLoading(false);
            setRefreshing(false);
        } catch (error) {
            console.log('Ошибка при получении новостей:', error);
            setLoading(false);
            setRefreshing(false);
        }
    };



    const onRefresh = () => {
        setRefreshing(true);
        fetchNews();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const currentDate = new Date();
        const diffInMs = Math.abs(currentDate - date);
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        if (diffInDays === 0) {
            return `${diffInHours} часов назад`;
        } else if (diffInDays === 1) {
            return 'Вчера';
        } else {
            return `${diffInDays} дней назад`;
        }
    };

    const renderNewsItem = ({ item }) => (
        <View style={styles.itemContainer}>

            <View style={styles.userInfoContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View>
                    <Text >Пользователь <Text style={styles.userName}>{item.username}</Text> </Text>
                    <Text style={styles.userText}>опубликовал событие</Text>
                    <Text style={styles.createdAt}>{formatDate(item.createdAt)}</Text>

                </View>
            </View>
            <Text style={styles.itemText}>{item.text}</Text>
            {item.avatar && (
                <Image source={{ uri: item.avatar }} style={styles.itemImage} resizeMode="cover" />
            )}
        </View>
    );

    const renderLoading = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4287f5" />
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                renderLoading()
            ) : (
                <FlatList
                    data={news}
                    renderItem={renderNewsItem}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            )}
        </View>
    );
};

export default Posts;
