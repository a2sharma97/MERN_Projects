import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Heading, } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Label } from "../components/Label"

export const UserEdit = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    
    const handleEdit = async() => {
         if(password != confirmPassword) {
            setError("Password doesn't match");
            return;
        }
       const response = await axios.post("http://localhost:3000/update" , {
            username, password, firstName, lastName
        })
       console.log(response.data.message);
        navigate('/')
    }
    return(
         <div className="">
             <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <Heading label = "Edit User Profile" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-5" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <Label label= "FirstName" />
                                    <div className="mt-2">
                                       <InputBox onchange = {(e) => {
                                        setFirstName(e.target.value)
                                       }} />
                                    </div>
                            </div>
                            <div>
                                <Label label= "LastName" />
                                     <div className="mt-2">
                                        <InputBox onchange = {(e) => {
                                            setLastName(e.target.value)
                                        }} />
                                    </div>
                            </div>
                            <div>
                                 <Label label= "Username" />
                                    <div className="mt-2">
                                        <InputBox onchange = {(e) => {
                                            setUsername(e.target.value)
                                        }} />     
                                    </div>
                            </div>
                            <div>
                                 <Label label= "Password" />
                                    <div className="mt-2">
                                        <InputBox type = {"password"} onchange = {(e) => {
                                            setPassword(e.target.value)
                                        }} />                                    
                                     </div>
                            </div>
                            <div>
                                 <Label label= "Confirm Password" />
                                    <div className="mt-2">
                                        <InputBox type = {"password"} onchange = {(e) => {
                                            setConfirmPassword(e.target.value)
                                        }} />                                   
                                     </div>
                            </div>
                            <div>
                                {
                                    error ? <p className="text-red-600">{error}</p> :<></>
                                }
                                 <Button onclick = {handleEdit} buttonText ={"Edit"} /> 
                                
                            </div>
                        </form>
                       
                    </div>
             </div>
        </div>
    )
}