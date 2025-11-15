import { useState, useEffect } from 'react'
import './App.css'
import { simulatePrice } from './utils/simulatePrice'
import RandomEvent from './components/RandomEvent'
import MoneyDisplay from './components/MoneyDisplay'
import StockChartList from './components/StockChartList'
import StockList from './components/StockList'
import RestartButton from './components/RestartButton'

function App() {
  const [money,setMoney] = useState(0);
  const [stocks, setStocks] = useState([
    {category: "HealthCare", name: "CoronaCare", currentPrice: 150, trend: 0.0002, volatility: 0.02, history: [150] },
    {category: "Energy", name: "GottaGoFast", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Materials", name: "IronDiggers", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Social Media", name: "InstaCom", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Technology", name: "Newidia", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Travel", name: "Thomas&Friends", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Crypto", name: "67Coin", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Film", name: "StanLeeTheGoat", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] }
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
        <div className="Section">
          <RandomEvent onCall={updateStocks}></RandomEvent>
          <RestartButton></RestartButton>
        </div>
      </div>
      <button onClick={() => setMoney((money) => money + 1)}>
        money is {money}
      </button> 
    </>
  )
}
export default App
