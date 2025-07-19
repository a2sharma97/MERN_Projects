import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Footer } from "../components/Footer"
import { Heading, } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Label } from "../components/Label"
export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignin = async() => {
        const response = await axios.post("http://localhost:3000/api/v1/auth/signin",{
            username, password
        })
        localStorage.setItem("token", response.data.token);
        navigate('/')
    }
    return(
        <div className="">
            <div className="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
                <Heading label = "Sign in" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-5" action="#" method="POST">
                            <div>
                                <Label label = "Username" />
                                <InputBox type={"text"} onchange={(e) => {setUsername(e.target.value)}} />
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <Label label = "Password" />
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                </div>
                               <InputBox type={"password"} onchange={(e) => {setPassword(e.target.value)}} />
                            </div>                           
                            <div>
                                <Button onclick={handleSignin} buttonText={"Sign In"} />
                            </div>
                        </form>
                            <Footer label= "New User?" buttonText = "Sign Up" to = {"/signup"} />
                    </div>
            </div>
        </div>
    )
}