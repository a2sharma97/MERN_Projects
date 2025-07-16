import axios from "axios";
import { useContext } from "react";
import ExpenseContext from "../contexts/expenseTrackerContext";
export const InputBox = () => {
    let i =0, e = 0;
    const {setIncome, setExpense, setCategory, setSpend, category, expense, income,setInputIncome, setExpenseInput} = useContext(ExpenseContext)

    const handleExpense = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/expense/add",{
                category: category, expense: expense
            },
         { headers: { "Content-Type": "application/json" } })
            const updateRes = await axios.get("http://localhost:3000/api/v1/expense/");
            const updatedRes = updateRes.data.Expenses;
            setSpend(updatedRes);
            setInputIncome(prev => prev + (income > 0 ? income : 0))
            setExpenseInput(prev => prev + (expense > 0 ? expense : 0))
            setIncome("");
            setExpense("");
            setCategory("");
        } catch(err) {
            if(axios.isAxiosError(err) ) {
               const msg = err.response?.data?.msg || err.message;
                     alert(`Server Error: ${msg}`);
        } else {
          alert("Some Error: " + err.message);
        }
        }
    }
    return(
        <div className="flex justify-center gap-1 mt-1 mb-8">
            <div className=" flex justify-between mt-1.5 mx-auto text-center gap-1 ">
                <input onChange={(e) => {setIncome(Number(e.target.value))}} className="p-2 bg-slate-200 rounded-xl font-medium outline-none hover:cursor-text  " value={income > 0 ? income : ""} type="text" placeholder="Enter income" />
                <input onChange={(e) => {setExpense(Number(e.target.value))}} className="p-2 bg-slate-200 rounded-xl font-medium outline-none hover:cursor-text " value={expense > 0 ? expense : ""} type="text" placeholder="Enter expense" />
                <input onChange={(e) => {setCategory(e.target.value)}} className="p-2 bg-slate-200 rounded-xl font-medium outline-none hover:cursor-text " value={category} type="text" placeholder="Enter Category" />
                
                <button onClick={handleExpense} className="rounded-md bg-yellow-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs
                hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-yellow-600">submit</button>
            </div>
        </div>
    )
}