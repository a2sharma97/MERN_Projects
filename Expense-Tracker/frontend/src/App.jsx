import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';

function App() {
  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)
  const [records, setRecords] = useState([]);
  

  return (
    <>
    {/* <Header expense = {expense} income = {income} /> */}
    {/* <AddMoney income = {income} expense={expense} setIncome={setIncome} setExpense={setExpense} setRecords={setRecords} /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element = {<Signin/>}/>
        <Route path='/signup' element = {<Signup/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}




export default App
