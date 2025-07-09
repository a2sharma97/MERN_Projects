import { Button } from "../components/Button"
import { Footer } from "../components/Footer"
import { Heading, } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Label } from "../components/Label"
export const Signin = () => {
    return(
        <div className="">
            <div className="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
                <Heading label = "Sign in" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-5" action="#" method="POST">
                            <div>
                                <Label label = "Username" />
                                <InputBox />
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <Label label = "Password" />
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                </div>
                               <InputBox />
                            </div>                           
                            <div>
                                <Button />
                            </div>
                        </form>
                            <Footer label= "New User?" buttonText = "Sign Up" to = {"/signup"} />
                    </div>
            </div>
        </div>
    )
}