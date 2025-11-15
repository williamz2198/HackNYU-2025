import StockChart from "./StockChart";
export default function StockChartList(props){
    const data = [0,1,23,5,6,8,2,2];
    return(
        <>
            <StockChart data = {data} name={"Your stocks"}></StockChart>
            {props.stocks.map(stock => (
                <StockChart key={stock.category} data={stock.history} name={stock.name}>
                </StockChart>
            ))}
        </>
    )
}