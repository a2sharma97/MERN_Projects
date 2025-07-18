import { X } from 'lucide-react';
import { useRef } from 'react';
export const Model = ({onclose}) => {
    const modelRef = useRef();
    const closeModel = (e) => {
        if(modelRef.current === e.target) {
            onclose();
        }
    }

    return(
        <div ref={modelRef} onClick={closeModel}  className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
           <div className='mt-10 flex flex-col gap-5  text-white'>
                <button onClick={onclose} className='place-self-end bg-black'><X /></button>
                <div className='bg-yellow-500 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
                    <h1 className='text-3xl font-extrabold'>Expense Added </h1>
                    <p className='text-3xl font-bold max-w-md text-center'>Tracking start</p>
                    <form >
                        <button onClick={(e) => {e.preventDefault(); onclose()}} className='mt-4 w-full items-center justify-center gap-1 px-5 py-2 font-medium rounded-md bg-black'>Okay </button>
                    </form>
                </div>
           </div>
        </div>
    )
}