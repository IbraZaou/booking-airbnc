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


    const deletePlace = async (placeId) => {
        try {
            // Send a DELETE request to your server to delete the place
            await axios.delete(`/places/${placeId}`);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'appart:", error);
        }
    };

    return (
 
        <View style={tw`flex justify-center items-center h-full bg-gray-100`}>
        <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsHorizontalScrollIndicator={false}
            style={tw`flex-1 relative`}>
    
            {places.map((place, index) => (
                // Wrap each pair of Views in a new View with flex-direction row
                // Only create a new row for even index elements
                index % 2 === 0 && (
                    <View key={index} style={tw`flex-row justify-around items-center`}>
                        {/* Left element */}
                        <View style={tw`bg-white m-2 p-5 rounded-3xl shadow-lg w-64`}>
                            {places[index].photos?.[0] && (
                                <Image
                                    style={tw`h-40 w-full rounded-2xl`}
                                    source={{ uri: 'http://192.168.12.80:4000/uploads/' + places[index].photos[0] }}
                                />
                            )}
                            <Text style={tw`text-xl text-gray-800 mt-2`}>{places[index].title}</Text>
                            <Text style={tw`text-sm text-gray-600 mt-1`}>{places[index].address}</Text>
                            <Text style={tw`text-lg text-gray-800 mt-1`}>{places[index].price}€ / nuit</Text>
                            <TouchableOpacity
                                style={tw`mt-4 bg-red-500 rounded-xl py-2 items-center`}
                                onPress={() => deletePlace(places[index]._id)}
                            >
                                <Text style={tw`text-white text-lg`}>Supprimer</Text>
                            </TouchableOpacity>
                        </View>
    
                        {/* Right element (check if it exists first) */}
                        {places[index + 1] && (
                            <View style={tw`bg-white m-2 p-5 rounded-3xl shadow-lg w-64`}>
                                {places[index + 1].photos?.[0] && (
                                    <Image
                                        style={tw`h-40 w-full rounded-2xl`}
                                        source={{ uri: 'http://192.168.12.80:4000/uploads/' + places[index + 1].photos[0] }}
                                    />
                                )}
                                <Text style={tw`text-xl text-gray-800 mt-2`}>{places[index + 1].title}</Text>
                                <Text style={tw`text-sm text-gray-600 mt-1`}>{places[index + 1].address}</Text>
                                <Text style={tw`text-lg text-gray-800 mt-1`}>{places[index + 1].price}€ / nuit</Text>
                                <TouchableOpacity
                                    style={tw`mt-4 bg-red-500 rounded-xl py-2 items-center`}
                                    onPress={() => deletePlace(places[index + 1]._id)}
                                >
                                    <Text style={tw`text-white text-lg`}>Supprimer</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )
            ))}
        </ScrollView>
    </View>
    

    );
};

export default PlaceScreen;
