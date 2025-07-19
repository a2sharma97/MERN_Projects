import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    useEffect(()=> {
       const fetchUser = async() => {
        const response =  await axios.get('http://localhost:3000/me')
        setUser(response.data.user);
        navigate('/')
       }
       fetchUser()
    },[])


    return(
        <>
        {/* <button onClick={handleProfile} type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs
             hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2
             focus-visible:outline-green-600">show my profile</button>
             */}

             <div>{user.firstName}</div>
        
        </> 
    )
}