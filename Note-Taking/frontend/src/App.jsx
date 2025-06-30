import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AllNotes, CreateNote, EditDelete, Header, Search } from './component';

import './App.css';
function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] =useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({});

 
  useEffect(() => {
    const fetchNotes = async () => {
       await axios.get("http://localhost:3000/").then(res => {
         setNotes(res.data.notes);
         setLoading(false);
       });
    }
    fetchNotes();
  },[])


  return (
    <>
    <div className='m-1 p-2'>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Dashboard loading= {loading} setNotes={setNotes} />}>
          <Route index element={<AllNotes notes={notes} setNotes={setNotes} setNote ={setNote}/> } /> 
          
          </Route>
              <Route path='/note' element={ <CreateNote setTitle={setTitle} setContent = {setContent} title={title} content={content} setNotes={setNotes}/>}/>
              <Route path='/edit&delete' element={<EditDelete note={note} setTitle={setTitle} setContent = {setContent} title={title} content={content} setNotes={setNotes}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

function Dashboard ({loading, setNotes}) {
  // console.log(loading)
  return (
    <>
    {loading ?
     <div role="status" className="max-w-sm animate-pulse mt-4">
    <div className="h-5 bg-amber-500 rounded-full dark:bg-amber-700 w-3xl mb-4"></div>
    <div className="h-2 bg-amber-500 rounded-full dark:bg-amber-700  w-2xl mb-2.5"></div>
    <div className="h-2 bg-amber-500 rounded-full dark:bg-amber-700  w-xl mb-2.5"></div>
    <div className="h-2 bg-amber-500 rounded-full dark:bg-amber-700 w-2xl mb-2.5"></div>
    <div className="h-2 bg-amber-500 rounded-full dark:bg-amber-700 w-xl mb-2.5"></div>
    <div className="h-2 bg-amber-500 rounded-full dark:bg-amber-700  w-2xl  mb-2.5"></div>
    <div className="h-2 bg-amber-500 rounded-full dark:bg-amber-700 w-xl mb-2.5"></div>
    <div className="h-2 bg-amber-500 rounded-full dark:bg-amber-700 w-2xl mb-2.5"></div>
    <div className="h-2 bg-amber-500 rounded-full dark:bg-amber-700 w-xl mb-2.5"></div>
    <div className="h-2 bg-amber-500 rounded-full dark:bg-amber-700  w-2xl"></div>
    <span className="sr-only">Loading...</span>
</div>

    : 
     <>
      <Search setNotes={setNotes}/>
      <Outlet/>
    </>
    }
    </>
  )
}













export default App
