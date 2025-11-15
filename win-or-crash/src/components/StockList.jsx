export default function StockList(props){
    return(
    <>
        <div className="Section">
            {props.stocks.map(stock => (
                <div key={stock.category}>
                    <h2>{stock.name} ({stock.category})</h2>
                    <p>Price: ${stock.currentPrice.toFixed(2)}</p>
                </div>
            ))}
        </div>
    </>
  )
}

