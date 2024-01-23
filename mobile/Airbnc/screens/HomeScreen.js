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

    // Total prix des reservation 
    const totalPrice = bookings.reduce((accumulator, booking) => {
        return accumulator + booking.price;
    }, 0);


    return (
        <>

            <ScrollView>

                {/* Information Direct */}
                <View style={tw`p-6 bg-white flex-1 justify-center`}>
                    <Text style={tw`text-2xl font-bold p-4`}>Informations Direct</Text>
                    <View style={tw`m-auto w-64 rounded-2xl p-4 flex flex-row justify-between `}>
                        <Text style={tw`font-bold text-2xl text-center`}>
                            Réservation{'\n'}
                            <Text>{bookings.length}</Text>
                        </Text>
                        <Text style={tw`font-bold text-2xl text-center`}>
                            Réservation{'\n'}
                            <Text>{totalPrice} €</Text>
                        </Text>
                    </View>
                </View>


                {/* Menu general */}
                <View style={tw`px-6 bg-white flex-1 justify-center`}>
                    <Text style={tw`text-2xl font-bold p-4`}>Menu Général</Text>
                    <View style={tw`flex-row flex-wrap justify-between`}>
                        <TouchableOpacity onPress={() => navigation.navigate('Place')} style={tw`bg-pink-500 m-2 p-6 rounded-lg w-5/12`}>
                            <Text style={tw`text-white font-bold text-xl text-center`}>Places ({places.length})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`bg-pink-500 m-2 p-6 rounded-lg w-5/12`}>
                            <Text style={tw`text-white font-bold text-xl text-center`}>Réservation ({bookings.length})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('User')} style={tw`bg-pink-500 m-2 p-6 rounded-lg w-5/12`}>
                            <Text style={tw`text-white font-bold text-xl text-center`}>Utilisateurs ({users.length})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Message')} style={tw`bg-pink-500 m-2 p-6 rounded-lg w-5/12`}>
                            <Text style={tw`text-white font-bold text-xl text-center`}>Messages ({messages.length})</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <Text style={tw`text-2xl font-bold p-4`}>Les derniers informations</Text>
                <ScrollView
                    horizontal
                    contentContainerStyle={tw`px-5`}
                    showsHorizontalScrollIndicator={true}
                    style={tw`flex-1 relative`}
                >
                    {/* Display latest users */}
                    {users.map((user, index) => (
                        <View key={user._id} style={tw`justify-center items-center bg-red-500 m-2 p-4 rounded-2xl w-80 h-50`}>
                            <Text style={tw`text-xl text-white mb-2`}>Derniers Utilisateurs :</Text>
                            <Text style={tw`text-xl text-white mb-2`}>{user.name}</Text>
                            <Text style={tw`text-white mb-2`}>{user.email}</Text>
                            {/* ... other user info and delete button */}
                        </View>
                    ))}

                    {/* Display latest messages */}
                    {messages.slice(1).map((message, index) => (
                        <View key={message._id} style={tw`justify-center items-center bg-red-500 m-2 p-4 rounded-2xl w-80 h-50`}>
                            <Text style={tw`text-xl text-white mb-2`}>Message : {message.content}</Text>
                            {/* ... other message info */}
                        </View>
                    ))}

                    {/* Display latest reservations */}
                    {bookings.slice(1).map((booking, index) => (
                        <View key={booking._id} style={tw`justify-center items-center bg-red-500 m-2 p-4 rounded-2xl w-80 h-50`}>
                            <Text style={tw`text-xl text-white mb-2`}>Réservation : {booking.name}</Text>
                            <Text style={tw`text-white mb-2`}>{booking.date}</Text>
                            {/* ... other booking info */}
                        </View>
                    ))}

                    {/* Display latest places */}
                    {places.slice(1).map((place, index) => (
                        <View key={place._id} style={tw`justify-center items-center bg-red-500 m-2 p-4 rounded-2xl w-80 h-50`}>
                            <Text style={tw`text-xl text-white mb-2`}>Place : {place.title}</Text>
                            {/* ... other place info */}
                        </View>
                    ))}
                </ScrollView>

            </ScrollView>
        </>


    );
};

export default HomeScreen;
