import { useNavigate } from "react-router-dom";
export const CreateNote = ({title, content, setTitle, setContent, setNotes}) => {
  const navigate = useNavigate();
  
  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:3000/note", {
        title : title,
        content: content,
      })
      
      const updateRes = await axios.get("http://localhost:3000/");
      const updatedRes = updateRes.data;
      setNotes(updatedRes.notes)
      setTitle("");
      setContent("");
      navigate('/')
    } catch(err) {
      if(axios.isAxiosError(err) && err.response) {
        alert("Server error: " + err.response.data.msg)
      } else {
        alert("some error " + err.message);
      }
    }
  }
  return(
    <div>
      <input className='w-full text-2xl pl-1.5 font-serif outline-none overflow-hidden ' type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)} />
      <textarea className='w-7xl h-96 text-lg pl-1.5 font-serif outline-none mt-1.5 ' type="text" placeholder='Note' onChange={(e)=>setContent(e.target.value)} 
    />
    <div className='h-10' >
        <button aria-label="Create Note" className='text-white bg-amber-800 p-2 rounded-lg mt-1 cursor-pointer'onClick={handleAdd} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</button>

    </div>
 
    </div>
  )
}