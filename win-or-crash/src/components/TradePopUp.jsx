import { useState } from "react";

export default function TradePopup({ isOpen, mode = "buy", stock = null, money = 0, onConfirm = () => {}, onClose = () => {} }) {
  const [amount, setAmount] = useState(1);

  if (!isOpen || !stock) return null;

  function handleConfirm() {
    const price = stock.currentPrice;
    const total = price * Number(amount);

    if (mode === "buy" && total > money) {
      alert("Not enough money!");
      return;
    }

    onConfirm(Number(amount));
    onClose();
  }

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{
        background: "black",
        padding: "20px",
        borderRadius: "10px",
        width: "300px"
      }}>
        <h2>{mode === "buy" ? "Buy" : "Sell"} {stock.name}</h2>
        <p>Price: ${stock.currentPrice}</p>

        <input 
          type="number"
          placeholder="Amount of shares"
          value={amount}
          min="1"
          onChange={(e) => setAmount(Number(e.target.value) || 0)} // <-- parse number
        />

        <br /><br />

        <p>Total: ${(stock.currentPrice * amount).toFixed(2)}</p>

        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
      </div>
    </div>
  );
}
