import StockChart from "./StockChart"
export default function StockList(props){
    return(
    <>
        <div className="Section">
            {props.stocks.map(stock => (
                <div key={stock.category} className="ContentBlock">
                    <div className="Section">
                        <h2>{stock.name} ({stock.category})</h2>
                        <p>Price: ${stock.currentPrice.toFixed(2)}</p>
                    </div>
                    <StockChart key={stock.category} data={stock.history} name={stock.name} className="Section"></StockChart>
                </div>
            ))}
        </div>
    </>
  )
}

