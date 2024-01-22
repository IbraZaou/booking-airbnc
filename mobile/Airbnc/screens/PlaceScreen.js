import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';

const PlaceScreen = () => {

    const [places, setPlaces] = useState([]);
    // Get all places
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


    const deletePlace = async (userId) => {
        try {
            // Send a DELETE request to your server to delete the user
            await axios.delete(`/delete-place/${userId}`);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'appart:", error);
        }
    };

    return (
        <View style={tw`flex justify-center items-center h-full`}>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 5 }}
                showsHorizontalScrollIndicator={true}
                style={tw`flex-1 relative`}>


                {places.map((place, index) => (
                    <View key={index} style={tw`justify-center items-center bg-red-500 m-2 p-4 rounded-2xl w-80 h-100`}>
                        {place.photos?.[0] && (
                            <Image
                                style={tw`h-50 w-full rounded-xl`}
                                source={{ uri: 'http://192.168.1.32:4000/uploads/' + place.photos[0] }} // Replace with your server's IP
                            />
                        )}

                        <Text style={tw`text-xl text-white`}>{place.title}</Text>
                        <Text style={tw`text-center text-white`}>{place.address}</Text>
                        <Text style={tw`text-center text-white`}>{place.price}€ / par nuit</Text>

                        <TouchableOpacity
                            style={tw`bg-blue-500 rounded-2xl w-40 p-3 my-4`}
                            onPress={() => deletePlace(place._id)}
                        >
                            <Text style={tw`bg-blue-500 p-2 w-full text-center text-white rounded-2xl;`}>Supprimer l'appartement</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default PlaceScreen;
