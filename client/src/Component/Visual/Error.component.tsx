import { Error_props } from "../../Props/Error.props"
const Error_component = ({message}:Error_props) =>
{
    return (
        <>
            <div className="flex justify-center">
                <div className="text-white p-4 grid grid-cols-1">
                    <p className="text-lg font-bold">Oh no, something went wrong</p>
                    <p className="text-center">{message}</p>
                </div>
            </div>
        </>
    )
}

export default Error_component