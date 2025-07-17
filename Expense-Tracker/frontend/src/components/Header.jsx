import { useContext } from "react";
import ExpenseContext from "../contexts/expenseTrackerContext";
export const Header = ()=> {
  const {IncomeInput, expenseInput} = useContext(ExpenseContext);
 
    return (
    <>
      <div className='bg-amber-300  p-3'>
        <div className='flex justify-between'>
          <div className="mx-auto">
         <h2 className='text-center font-bold text-3xl ms-16  '>Money Tracker</h2>
          </div>
          
      </div>
      <div className='flex justify-between pt-3'>
        <div className='text-lg font-medium flex flex-col'>Expenses 
          <div>
           {expenseInput.toLocaleString()}
          </div>
        </div>
        <div className='text-lg font-medium flex flex-col'>Income
           <div>
            {IncomeInput.toLocaleString()}
          </div>
        </div>
        <div className='text-lg font-medium flex flex-col'>Balance
           <div>
            {(IncomeInput - expenseInput).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
    </>
    )
}