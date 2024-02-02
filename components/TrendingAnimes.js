import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import useFetch from '../hook/useFetch'

const TrendingAnimes = () => {
    const navigation = useNavigation();

    const { data, error, isLoading } = useFetch(`trending`, {
        page: 1,
        perPage: 20
    });
    return (
        <View className="  flex  pt-3">
            <Text className="text-xl text-white font-semibold">Trending now..</Text>
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
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {data.results?.map((data, key) => (
                        <TouchableOpacity className=" mr-3 w-40 mb-2 p-1 "
                            key={key}
                            onPress={() => {
                                navigation.navigate('AnimeInfo', {
                                    'id': data.id,
                                    'anime': data
                                })
                            }}
                        >
                            <Image source={{ uri: data.image }} className="object-contain h-52 w-full rounded-xl" />
                            {/* <Text className="text-white">{data.title.english}</Text> */}
                        </TouchableOpacity>
                    ))}


                </ScrollView>
            )}
        </View>
    )
}

export default TrendingAnimes