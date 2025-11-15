import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MoneyDisplay from './MoneyDisplay'
import { simulatePrice } from './utils/simulatePrice'
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setMoney((money) => money + 1)}>
          money is {money}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <MoneyDisplay money = {money}></MoneyDisplay>
      <div>
        <h1>Stock Simulator</h1>
        <StockList stocks={stocks} />
      </div>
    </>
  )
}
export default App
