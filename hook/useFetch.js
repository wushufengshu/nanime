import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const useFetch = (endpoint, query, body) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const url = `${BASE_URL}/${endpoint}`
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const { data } = await axios.get(url, query).catch(err => console.error(err));
            setData(data);
            setIsLoading(false);
        } catch (error) {
            // throw new Error(error.message);
            setError(error);
            // console.log(error.response.data)
            alert('There was an error fetching data')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetchData = () => {
        setIsLoading(true);
        fetchData();
    }
    // return query

    return { data, isLoading, error, refetchData };
}

export default useFetch;