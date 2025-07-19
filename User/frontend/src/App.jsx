import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import UserContext from './context/UserContext';

function App() {
  const [user, setUser] = useState("")
  const [token, setToken] = useState("");
  useEffect(()=> {
    const fetch = () => {
      setToken(localStorage.getItem('token'))
    }
    fetch();
  },[token])
 
 
  return (
     <UserContext.Provider value = {{user, setUser}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <Dashboard/>} />
        <Route path='/signin' element = {<Signin/>} />
        <Route path='/signup' element = {<Signup/>} />
      </Routes>
    </BrowserRouter>
     </UserContext.Provider>
  )
}

const Dashboard = () => {
  const navigate = useNavigate();
   const token = localStorage.getItem('token')
  const handleSignin = () => {
    navigate('/signin')
  }

  const handleSignup = () => {
    navigate('/signup')
  }
  return(
    <div className='bg-amber-300 p-3 flex justify-between shadow-md rounded-xl sticky'>
      <div className='font-bold text-2xl font-mono '>
        welcome page
      </div>
        {!token ? <div className='flex gap-2 font-bold' >
         <button onClick={handleSignin} className='p-2 rounded-2xl bg-red-500 text-white'>signIn</button>
         <button onClick={handleSignup} className='p-2 rounded-2xl bg-green-500 text-white'>signup</button>
        </div> : <Dropdown/> }
    </div>
  )
}

const Dropdown = () => {

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="p-2 rounded-full bg-green-600 text-white text-center font-bold text-2xl h-10  items-center justify-center flex outline-0  w-full  gap-x-1.5 px-3 py-0.5 shadow-xs  ">
          A
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Account settings
            </a>
          </MenuItem>
         
          
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <MenuItem>
              <button
              onClick={handleSignOut}
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  )
}


export default App

//things for tommorow
/*
->check signin route
->add some content on dashboard page
->add conditions like when user signed in, will not go to the signin/singup page
*/
