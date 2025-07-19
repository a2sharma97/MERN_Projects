import { Link } from "react-router-dom"
export const Footer = ({label, buttonText, to}) => {
    return(
        <>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
                {label}
                <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to={to}>{buttonText}</Link>
            </p>
        </>
    )
}