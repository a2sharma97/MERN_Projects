import { memo, useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const fetchAll = async() => {
       const updateRes = await axios.get("http://localhost:3000/");
       const updatedRes = updateRes.data;
       setContacts(updatedRes);
       setName("")
       setEmail("")
       setAddress("")
       setNumber("")
       setId("");
       setLoading(false);
    }
    fetchAll();
  },[])


  return (
    <>
    <div className=''>
     <Header />
     <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Dashboard loading = {loading}/>}>
            <Route index element ={<PhoneBooks name = {name} email = {email} contacts = {contacts} setId= {setId}/>}/>
        </Route>
        <Route path='/add' element= {<AddContact name = {name} setName = {setName} number ={number} 
        setNumber = {setNumber} email = {email} setEmail = {setEmail} address ={address} setAddress = {setAddress} setContacts = {setContacts}/>} />
        <Route path='/editdel' element= {<Details name = {name} setName = {setName} number ={number} 
        setNumber = {setNumber} email = {email} setEmail = {setEmail} address ={address} setAddress = {setAddress} setContacts = {setContacts} id = {id}  />}/>
      </Routes>
     </BrowserRouter>
    </div>
    </>
  )
}

const Dashboard = ({loading}) => {
  return (
    <>
    {
    loading ?
    <div role="status" className="max-w-sm animate-pulse mt-4">
      <div className="h-5 bg-blue-500 rounded-full dark:bg-blue-700 w-3xl mb-4"></div>
      <div className="h-2 bg-blue-500 rounded-full dark:bg-blue-700  w-2xl mb-2.5"></div>
      <div className="h-2 bg-blue-500 rounded-full dark:bg-blue-700  w-xl mb-2.5"></div>
      <div className="h-2 bg-blue-500 rounded-full dark:bg-blue-700 w-2xl mb-2.5"></div>
      <div className="h-2 bg-blue-500 rounded-full dark:bg-blue-700 w-xl mb-2.5"></div>
      <div className="h-2 bg-blue-500 rounded-full dark:bg-blue-700  w-2xl  mb-2.5"></div>
      <div className="h-2 bg-blue-500 rounded-full dark:bg-blue-700 w-xl mb-2.5"></div>
      <div className="h-2 bg-blue-500 rounded-full dark:bg-blue-700 w-2xl mb-2.5"></div>
      <div className="h-2 bg-blue-500 rounded-full dark:bg-blue-700 w-xl mb-2.5"></div>
      <div className="h-2 bg-blue-500 rounded-full dark:bg-blue-700  w-2xl"></div>
      <span className="sr-only">Loading...</span> 
    </div> :
      <>
        <SearchBar />
        <Outlet/>
      </>
    }
    </>
  )
}

const Header = memo(() => {
  return (
    <div className='text-center text-4xl font-bold mt-1 border-b-2 p-2 text-blue-600'> <h2 >Address Book</h2></div>
  )
})

const SearchBar = () => {
  return (
    <div className=' flex justify-between m-2 '>
      <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm ' type="text" placeholder='Search...' />
      <AddContactBtn />
    </div>
  )
}

const AddContactBtn = () => {
  const navigate = useNavigate();
  const handleContact = () => {
    navigate('/add')
  }
  return (
    <>
      <button onClick={handleContact} className='bg-blue-600 p-2 rounded-2xl font-semibold text-white'>Add contact</button>
    </>
  )
}

const AddContact = ({name, setName, email, setEmail, number, setNumber, address, setAddress, setContacts}) => {
  const navigation = useNavigate();

  const handleAddContact = async() => {
    try{
      const res = await axios.put("http://localhost:3000/phonebook",{
        name, number, email, address
      })
    fetchAll();
     navigation('/');
    } catch(err) {
      if(axios.IsAxiosError(err) && err.response) {
        alert("Server Error: " + err.response.data.msg);
      } else {
        alert("Some Error: " + err.message);
      }
    }
  }
  return (
    <div className='mx-auto mt-3'>
       <form action="#" onSubmit={(e) => e.preventDefault()} className=''>
        <div className='mb-1.5'>
        <label htmlFor="" className='text-xl text-blue-600  p-1 font-medium'>Name:</label>
          <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm ' type="text" placeholder='Enter your Name' value={name} onChange={(e) => {setName(e.target.value)}}  />
        </div>
        <div className='mb-1.5'>
          <label className='text-xl text-blue-600  p-1 font-medium' htmlFor="">phone:</label>
          <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm ' type="number" placeholder='Enter mobile number'
           value={number} onChange={(e) => {setNumber(e.target.value)}}/>
        </div>
        <div className='mb-1.5'>
          <label className='text-xl text-blue-600  p-1 font-medium' htmlFor="">email:</label>
          <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm ' type="email" placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
        </div>
        <div className='mb-1.5'>
          <label className='text-xl text-blue-600  p-1 font-medium' htmlFor="">address:</label>
          <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm ' type="text" placeholder='Enter Address' value = {address} onChange={(e) => {setAddress(e.target.value)}} />
        </div>
          <button onClick={handleAddContact} className='bg-blue-600 p-2 rounded-2xl font-semibold text-white'>Submit</button>
      </form>
    </div>
  )
}

