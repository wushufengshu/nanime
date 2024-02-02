import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TrendingAnimes from './TrendingAnimes'
import AnimeInfoScreen from '../screens/AnimeInfoScreen'
import { useNavigation } from '@react-navigation/native'
import useFetch from '../hook/useFetch'

const PopularAnimes = () => {
    const navigation = useNavigation();
    // useEffect(() => {
    //     const searchPopular = async () => {
    //         const url = "https://consumet-livid-five.vercel.app/meta/anilist/popular";
    //         console.log('Searching popular..')
    //         try {
    //             const { data } = await axios.get(url, {
    //                 params: {

    //                 }
    //             }).catch(err => console.error(err));
    //             setPopular(data.results)
    //         } catch (err) {
    //             throw new Error(err.message);
    //         }
    //     }
    //     searchPopular()
    // }, [])
    const { data, error, isLoading } = useFetch(`popular`, {
        page: 1,
        perPage: 20
    });

    return (
        <>
            <Text className="text-xl text-white font-semibold">Popular </Text>
            {isLoading ? (
                <View className="  flex justify-center items-center">
                    <ActivityIndicator size={30} color='#fff' />
                </View>
            ) : error ? (
                <View className="h-full flex justify-center items-center">
                    <Text className="text-white text-lg">Something went wrong</Text>
                </View>
            ) : (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 10,
                        marginBottom: 10
                    }}
                >
                    {data.results?.map((data, key) => (
                        <TouchableOpacity key={data.id} className="rounded-xl mb-4"
                            onPress={() => {
                                navigation.navigate('AnimeInfo', {
                                    'id': data.id,
                                    'anime': data
                                })
                            }}>
                            <Image source={{ uri: data.cover }} className="w-full h-44 object-cover rounded-xl " />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </>
    )
}

export default PopularAnimes