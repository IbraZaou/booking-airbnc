import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.12.80:4000';
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <AppNavigation />
  );
}
