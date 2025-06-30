 import { useNavigate } from "react-router-dom";
 export const AllNotes = ({ notes,  setNote}) => {
  const navigate = useNavigate()

  const handleRoute = (note) => {
    setNote(note)
      navigate('/edit&delete')
  }
  return (
    <>
    {notes.length === 0
     ? <div className='mt-28 text-center text-4xl text-gray-600 h-full   '>
          No Notes Found
       </div>
      :
    <div className='mt-2'>
      {
        notes.map(note => {
          return (
            <div key={note._id} className='border-2 border-amber-600 rounded-lg p-2 mt-1.5' onClick={()=> handleRoute(note)}>
              <h2 className='font-medium text-xl'>{note.title}</h2>
              <h3 className='font-normal text-slate-500 pt-1'>{note.content}</h3>
            </div>
          )
        })
      }
    </div>
}
    </>
  )
}
