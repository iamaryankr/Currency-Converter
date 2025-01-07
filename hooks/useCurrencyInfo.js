import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const primaryURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
        const fallbackURL = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(primaryURL);
                if (!response.ok) {
                    throw new Error("Primary API failed. Trying fallback...");
                }
                const result = await response.json();
                setData(result[currency]);
            } catch {
                try {
                    const fallbackResponse = await fetch(fallbackURL);
                    if (!fallbackResponse.ok) {
                        throw new Error("Both APIs failed.");
                    }
                    const fallbackResult = await fallbackResponse.json();
                    setData(fallbackResult[currency]);
                } catch (err) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currency]);

    return { data, loading, error };
}

export default useCurrencyInfo;
