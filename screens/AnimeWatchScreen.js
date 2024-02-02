import * as ScreenOrientation from 'expo-screen-orientation'
import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { useState, useRef } from 'react'
import useFetch from '../hook/useFetch'
import { Video, ResizeMode } from 'expo-av';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { BASE_URL } from '../config'
import axios from 'axios'
import { setStatusBarHidden } from 'expo-status-bar'

const AnimeWatchScreen = () => {
    const insets = useSafeAreaInsets();
    const { params: { id } } = useRoute()
    const video = useRef(null);
    const [status, setStatus] = useState({});

    const [uri, setUri] = useState();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    // setUri(data.sources.filter(item => item.quality === 'default').map(item => item.url));

    const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);


    useEffect(() => {
        const url = `${BASE_URL}/watch/${id}`;
        const fetchData = async () => {
            setIsLoading(true);

            try {
                // const response = await axios.request(options); 
                const { res } = await axios.get(url, {})
                    .then(resp => setUri(resp.data.sources.filter(item => item.quality === 'default').map(item => item.url)[0]));
                setData(res);
                console.log(res)
                setIsLoading(false);
            } catch (error) {
                // throw new Error(error.message);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, []);


    return (
        <SafeAreaView className="flex flex-1  " style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
        }}>
            {uri &&
                <>
                    <Video
                        ref={video}
                        className="align-middle bg-black    h-52"
                        source={{
                            uri: uri,
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                        onFullscreenUpdate={async () => {
                            await ScreenOrientation.lockAsync(
                                orientationIsLandscape ? ScreenOrientation.OrientationLock.LANDSCAPE :
                                    ScreenOrientation.OrientationLock.PORTRAIT,
                            );
                            setOrientationIsLandscape((prev) => (prev === false ? true : false));
                        }}
                    />

                </>
            }
        </SafeAreaView>
    )
}

export default AnimeWatchScreen