import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heading, } from "../components/Heading"

export const UserDelete = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

   

    const handleDelete = async() => {
        
       const response = await axios.post("http://localhost:3000/delete") 
        
        navigate('/')
    }
    return(
         <div className="">
             <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <Heading label = "Delete Account" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">   
                     <button onClick={handleDelete} type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs
             hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2
             focus-visible:outline-red-600">Delete My Account</button>
                    </div>
             </div>
        </div>
    )
}