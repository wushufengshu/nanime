import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingAnimes from '../components/TrendingAnimes'
import PopularAnimes from '../components/PopularAnimes';
import SearchScreen from './SearchScreen';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <SafeAreaView className="bg-[#603CC3] px-4  h-full">
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className="flex flex-row justify-start items-center align-middle px-2 space-x-2 mt-2">
                    <TextInput
                        className="bg-gray-200 rounded-md py-2 flex-1 px-3"
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder="What are you looking for?"
                        placeholderTextColor="#999999"
                    />
                    <TouchableOpacity className=" p-2 items-stretch"
                        onPress={() => {
                            navigation.navigate('SearchScreen', {
                                searchTerm
                            })
                        }}
                    >
                        <MagnifyingGlassIcon size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <TrendingAnimes />
                <PopularAnimes />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen