import { useNavigate } from "react-router-dom";
export const EditDelete = ({note, title, content, setTitle, setContent, setNotes}) => {
  
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  },[note, setTitle, setContent])

  const handleEdit = async () => {
    try{
      const res = await axios.put("http://localhost:3000/update",{
        id: note._id,
        title: title,
        content: content,
      })
      alert(res.msg || "Note updated");
      const updateRes = await axios.get("http://localhost:3000/");
      const updatedRes = updateRes.data;
      setNotes(updatedRes.notes);
      setTitle("")
      setContent("")
      navigate('/')
    }catch(err) {
      alert("some error" || err.message)
    }
  }


  const handleDelete = async () => {
    try{
      const res = await axios.delete("http://localhost:3000/delete", {
        data :{ id: note._id},
      })
      alert(res.msg || "Note deleted");
      const updateRes = await axios.get('http://localhost:3000/');
      const updatedRes = updateRes.data;
      setNotes(updatedRes.notes);
      
      navigate('/')
      setTitle("");
      setContent("");
    }catch (err) {
      alert("Server Error" + err.message)
    }

  }

  return(
    <div>
       <input className='w-full text-2xl pl-1.5 font-sans outline-none' type="text" value={title} placeholder='Title' onChange={(e)=>setTitle(e.target.value)} />
      <div className='h-96'>
      <textarea className='w-7xl h-96 text-lg pl-1.5 font-serif outline-none mt-1.5 ' type="text" value={content} placeholder='Note' onChange={(e)=>setContent(e.target.value)}/>
      </div>
      <div className='flex justify-end'>
      <button className='p-2 bg-amber-600 rounded-full text-white font-semibold mr-1 cursor-pointer' onClick={()=>handleEdit()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</button>
      <button className='p-2 bg-red-500 rounded-full text-white font-semibold cursor-pointer' onClick={()=> handleDelete()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</button>

      </div>
    </div>
  )
}
