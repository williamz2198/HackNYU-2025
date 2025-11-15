import { useState, useEffect } from 'react'
import './App.css'
import { simulatePrice } from './utils/simulatePrice'
import RandomEvent from './components/RandomEvent'
import MoneyDisplay from './components/MoneyDisplay'
import StockChartList from './components/StockChartList'
import StockList from './components/StockList'

function App() {
  const [money,setMoney] = useState(10000);
  const [stocks, setStocks] = useState([
    {ticker: "AAPL", name: "Apple Inc.", currentPrice: 150, trend: 0.0002, volatility: 0.02, history: [150] },
    {ticker: "TSLA", name: "Tesla Inc.", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
  ])
  const updateStocks = () =>{
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
  }

  return (
    <>
      
      <MoneyDisplay money = {money}></MoneyDisplay>
      <StockChartList stocks = {stocks}></StockChartList>
      <div className="ContentBlock">
        <StockList stocks = {stocks}></StockList>
        <RandomEvent onCall={updateStocks}></RandomEvent>
      </div>
      <button onClick={() => setMoney((money) => money + 1)}>
        money is {money}
      </button>  
    </>
  )
}
export default App
