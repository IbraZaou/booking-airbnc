import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';

const MessageScreen = () => {
    return (
        <View style={tw`flex justify-center items-center h-full`}>
            <Text style={tw`text-xl text-black`}>Messages</Text>
        </View>
    );
};

export default MessageScreen;
