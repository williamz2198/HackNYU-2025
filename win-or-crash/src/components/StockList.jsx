import StockChart from "./StockChart";
export default function StockList(){
    const data = [0,1,23,5,6,8,2,2];
    return(
    <>
        <div>
            <StockChart data = {data}></StockChart>
        </div>
    </>)
}