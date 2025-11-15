import StockChart from "./StockChart";
export default function StockList(){
    const data = [0,1,23,5,6,8,2,2];
    return(
    <>
        <div>
        <StockChart data = {data}></StockChart>
        {stocks.map(stock => (
            <div key={stock.ticker}>
                <h2>{stock.name} ({stock.ticker})</h2>
                <p>Price: ${stock.currentPrice.toFixed(2)}</p>
            </div>
        ))}
    </div>
    </>
  )
}

