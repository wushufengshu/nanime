import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import RenderHtml from 'react-native-render-html';
import useFetch from '../hook/useFetch';
import axios from 'axios';
import { BASE_URL } from '../config';
import SearchScreen from './SearchScreen';

const AnimeInfoScreen = () => {
    const { params: { id, anime } } = useRoute()
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    const { data, error, isLoading } = useFetch(`info/${id}`, {});

    return (
        <View className="bg-[#603CC3]    h-full">
            {isLoading ? (
                <View className="h-full flex justify-center items-center">
                    <ActivityIndicator size={30} color='#fff' />
                </View>
            ) : error ? (
                <View className="h-full flex justify-center items-center">
                    <Text className="text-white text-lg">Something went wrong</Text>
                </View>
            ) : (
                <ScrollView>
                    <View className="relative">
                        <Image
                            source={{
                                uri: anime.cover
                            }}
                            className="w-full h-56 bg-gray-300 p-4"
                        />
                        <TouchableOpacity className="absolute top-14 left-5 p-2 bg-[#603CC3] rounded-full" onPress={navigation.goBack}>
                            <ArrowLeftIcon size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <View className="p-2 space-y-3">
                        <Text className="text-xl text-white font-semibold">{anime.title.english}</Text>
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: '<p>' + anime.description + '</p>' }}
                            tagsStyles={{ p: { color: 'white' } }}
                        />
                        <View className=" flex flex-row justify-start space-x-2">
                            {anime.genres?.map((genres, key) => (
                                <View key={key} className="bg-slate-300 p-1 px-2 rounded-md">
                                    <Text key={key}>{genres}</Text>
                                </View>
                            ))}
                        </View>
                        <Text className="text-xl text-white font-semibold">Characters</Text>
                        <View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className=" me-2"
                            >
                                {data.characters?.map((character, key) => (
                                    <View className="mr-2" key={key}>
                                        {/* {character.role === 'MAIN' ? */}
                                        <Image
                                            key={key}
                                            source={{
                                                uri: character.image
                                            }}
                                            className="h-10 w-10 bg-gray-300 p-4 rounded-full "
                                        />
                                        {/* : "" */}
                                        {/* } */}
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <Text className="text-xl text-white font-semibold">Episodes</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className=" me-2"
                        >
                            {data.episodes?.map((episode, key) => (
                                <TouchableOpacity key={episode.id} className="mr-2"
                                    onPress={() => {
                                        navigation.navigate('AnimeWatch', {
                                            'id': episode.id,
                                        })
                                    }}
                                >
                                    <Image

                                        source={{
                                            uri: episode.image
                                        }}
                                        className="h-20 w-36 bg-gray-300 p-4  rounded-md "
                                    />
                                    <Text className=" text-white font-semibold"> {episode.number}. {episode.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                </ScrollView>
            )}
        </View>
    )
}

export default AnimeInfoScreen