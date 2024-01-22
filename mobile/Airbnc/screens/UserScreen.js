import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';

const UserScreen = () => {

    const [users, setUsers] = useState([]);

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

    return (
        <View style={tw`flex justify-center items-center h-full`}>
            <Text style={tw`m-4 text-2xl`}>Utilisateurs</Text>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 5 }}
                showsHorizontalScrollIndicator={true}
                style={tw`flex-1 relative`}>

                {users.map((user, index) => (
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

            </ScrollView>
        </View>
    );
};

export default UserScreen;
