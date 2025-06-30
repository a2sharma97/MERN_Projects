import { useNavigate } from "react-router-dom";
export const AddNote = () => {
  const navigate = useNavigate();
  return (
    <div>
       <button aria-label="Create Note" className='text-white bg-amber-800 p-2 rounded-lg cursor-pointer'
       onClick={()=> {
        navigate('/note')
       }}> Add Note +</button>
    </div>
  )
}