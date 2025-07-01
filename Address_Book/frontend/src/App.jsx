import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className=''>
     <Header />
      <SearchBar />
      <AddContact />
      <PhoneBooks />
    <Details />
      
    </div>
    </>
  )
}

const Header = () => {
  return (
    <div> <h2>Address Book</h2></div>
  )
}

const SearchBar = () => {
  return (
    <div>
      <input type="text" placeholder='Search...' />
      <button>add contact</button>
    </div>
  )
}

const AddContact = () => {
  return (
    <div>
       <form action="#" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="">name:</label>
          <input type="text" />
          <label htmlFor="">phone number:</label>
          <input type="number" />
          <label htmlFor="">email:</label>
          <input type="email" />
          <label htmlFor="">address:</label>
          <textarea type="text" />
          <button>submit</button>
      </form>
    </div>
  )
}

const PhoneBooks = () => {
  return (
    <div>
        first letter of name
        <div>
        <h3>name</h3>
        <h4>email</h4>
        </div>
      </div>
  )
}

const Details = () => {
  return (
    <div>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="">name:</label>
              <input type="text" />
              <label htmlFor="">phone number:</label>
              <input type="number" />
              <label htmlFor="">email:</label>
              <input type="email" />
              <label htmlFor="">address:</label>
              <textarea type="text" />
              <button>edit</button>
              <button>delete</button>
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
