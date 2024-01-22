import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [places, setPlaces] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);


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

    // Get all messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('/messages');
                setMessages(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des messages:", error);
            }
        };

        fetchMessages();
    }, []);



    // Get all bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/all-bookings');
                setBookings(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des places:", error);
            }
        };

        fetchBookings();
    }, []);



    // Get all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/all-users');
                setUsers(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des places:", error);
            }
        };

        fetchUsers();
    }, []);


    const deleteUser = async (userId) => {
        try {
            // Send a DELETE request to your server to delete the user
            await axios.delete(`/delete-user/${userId}`);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
        }
    };

    const navigation = useNavigation();

    const showPlaces = () => {
        navigation.navigate('Place', { places });
    };

    const showUsers = () => {
        navigation.navigate('User', { users });
    };

    const showMessages = () => {
        navigation.navigate('Message', { messages });
    };

    return (
        <>

            <ScrollView>

                {/* Voir tout les appartements */}
                <Text style={tw`m-4 text-2xl`}>Les 3 derniers Appartements ajoutés</Text>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: 5 }}
                    showsHorizontalScrollIndicator={true}
                    style={tw`flex-1 relative`}>


                    {places.slice(0, 3).map((place, index) => (
                        <View key={index} style={tw`justify-center items-center bg-red-500 m-2 p-4 rounded-2xl w-80 h-50`}>
                            {place.photos?.[0] && (
                                <Image
                                    style={tw`h-30 w-full rounded-xl`}
                                    source={{ uri: 'http://192.168.1.32:4000/uploads/' + place.photos[0] }} // Replace with your server's IP
                                />
                            )}

                            <Text style={tw`text-xl text-white`}>{place.title}</Text>
                            <Text style={tw`text-center text-white`}>{place.address}</Text>
                            <Text style={tw`text-center text-white`}>{place.price}€ / par nuit</Text>
                        </View>
                    ))}
                    <TouchableOpacity onPress={showPlaces} style={tw`bg-blue-500 p-2 m-4 rounded-xl`}>
                        <Text style={tw`text-white`}>Show More</Text>
                    </TouchableOpacity>
                </ScrollView>


                {/* Voir tout les utilisateurs */}

                <Text style={tw`m-4 text-2xl`}>Les 3 derniers Utilisateurs inscrit</Text>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: 5 }}
                    showsHorizontalScrollIndicator={true}
                    style={tw`flex-1 relative`}>

                    {users.slice(0, 3).map((user, index) => (
                        <View key={index} style={tw`justify-center items-center bg-red-500 m-2 p-4 rounded-2xl w-80 h-50`}>
                            <Text style={tw`text-xl text-white mb-2`}>Utilisateur : {user.name}</Text>
                            <Text style={tw`text-white mb-2`}>{user.email}</Text>
                            <TouchableOpacity
                                style={tw`bg-blue-500 rounded-2xl w-40 p-3 my-4`}
                                onPress={() => deleteUser(user._id)}
                            >
                                <Text style={tw`bg-blue-500 p-2 w-full text-center text-white rounded-2xl;`}>Supprimer l'utilisateur</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity onPress={showUsers} style={tw`bg-blue-500 p-2 m-4 rounded-xl`}>
                        <Text style={tw`text-white`}>Show More</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Voir tout les messages */}

                <Text style={tw`m-4 text-2xl`}>Les 3 derniers Messages</Text>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: 5 }}
                    showsHorizontalScrollIndicator={true}
                    style={tw`flex-1 relative`}>

                    {messages.slice(0, 3).map((message, index) => (
                        <View key={index} style={tw`justify-center items-center bg-red-500 m-2 p-4 rounded-2xl w-80 h-50`}>
                            <Text style={tw`text-xl text-white mb-4`}>De {message.name}</Text>
                            <Text style={tw`text-white mb-2`}>{message.email} :</Text>
                            <Text style={tw`text-white mb-2`}>"{message.message}"</Text>
                            <Text style={tw`text-center text-white`}>{new Date(message.createdAt).toLocaleString()}</Text>
                        </View>
                    ))}
                    <TouchableOpacity onPress={showMessages} style={tw`bg-blue-500 p-2 m-4 rounded-xl`}>
                        <Text style={tw`text-white`}>Show More</Text>
                    </TouchableOpacity>
                </ScrollView>

            </ScrollView>
        </>


    );
};

export default HomeScreen;
