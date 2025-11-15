import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MoneyDisplay from './components/MoneyDisplay'
import StockList from './components/StockList'

function App() {
  const [money,setMoney] = useState(0);
  return (
    <>
      <MoneyDisplay money = {money}></MoneyDisplay>
      <StockList></StockList>
        <button onClick={() => setMoney((money) => money + 1)}>
          money is {money}
        </button>
    </>
  )
}

export default App
