import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';

let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        fetch('https://mysafeinfo.com/api/data?list=pizzahutsfl&format=json&case=default')
            .then((response) => response.json())
            .then((data) => {
                if (originalData.length < 1) {
                    setMyData(data);
                    originalData = data;
                }
            });
    }, []);

    const filterData = (text) => {
        if (text) {
            const filteredData = originalData.filter(
                (item) =>
                    item.StreetAddress.includes(text) ||
                    item.City.includes(text) ||
                    item.PhoneNumber.includes(text)
            );
            setMyData(filteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View>
                    <Text style={styles.text}>Address: {item.StreetAddress}</Text>
                    <Text style={styles.text}>City: {item.City}</Text>
                    <Text style={styles.text}>Phone: {item.PhoneNumber}</Text>
                </View>
                <FontAwesome5 name="pizza-slice" size={30} color="#D81B60" />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.title}>Pizza Hut Locations (Florida)</Text>
            <TextInput
                style={styles.input}
                onChangeText={filterData}
                placeholder="Search by address, city, or phone"
                placeholderTextColor="#888"
            />
            <FlatList
                data={myData}
                renderItem={renderItem}
                keyExtractor={(item) => item.ID.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCE4EC',
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#da588d',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Arial',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D81B60',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        color: '#000',
    },
    card: {
        borderWidth: 1,
        borderColor: '#F48FB1',
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: '#000',
        marginVertical: 3,
        fontFamily: 'Arial',
    },
});

export default App;
