import { useEffect, useState } from "react";

function useFetch(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => fetchData, []);

    const fetchData = () => {
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(e => setError(e))
            .finally(setLoading(false));
    }

    return { data, error, loading, fetchData }
}
export default useFetch;