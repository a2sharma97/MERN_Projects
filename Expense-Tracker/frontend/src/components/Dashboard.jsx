import axios from "axios";
import { useContext, useState } from "react";
import ExpenseContext from "../contexts/expenseTrackerContext";
export const Dashboard = () => {
    const {spend, setSpend, expenseInput, setExpenseInput } = useContext(ExpenseContext)
    const [id, setId] = useState(null);
    const [editCategory, setEditCategory] = useState("");
    const [editExpense, setEditExpense] = useState("");
    const [editInputExpense, setEditInputExpense] = useState(expenseInput);
    const handleExpense = (spend) => {
        // console.log(spend)
        setId(spend._id);
        setEditCategory(spend.category);
        setEditExpense(spend.expense);
        setEditInputExpense((expenseInput - Number(spend.expense)))
    }
    // console.log(editCategory);
    // console.log(editExpense);
    const handleupdate = async() => {
        try{
            const res = await axios.put("http://localhost:3000/api/v1/expense/update",{
               id, category: editCategory, expense: Number(editExpense)
            },
        { headers: { "Content-Type": "application/json" } }
     )
        const updateRes = await axios.get("http://localhost:3000/api/v1/expense/");
        const updatedRes = updateRes.data.Expenses;
        setSpend(updatedRes);
        setExpenseInput(editInputExpense +  Number(editExpense) )
        setId(null);
        setEditExpense("");
        setEditCategory("");
        
        }catch(err) {
            if(axios.isAxiosError(err) ) {
               const msg = err.response?.data?.msg || err.message;
                     alert(`Server Error: ${msg}`);
        } else {
          alert("Some Error: " + err.message);
        }
        }
    }

    const handleDelete = async () => {
        try {
           await axios.delete('http://localhost:3000/api/v1/expense/delete',{
                data: {id}
            })
        const updateRes = await axios.get("http://localhost:3000/api/v1/expense/");
        const updatedRes = updateRes.data.Expenses;
        setSpend(updatedRes);
        setExpenseInput(editInputExpense);
        setId(null);
        setEditExpense("");
        setEditCategory("");
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
        <>
        {
          spend.map((spend) => (
            <div key={spend._id} className=" mb-1 ">
                <div onClick={() => handleExpense(spend)} className="bg-slate-100 ms-25 me-25 p-5  
                        shadow-xl, rounded-2xl
                        hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-yellow-600">
                {
                    id == spend._id ?
                    (<div className="flex justify-between">
                        <input className=" p-2 bg-slate-200 rounded-xl font-serif text-green-600 font-semibold outline-none hover:cursor-text" type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                        <input className=" p-2 bg-slate-200 rounded-xl font-serif text-green-600 font-semibold outline-none hover:cursor-text" type="text" value={editExpense} onChange={(e) => setEditExpense(e.target.value)} />
                        <div className="flex justify-between gap-1">
                        <button onClick={handleupdate} className="rounded-md bg-yellow-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs
                        hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-yellow-600">Edit</button>
                        <button onClick={handleDelete} className="rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs
                        hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-red-600">Delete</button>
                        </div>
                    </div>)                    
                : (<>
                    <div className="flex justify-between">
                        <div className="text-lg font-serif text-green-600">{spend.category}</div>
                        <div className="text-lg font-serif text-green-700">{spend.expense}</div>
                    </div>
                    </>)
                }
                </div>
           </div>
        ))}
           
        
        </>
    )
}