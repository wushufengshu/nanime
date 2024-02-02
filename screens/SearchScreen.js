import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import useFetch from '../hook/useFetch'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchScreen = () => {
    const navigation = useNavigation();
    const { params: { searchTerm } } = useRoute()
    const { data, error, isLoading } = useFetch(`${searchTerm}`, {});
    console.log(searchTerm);
    return (
        <SafeAreaView className="bg-[#603CC3] px-4  h-full">
            <Text className="text-white text-lg my-4">Searched keyword : <Text>{searchTerm}</Text></Text>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 10,
                    marginBottom: 10
                }}
            >
                {data.results?.map((data, key) => (
                    <TouchableOpacity key={key} className="rounded-xl mb-4"
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
        </SafeAreaView>
    )
}

export default SearchScreen