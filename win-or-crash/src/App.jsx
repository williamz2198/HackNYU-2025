import { useState, useEffect } from 'react'
import './App.css'
import { simulatePrice } from './utils/simulatePrice'
import { random,randomColor } from './utils/random'
import RandomEvent from './components/RandomEvent'
import MoneyDisplay from './components/MoneyDisplay'
import StockChart from './components/StockChart'
import StockList from './components/StockList'
import TradePopup from './components/TradePopUp'
import RestartButton from './components/RestartButton'

function App() {
  const [money,setMoney] = useState(10000);
  const [portfolio, setPortfolio] = useState({}); // key: stock.name -> { quantity, avgPrice }
  const [stocks, setStocks] = useState([
    {category: "HealthCare", name: "CoronaCare", currentPrice: 150, trend: 0.0002, volatility: 0.02, history: [150] },
    {category: "Energy", name: "GottaGoFast", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Materials", name: "IronDiggers", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "SocialMedia", name: "InstaCom", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Technology", name: "Newidia", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Travel", name: "Thomas&Friends", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Crypto", name: "67Coin", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Film", name: "StanLeeTheGoat", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] }
  ])
  const [playerStocks,setPlayerStocks] = useState([
    {label: "Your stocks",
      data:[10000],
      borderColor: 'rgba(94, 255, 0, 1)',
      backgroundColor: 'rgba(94, 255, 0, 1)',
    }
  ]);
  const generateData = (stock) =>{
    if(stock.history.length < 1){
      return [stock.currentPrice];
    }
    let res = [];
    for(let i = 0; i < stock.history.length; i++){
      res.push(stock.history[i]);
    }
    return res;
  }
  const updatePlayerStock = (stock) =>{
    // let temp = playerStocks;
    // if(playerStocks==null){
    //   temp = [{
    //       label: stock.name,
    //       data: generateData(stock),
    //       borderColor: randomColor(),
    //       backgroundColor: randomColor()
    //     }];
    // }
    // else{
    //   temp = [...temp,{
    //     label: stock.name,
    //     data: generateData(stock),
    //     borderColor: randomColor(),
    //     backgroundColor: randomColor()
    //   }];
    // }
    // temp[temp.length-1].data.push(stock.currentPrice);
    // setPlayerStocks(temp);
  }
  const updatePlayerStocks = () =>{
    let temp = playerStocks;
    // for(let i = 0; i < stocks.length; i++){
    //   if(portfolio.hasOwnProperty(stocks[i].name) && playerStocks==null){
    //     temp = [{
    //       label: stocks[i].name,
    //       data: generateData(stocks[i]),
    //       borderColor: randomColor(),
    //       backgroundColor: randomColor()
    //     }];
    //   }
    //   if(portfolio.hasOwnProperty(stocks[i].name)){
    //     let index = temp.findIndex(stock => stock['label'] == stocks[i].name);
    //     if(index < 0){
    //       temp = [...temp,{
    //         label: stocks[i].name,
    //         data: generateData(stocks[i]),
    //         borderColor: randomColor(),
    //         backgroundColor: randomColor()
    //       }];        
    //       temp[temp.length-1].data.push(stocks[i].currentPrice);
    //     }
    //     else{
    //       temp[index].data.push(stocks[i].currentPrice);
    //     }
    //   }
    // }
    temp[0].data.push(money);
    console.log(temp.data);
    setPlayerStocks(temp);
  }
  const updateStocks = (count) =>{
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
    updatePlayerStocks();
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
      // updatePlayerStock(selectedStock);
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
      <StockChart override = {playerStocks} name={"Your stocks"}></StockChart>
      <div className="ContentBlock">
        <StockList 
          stocks={stocks} 
          onBuy={(stock) => openPopup(stock, "buy")}
          onSell={(stock) => openPopup(stock, "sell")}
        />
        <div className="Section">
          <RandomEvent onCall={updateStocks}></RandomEvent>
          <RestartButton></RestartButton>
        </div>
      </div>

      
    </>
  )
}
export default App