const PhoneBooks = ({contacts, setId}) => {
  const navigate = useNavigate()
  const handleEditDelete = (id) => {
    setId(id);
    navigate('/editdel')
  }
  return (
    <>
    {contacts.length === 0 ?
      <div>No Notes Found!</div> :
      <div className='mt-2'>
        {
          contacts.map((contact) => {
          <div key={contact._id} className='border-2 rounded-xl m-2 p-2 flex bg-blue-600 ' onClick={() => handleEditDelete(contact._id)}>
             <div className='text-4xl border-2 rounded-full p-1.5 me-1 text-blue-400'>
              {contact.name[0].uppercase()}
             </div>
              <div className='text-white font-medium'>
                <h3 className='text-xl'>{contact}</h3>
                <h4 className='text-slate-300'>{contact.email}</h4>
              </div>
            </div>
        })}
      </div>
      }
    </>
  )
}

const Details = ({name, setName, email, setEmail, number, setNumber, address, setAddress, id}) => {
    const navigate = useNavigate();
    const handleEdit = async() => {
    try{
      const res = await axios.put("http://localhost:3000/update", {
        id, name, number, email, address
      })
      fetchAll();
      navigate('/');
    }  catch(err) {
      if(axios.IsAxiosError(err) && err.response) {
        alert("Server Error: " + err.response.data.msg);
      } else {
        alert("Some Error: " + err.message);
      }
    }
  }

  const handleDelete = async() => {
  try{
      await axios.delete("http://localhost:3000/delete", {
        data: { id }
      })
      fetchAll()
      navigate("/");
    } catch(err) {
      if(axios.IsAxiosError(err) && err.response) {
        alert("Server Error:" + err.response.data.message)
      } else {
        alert("Some Error: " + err.msg);
      }
    }
  }


   return (
    <div className=' flex  flex-col text-center justify-center items-center'>
       <form action="#" onSubmit={(e) => e.preventDefault()} className=''>
        <div className='mb-1.5'>
        <label htmlFor="" className='text-xl text-blue-600  p-1 font-medium'>Name:</label>
          <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm ' type="text" placeholder='Enter your Name' value={name} onChange={(e) => {setName(e.target.value)}} />
        </div>
        <div className='mb-1.5'>
          <label className='text-xl text-blue-600  p-1 font-medium' htmlFor="">phone:</label>
          <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm ' type="number" placeholder='Enter mobile number' value={number} onChange={(e) => {setNumber(e.target.value)}}/>
        </div>
        <div className='mb-1.5'>
          <label className='text-xl text-blue-600  p-1 font-medium' htmlFor="">email:</label>
          <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm ' type="email" placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
        </div>
        <div className='mb-1.5'>
          <label className='text-xl text-blue-600  p-1 font-medium' htmlFor="">address:</label>
          <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm h-fit ' type="text" placeholder='Enter Address'value={address} onChange={(e) => {setAddress(e.target.value)}} />
        </div>
        <div className='gap-3'>
          <button onClick={handleEdit} className='bg-blue-600 p-2 rounded-2xl font-semibold text-white mr-1'>Edit</button>
          <button onClick={handleDelete} className='bg-red-600 p-2 rounded-2xl font-semibold text-white'>Delete</button>
        </div>
      </form>
    </div>
  )
}

//tasks
/*
1.in my home page, shows only dashboard i.e header, search bar, add contact btn and all the contacts
2.when i click to add contact btn route to a page in which a form open where we fill the details of contact
3.when we are on home page and click to any contact it route to a page where the full details of contact will open and
  and in the same route we have the functionality to edit, delete and a back btn to go back to home page.
4.in the home page only contacts name, email show by clicking them it route to the edit page

*/


export default App
