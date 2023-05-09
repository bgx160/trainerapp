import { useEffect, useState, useCallback } from "react";

function useFetch(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(() => {
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(e => setError(e))
            .finally(setLoading(false));
    }, [url])

    useEffect(() => fetchData, [url, fetchData]);


    return { data, error, loading, fetchData }
}
export default useFetch;