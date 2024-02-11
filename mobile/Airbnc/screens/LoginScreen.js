import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import HomeScreen from './HomeScreen';

const LoginScreen = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    async function handleLogin() {
        try {
            if (email === 'admin@airbnc.com' && password === 'Admin!123') {
                navigation.navigate('Home');
                onLoginSuccess();
            } else {
                console.error('email q');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error);
        }
    };

    return (
        <View style={tw`flex justify-center items-center h-full`}>
            <Text style={tw`text-4xl mb-6`}>
                Bienvenue sur Airbnc Management App
            </Text>
            <Text style={tw`text-xl text-black mb-4`}>Connexion</Text>

            <TextInput
                style={tw`border border-gray-300 rounded p-2 w-80 mb-4`}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={tw`border border-gray-300 rounded p-2 w-80 mb-4`}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={tw`bg-[#F5385D] rounded-2xl w-80 p-3`}
                onPress={handleLogin}
            >
                <Text style={tw`bg-[#F5385D]
p-2 w-full text-center text-white rounded-2xl;`}>Connexion</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
