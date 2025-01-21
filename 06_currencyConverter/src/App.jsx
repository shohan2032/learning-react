import useCurrencyInfo from './hooks/useCurrencyInfo';
import { InputBox } from './components';
import { useState } from 'react';
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("bdt");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    } else {
      alert("Conversion rate for the selected currency is not available.");
    }
  };
  
  const onAmountChanged = (amount) => {
    if (amount < 0) {
      alert("Amount cannot be negative.");
      return;
    }
    setAmount(amount);
  };
  
  const reset = () => {
    setAmount(0);
    setConvertedAmount(0);
    setFrom("usd");
    setTo("bdt");
  };
  

  return (
      <div
          className="w-full h-screen flex flex-wrap bg-blue-600 justify-center items-center bg-cover bg-no-repeat"
          style={{
            //   backgroundColor: "blue",
            //   backgroundColor: `url(https://media.licdn.com/dms/image/v2/D4D12AQFq9CAlVcXr3g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1673980988900?e=2147483647&v=beta&t=uPLnmWF5kig8BVh5Pzpq-cG2HpzUaYAlApu6D6p68sI)`,
          }}
      >
          <div className="w-full">
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          convert();
                      }}
                  >
                      <div className="w-full mb-1">
                          <InputBox
                              label="From"
                              amount={amount}
                              currencyOptions={options}
                              onCurrencyChanged={(currency) => setFrom(currency)}
                              selectCurrency={from}
                              onAmountChanged={onAmountChanged}
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-700 active:rotate-180 transition-transform"
                              onClick={swap}
                          >
                              swap
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                          <InputBox
                              label="To"
                              amount={convertedAmount}
                              currencyOptions={options}
                              onCurrencyChanged={(currency) => setTo(currency)}
                              selectCurrency= {to}
                              amountDisable
                          />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                          Convert {from.toUpperCase()} to {to.toUpperCase()}
                      </button>

                      <button
                        type="button"
                        className="w-full bg-gray-500 text-white px-4 py-3 rounded-lg mt-2"
                        onClick={reset}
                        >
                        Reset
                    </button>

                  </form>
              </div>
          </div>
      </div>
  );
}
export default App
