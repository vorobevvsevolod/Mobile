import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import { app } from '../firabase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

const UploadDatabaseDate = () => {
    const [text, setText] = useState('');

    const handleTextChange = (value) => {
        setText(value);
    };

    const handleTextSubmit = () => {
        const database = getDatabase(app);
        const databaseRef = ref(database, 'textEntries');

        push(databaseRef, text)
            .then(() => {
                console.log('Текст успешно отправлен в базу данных');
                setText('');
            })
            .catch((error) => {
                console.log('Ошибка отправки текста в базу данных:', error);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={handleTextChange}
                placeholder="Введите текст"
            />
            <Button title="Отправить" onPress={handleTextSubmit} />
        </View>
    );
};

export default UploadDatabaseDate;
