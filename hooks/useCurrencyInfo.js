import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch currency data");
                }
                const result = await response.json();
                setData(result[currency]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currency]);

    return { data, loading, error };
}

export default useCurrencyInfo;
