import StockChart from "./StockChart";
export default function StockList({ stocks }) {
  return (
    <div>
      {/* <div>
            <StockChart></StockChart>
      </div> */}
      {stocks.map(stock => (
        <div key={stock.ticker}>
            <StockChart stock={stock}></StockChart>
          <h2>{stock.name} ({stock.ticker})</h2>
          <p>Price: ${stock.currentPrice.toFixed(2)}</p>
          <button>Buy</button>
        </div>
      ))}
    </div>
  )
}

