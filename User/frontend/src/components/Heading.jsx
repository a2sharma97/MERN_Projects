export const Heading = ({label}) => {
    return(
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm border-b-2 border-indigo-600">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 p-0.5">{label}</h2>
            </div>
        </>
    )
}