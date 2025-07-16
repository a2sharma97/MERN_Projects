import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { InputBox } from './components/InputBox';
import ExpenseContext from './contexts/expenseTrackerContext';

function App() {

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [category, setCategory] = useState("");
  const [IncomeInput, setInputIncome] = useState(0);
  const [expenseInput, setExpenseInput] = useState(0);
  const [spend, setSpend] = useState([]);

  useEffect(()=> {
    const fetchData = async() => {
      try{
        const response = await axios.get("http://localhost:3000/api/v1/expense/")
        setSpend(response.data.Expenses);

        setIncome("");
        setExpense("");
        setCategory("")
      } catch(err) {
          if(axios.isAxiosError(err) ) {
          const msg = err.response?.data?.msg || err.message;
                     alert(`Server Error: ${msg}`);
        } else {
          alert("Some Error: " + err.message);
        }
      }
    }
    fetchData();
  },[]);

  return (
    <ExpenseContext.Provider value={{income, setIncome, expense, setExpense, category, setCategory, spend, setSpend, IncomeInput, setInputIncome, expenseInput, setExpenseInput}}>
      <Header />
      <InputBox/>
      <Dashboard />
    </ExpenseContext.Provider>
  )
}





export default App
