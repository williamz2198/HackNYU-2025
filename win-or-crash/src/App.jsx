import { useState, useEffect } from 'react'
import './App.css'
import { simulatePrice } from './utils/simulatePrice'
import RandomEvent from './components/RandomEvent'
import MoneyDisplay from './components/MoneyDisplay'
import StockChartList from './components/StockChartList'
import StockList from './components/StockList'
import TradePopup from './components/TradePopUp'

function App() {
  const [money,setMoney] = useState(10000);
  const [portfolio, setPortfolio] = useState({}); // key: stock.name -> { quantity, avgPrice }
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
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("buy"); // "buy" or "sell"
  const [selectedStock, setSelectedStock] = useState(null);
  function openPopup(stock, mode) {
    setSelectedStock(stock);
    setPopupMode(mode);
    setPopupOpen(true);
  }

  function closePopup() {
    setPopupOpen(false);
  }
  function confirmTrade(amount) {
    const price = selectedStock.currentPrice;
    const key = selectedStock.name; // use name as unique key
    const qty = Number(amount);

    if (popupMode === "buy") {
      const totalCost = price * qty;
      if (totalCost > money) {
        alert("Not enough money!");
        return;
      }

      setMoney(prev => prev - totalCost);

      setPortfolio(prev => {
        const old = prev[key] || { quantity: 0, avgPrice: 0 };
        const newQty = old.quantity + qty;
        const newAvg = newQty === 0 ? 0 : ((old.avgPrice * old.quantity) + (price * qty)) / newQty;
        return {
          ...prev,
          [key]: { quantity: newQty, avgPrice: newAvg }
        };
      });
    }

    if (popupMode === "sell") {
      const owned = portfolio[key]?.quantity || 0;
      if (qty > owned) {
        alert("You don't own that many shares.");
        return;
      }

      const proceeds = price * qty;
      setMoney(prev => prev + proceeds);

      setPortfolio(prev => {
        const old = prev[key] || { quantity: 0, avgPrice: 0 };
        const newQty = old.quantity - qty;
        const next = { ...prev };
        if (newQty <= 0) {
          delete next[key];
        } else {
          next[key] = { quantity: newQty, avgPrice: old.avgPrice }; // avgPrice stays same on partial sell
        }
        return next;
      });
    }

    closePopup();
  }
  return (
    <>

      <TradePopup
        isOpen={popupOpen}
        mode={popupMode}
        stock={selectedStock}
        money = {money}
        onConfirm={confirmTrade}
        onClose={closePopup}
      />
      <MoneyDisplay money = {money}></MoneyDisplay>
      <StockChartList stocks = {stocks}></StockChartList>
      <div className="ContentBlock">
        <StockList 
          stocks={stocks} 
          onBuy={(stock) => openPopup(stock, "buy")}
          onSell={(stock) => openPopup(stock, "sell")}
        />
        <RandomEvent onCall={updateStocks}></RandomEvent>
      </div>
      
    </>
  )
}
export default App
