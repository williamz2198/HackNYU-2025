export default function StockList({ stocks }) {
  return (
    <div>
      {stocks.map(stock => (
        <div key={stock.ticker}>
          <h2>{stock.name} ({stock.ticker})</h2>
          <p>Price: ${stock.currentPrice.toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
}

