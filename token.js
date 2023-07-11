import AsyncStorage from '@react-native-async-storage/async-storage';

// Сохранение токена авторизации
const saveAuthToken = async (token) => {
    try {
        await AsyncStorage.setItem('authToken', token);
        console.log('Токен авторизации сохранен.');
    } catch (error) {
        console.log('Ошибка при сохранении токена авторизации:', error);
    }
};

// Извлечение токена авторизации
const getAuthToken = async () => {
    try {
        return await AsyncStorage.getItem('authToken');

    } catch (error) {
        console.log('Ошибка при извлечении токена авторизации:', error);
        return null;
    }
};

// Удаление токена авторизации
const removeAuthToken = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
        console.log('Токен авторизации удален.');
    } catch (error) {
        console.log('Ошибка при удалении токена авторизации:', error);
    }
};

export {
    saveAuthToken,
    getAuthToken,
    removeAuthToken
}
