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
          <div className='flex justify-between p-1 gap-2 ms-2.5'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
           
        </div>
      </div>
      <div className='flex justify-between pt-3'>
        <div className='text-lg font-medium flex flex-col'>Expenses 
          <div>
           {expenseInput}
          </div>
        </div>
        <div className='text-lg font-medium flex flex-col'>Income
           <div>
            {IncomeInput}
          </div>
        </div>
        <div className='text-lg font-medium flex flex-col'>Balance
           <div>
            {IncomeInput - expenseInput}
          </div>
        </div>
      </div>
    </div>
    </>
    )
}