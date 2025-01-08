import { useState } from 'react';
import InputBox from '../components/InputBox';
import useCurrencyInfo from '../hooks/useCurrencyInfo';

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    // Use the custom hook to fetch currency info
    const { data: currencyInfo, loading, error } = useCurrencyInfo(from);

    // Extract available currency options
    const options = currencyInfo ? Object.keys(currencyInfo) : [];

    // Swap functionality
    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    // Conversion logic
    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        }
    };

    return (
        <div
            className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://www.tripsavvy.com/thmb/rPS3IcRN1T_LBmgHX2C3IIB2fCU=/2123x1412/filters:no_upscale():max_bytes(150000):strip_icc()/Foreign-currencies-58c5b0253df78c353c57c52f.jpg')`,
            }}>
            <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-6 backdrop-blur-md bg-white/50 shadow-lg">
                {loading && <p className="text-center text-gray-700">Loading currency data...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="mb-6">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <br/>
                        <div className="relative w-full flex justify-center items-center mb-6">
                            <button
                                type="button"
                                className="absolute bg-blue-600 text-white rounded-full p-2 shadow-md transform transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-500"
                                style={{ top: '-20px' }}
                                onClick={swap}
                            >
                                Swap
                            </button>
                        </div>
                        <div className="mb-6">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default App;
