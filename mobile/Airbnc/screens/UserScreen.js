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
            await axios.delete(`/users/${userId}`);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
        }
    };

    return (
        <View style={tw`flex justify-center items-center h-full bg-gray-100`}>
    <Text style={tw`m-4 text-3xl text-gray-800 font-bold`}>Utilisateurs</Text>
    <ScrollView
        contentContainerStyle={{ paddingHorizontal: 5 }}
        showsHorizontalScrollIndicator={false}
        style={tw`flex-1 relative`}>

        {users.map((user, index) => (
            // Only create a new row for even index elements
            index % 2 === 0 && (
                <View key={index} style={tw`flex-row justify-around items-center w-full px-2`}>
                    {/* Left element */}
                    <View style={tw`bg-white m-2 p-4 rounded-3xl shadow-md w-1/2`}>
                        <Text style={tw`text-xl text-gray-900 mb-1 font-semibold`}>Utilisateur : {users[index].name}</Text>
                        <Text style={tw`text-md text-gray-700 mb-4`}>{users[index].email}</Text>
                        <TouchableOpacity
                            style={tw`bg-red-500 rounded-2xl py-2 items-center`}
                            onPress={() => deleteUser(users[index]._id)}>
                            <Text style={tw`text-white text-lg`}>Supprimer l'utilisateur</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Right element (check if it exists first) */}
                    {users[index + 1] && (
                        <View style={tw`bg-white m-2 p-4 rounded-3xl shadow-md w-1/2`}>
                            <Text style={tw`text-xl text-gray-900 mb-1 font-semibold`}>Utilisateur : {users[index + 1].name}</Text>
                            <Text style={tw`text-md text-gray-700 mb-4`}>{users[index + 1].email}</Text>
                            <TouchableOpacity
                                style={tw`bg-red-500 rounded-2xl py-2 items-center`}
                                onPress={() => deleteUser(users[index + 1]._id)}>
                                <Text style={tw`text-white text-lg`}>Supprimer l'utilisateur</Text>
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

export default UserScreen;
