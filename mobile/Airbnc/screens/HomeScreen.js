import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';

const HomeScreen = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('/places');
                setPlaces(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des places:", error);
            }
        };

        fetchPlaces();
    }, []);

    return (
        <ScrollView style={tw`flex-1 relative`}>
            <View style={tw`flex justify-center items-center h-full`}>
                {places.map((place, index) => (
                    <View key={index} style={tw`bg-red-500 m-2 p-4 rounded-2xl`}>

                        {place.photos?.[0] && (
                            <Image
                                style={tw`absolute h-full w-full`}
                                source={{ uri: 'http://192.168.1.32:4000/uploads/' + place.photos[0] }} // Replace with your server's IP
                            />
                        )}

                        <Text style={tw`text-xl text-white`}>{place.title}</Text>
                        <Text style={tw`text-center text-white`}>{place.address}</Text>
                        <Text style={tw`text-center text-white`}>{place.price}€</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
