import { useContext } from "react"
import ExpenseContext from "../contexts/expenseTrackerContext"
export const Dashboard = () => {
    const {spend} = useContext(ExpenseContext)
    return(
        <>
        {spend.map((spend) => (
            <div className=" mb-1 ">
                <div className="bg-slate-100 ms-25 me-25 p-5 flex justify-between 
                shadow-xl, rounded-2xl
                hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-yellow-600">
                    <div className="text-lg font-serif text-green-600">{spend.category}</div>
                    <div className="text-lg font-serif text-green-700">{spend.expense}</div>
                </div>
           </div>
        ))}
           
        
        </>
    )
}