import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchBook = async() => {
      await axios.get("http://localhost:3000/").then(res => {
        setContacts(res.data.allPhoneBooks);
        setLoading(false);
        
      })
    }
    fetchBook();
  },[])


  return (
    <>
    <div className=''>
     <Header />
     <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Dashboard loading = {loading} setContacts = {setContacts}/>}>
            <Route index element ={<PhoneBooks name = {name} email = {email} contacts = {contacts} setContact= {setContact}/>}/>
        </Route>
        <Route path='/add' element= {<AddContact name = {name} setName = {setName} number ={number} 
        setNumber = {setNumber} email = {email} setEmail = {setEmail} address ={address} setAddress = {setAddress} setContacts = {setContacts}/>} />
        <Route path='/editdel' element= {<Details name = {name} setName = {setName} number ={number} 
        setNumber = {setNumber} email = {email} setEmail = {setEmail} address ={address} setAddress = {setAddress} setContacts = {setContacts} contact = {contact}  />}/>
      </Routes>
     </BrowserRouter>
    </div>
    </>
  )
}

const Dashboard = ({loading, setContacts}) => {
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
        <SearchBar setContacts = {setContacts} />
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

const SearchBar = ({setContacts}) => {
  let canceled = false;
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const end = setTimeout(() => {
      axios.get(`http://localhost:3000/search?filter=${filter}`).then(res => {
       
        const data = res.data.allPhoneBooks || res.data;
        if(filter && data.length === 0) {
          alert("No Match Found");
        } else {
           if(!canceled) { //if axios takes more time to get the request it become a race condition
             setContacts(data);
            }
          }
      })
    },650)
    return () => {
      canceled = true;
      clearTimeout(end);
    }
  },[filter,setContacts])

  return (
    <div className=' flex justify-between m-2 '>
      <input className='p-2 bg-slate-200 border-transparent outline-blue-400 overflow-hidden rounded-2xl ms-1 w-sm ' type="text" placeholder='Search...' onChange={(e) => {setFilter(e.target.value)}}/>
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
   useEffect(() => {
      setName("")
      setEmail("")
      setNumber("")
      setAddress("")
    },[setName, setEmail, setNumber, setAddress])

  const handleAddContact = async() => {
    try{
      const res = await axios.post("http://localhost:3000/phonebook",{
        name: name, phoneNumber: number, email: email, address: address
      })
      const updateRes = await axios.get("http://localhost:3000/");
       const updatedRes = updateRes.data;
       
       setContacts(updatedRes.allPhoneBooks);
       setName("")
       setEmail("")
       setAddress("")
       setNumber("")
     navigation('/');
    } catch(err) {
      if(axios.isAxiosError(err) && err.response) {
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


const Details = ({name, setName, email, setEmail, number, setNumber, address, setAddress, contact, setContacts}) => {
    const navigate = useNavigate();

    useEffect(() => {
      setName(contact.name)
      setEmail(contact.email)
      setNumber(contact.phoneNumber)
      setAddress(contact.address)
    },[setName, setEmail, setNumber, setAddress])

    const handleEdit = async() => {
    try{
      const res = await axios.put("http://localhost:3000/update", {
        id: contact._id, name, phoneNumber: number, email, address
      })
      const updateRes = await axios.get("http://localhost:3000/")
    //  console.log(updateRes)
      const updatedRes = updateRes.data;
      // console.log(updatedRes)
      // console.log(updatedRes.allPhoneBooks)
      setContacts(updatedRes.allPhoneBooks);
       setName("")
       setEmail("")
       setAddress("")
       setNumber("")
      alert(res.msg || "Contact Edited")
      navigate('/');
    }  catch(err) {
      if(axios.isAxiosError(err) && err.response) {
        alert("Server Error: " + err.response.data.msg);
      } else {
        alert("Some Error: " + err.message);
      }
    }
  }

  const handleDelete = async() => {
  try{
      const res = await axios.delete("http://localhost:3000/delete", {
        data: {  id: contact._id }
      })
      const updateRes = await axios.get("http://localhost:3000/")
      // console.log(updateRes)
      const updatedRes = updateRes.data;
      // console.log(updatedRes)
      console.log(updatedRes.allPhoneBooks)
      setContacts(updatedRes.allPhoneBooks);
       setName("")
       setEmail("")
       setAddress("")
       setNumber("")
      alert(res.msg || "Contact deleted");
      navigate("/");
    } catch(err) {
      if(axios.isAxiosError(err) && err.response) {
        alert("Server Error:" + err.response.data.message)
      } else {
        alert("Some Error: " + err.msg);
      }
    }
  }
if (!contact?._id) {
  return <p>No contact selected. <button className='bg-blue-600 p-2 rounded-2xl font-semibold text-white mr-1' onClick={() => navigate('/')}>Back</button></p>;
}

   return (
    <div className=' flex  flex-col text-center justify-center items-center my-5 gap-3.5'>
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

const PhoneBooks = ({contacts, setContact}) => {
  const navigate = useNavigate()
  const handleEditDelete = (contact) => {
    setContact(contact);
    navigate('/editdel')
  }
  return (
    <>
    {contacts.length === 0 ?
      <div>No Notes Found!</div> :
      <div className='mt-2'>
        {
          contacts.map((contact) => {
            return (
          <div key={contact._id} className='border-2 rounded-xl m-2 p-2 flex bg-blue-600 ' onClick={() => handleEditDelete(contact)}>
             <div className='text-4xl border-2 rounded-full p-1.5 me-1 text-blue-400'>
              {contact.name[0].toUpperCase()}
             </div>
              <div className='text-white font-medium'>
                <h3 className='text-xl'>{contact.name}</h3>
                <h4 className='text-slate-300'>{contact.email}</h4>
              </div>
            </div>
            )
        })}
      </div>
      }
    </>
  )
}


export default App
