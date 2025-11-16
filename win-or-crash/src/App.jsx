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
    {category: "Food", name: "67Productions", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] },
    {category: "Film", name: "StanLeeTheGoat", currentPrice: 700, trend: 0.0003, volatility: 0.03, history: [700] }
  ])
  const [playerStocks,setPlayerStocks] = useState([
    {label: "Your stocks",
      data:[0],
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
  const updatePlayerStocks = (currStocks) =>{
    let temp = playerStocks;
    let currMoney = 0;
    for(const key in portfolio){
      currMoney+=currStocks[currStocks.findIndex(stock => stock['name'] == key)].currentPrice * portfolio[key].quantity;
    }
    temp[0].data.push(currMoney);
    setPlayerStocks(temp);
  }
  const updateStocks = (stockType,effect) =>{
    if (gameOver) return; // stop updating after game end
    let newStocks = stocks.map(stock => {
          let newPrice = simulatePrice(stock.currentPrice, stock.trend, stock.volatility);
          if(stockType.includes(stock.category)){
            let multiplier = effect == "negative" ? random(0.5 , 0.8): effect == "positive" ? random(1.2, 1.5): 1;
            newPrice = stock.currentPrice*multiplier;
          }
            return {
            ...stock,
            currentPrice: newPrice,
            history: [...stock.history, newPrice]
          };
      });
    setStocks(newStocks);
    updatePlayerStocks(newStocks);
    // increment day counter whenever stocks are updated (covers clicking RandomEvent)
    setDayCount(prev => {
      const next = prev + 1;
      if (next >= 24) {
        setGameOver(true);
      }
      return next;
    });
  }
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("buy");
  const [selectedStock, setSelectedStock] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [dayCount, setDayCount] = useState(0); // in-game days passed

  function openPopup(stock, mode) {
    setSelectedStock(stock);
    setPopupMode(mode);
    setPopupOpen(true);
  }

  function closePopup() {
    setPopupOpen(false);
  }

  function calculateTotalScore() {
    let stockValue = 0;
    for (const key in portfolio) {
      const stock = stocks.find(s => s.name === key);
      if (stock) {
        stockValue += stock.currentPrice * portfolio[key].quantity;
      }
    }
    return money + stockValue;
  }

  function endGame() {
    setGameOver(true);
  }

  function restartGame() {
    setMoney(10000);
    setPortfolio({});
    setStocks(stocks.map(s => ({ ...s, history: [s.currentPrice] })));
    setGameOver(false);
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
     {gameOver && (
       <div style={{
         position: "fixed",
         top: 0, left: 0, right: 0, bottom: 0,
         background: "rgba(0,0,0,0.7)",
         display: "flex", justifychange: "center", alignItems: "center",
         zIndex: 1000
       }}>
         <div style={{
           background: "black",
           padding: "40px",
           borderRadius: "15px",
           textAlign: "center",
           border: "2px solid white",
           position: "fixed",
           left: "35%",
           right: "35%"
         }}>
           <h1>Game Over!</h1>
           <p>Cash: ${money.toFixed(2)}</p>
           <p>Stock Value: ${(calculateTotalScore() - money).toFixed(2)}</p>
           <h2>Total Score: ${calculateTotalScore().toFixed(2)}</h2>
           <button onClick={restartGame} style={{ marginTop: "20px", padding: "10px 20px" }}>Play Again</button>
         </div>
       </div>
     )}

      <TradePopup
        isOpen={popupOpen}
        mode={popupMode}
        stock={selectedStock}
        money={money}
        onConfirm={confirmTrade}
        onClose={closePopup}
      />
      <MoneyDisplay money={money}></MoneyDisplay>
      <StockChart override={playerStocks} name={"Your stocks"}></StockChart>
      <div style={{ padding: 8, color: "white", fontSize: "2em"}}>Day: {dayCount} / 24</div>
      <div className="ContentBlock">
        <StockList 
          stocks={stocks} 
          portfolio={portfolio}
          onBuy={(stock) => openPopup(stock, "buy")}
          onSell={(stock) => openPopup(stock, "sell")}
        />
        <div className="Section">
          <RandomEvent onCall={updateStocks}></RandomEvent>
          <RestartButton></RestartButton>
          <button onClick={endGame} style={{ marginTop: "10px" }}>End Game</button>
        </div>
      </div>

      
    </>
  )
}
export default App
