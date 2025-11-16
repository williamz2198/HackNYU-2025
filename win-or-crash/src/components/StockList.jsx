import StockChart from "./StockChart"
export default function StockList({ stocks = [], portfolio = {}, onBuy = () => {}, onSell = () => {} }) {
    return(
    <>
        <div className="Section">
            {stocks.map(stock => (
                <div key={stock.category} className="ContentBlock">
                    <div className="Section">
                        <h2>{stock.name} ({stock.category})</h2>
                        <p>Price: ${stock.currentPrice.toFixed(2)}</p>
                        <p>Shares Owned: {portfolio[stock.name]?.quantity || 0}</p>
                        <button onClick={() => onBuy(stock)}>Buy</button>
                        <button onClick={() => onSell(stock)} style={{ marginLeft: "10px" }}>Sell</button>
                    </div>
                    <StockChart key={stock.category} data={stock.history} name={stock.name} className="Section"></StockChart>
                </div>
            ))}
        </div>
    </>
  )
}

