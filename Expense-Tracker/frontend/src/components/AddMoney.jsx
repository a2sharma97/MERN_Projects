export const AddMoney = ({income, expense, setIncome, setExpense, setRecords}) => {

  const handleExpense = () => {

  }
  console.log(income)

  return(
    <>
    <div className='bg-amber-300 p-1'>
      <div className='text-md cursor-pointer'>cancel</div>
      <div className='text-center text-2xl font-bold'>Add</div>
    </div>
    <div className='p-2 flex flex-col gap-1'> 
    <input type="number" name="" id="" placeholder='income' className='bg-slate-200 p-2 rounded-2xl w-xl pl-2 outline-amber-300'  onChange={(e) => {setIncome(Number(e.target.value) || 0)}} />
    <input type="text" name="" id="" placeholder='category' className='bg-slate-200 p-2 rounded-2xl w-xl pl-2 outline-amber-300' />
    <input type="number" name="" id="" placeholder='expense' className='bg-slate-200 p-2 rounded-2xl w-xl pl-2 outline-amber-300' onChange={(e) => {setExpense(Number(e.target.value) || 0)}} /> 
    <button onClick={handleExpense} className='p-3 bg-amber-300 w-sm rounded-2xl font-medium cursor-pointer hover:bg-amber-500 hover:text-white '>Submit</button>
    </div>
    </>
  )
}
