import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyinfo'

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)


  //USING OUR COUSTEM HOOK FOR THE SETTING UP THE INFO OF THE CUURENCY
  const currencyInfo = useCurrencyInfo(from)

  //HOLDING THE OBJECT(WE ARE GETTING THE API INTHE OBJECT FORM AND STORING ITS KEY IN THE OPTIONS)
  const options = Object.keys(currencyInfo)


  //SWAPING VALUES OF THE BOTH FROM OR TO VALUES IN THE CURRENCY INPUTS
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }


  //FINAL STEP TO MULTPLY THE VALUE TO THE CURRENCY THAT YOU WANT TO CHNAGE
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }


  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('./pexels-pixabay-259209.jpg')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                oncurrencyChange={(currency)=> setAmount(amount)}
                selectCurrency={from}
                onAmoutChnage={(amount)=>setAmount(amount)}

              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
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
                oncurrencyChange={(currency)=> setTo(currency)}
                selectCurrency={from}
                amountDisable 
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App
