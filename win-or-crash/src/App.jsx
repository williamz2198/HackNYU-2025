import { useState, useEffect } from 'react'
import './App.css'
import { simulatePrice } from './utils/simulatePrice'
import RandomEvent from './components/RandomEvent'
import MoneyDisplay from './components/MoneyDisplay'
import StockList from './components/StockList'

function App() {
  const [money,setMoney] = useState(0);
  const [stocks, setStocks] = useState([
    { ticker: "AAPL", name: "Apple Inc.", currentPrice: 150, trend: 0.0002, volatility: 0.02, history: [150] },
    { ticker: "TSLA", name: "Tesla Inc.", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
  ])
  useEffect(() => {
  const interval = setInterval(() => {
    setStocks(prev => {
      return prev.map(stock => {
        const newPrice = simulatePrice(stock.currentPrice, stock.trend, stock.volatility);
        return {
          ...stock,
          currentPrice: newPrice,
          history: [...stock.history, newPrice]
        };
      });
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

  return (
    <>
      <MoneyDisplay money = {money}></MoneyDisplay>
      {/* <StockList></StockList> */}
        <button onClick={() => setMoney((money) => money + 1)}>
          money is {money}
        </button>
      <div>
        <h1>Stock Simulator</h1>
        <StockList stocks={stocks} />
      </div>
      <RandomEvent></RandomEvent>
    </>
  )
}
export default App
