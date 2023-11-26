import DotLoader from "react-spinners/MoonLoader"

const Loading_component = () =>
{
    return (
        <>
            <div className="p-5 flex justify-center">
                <DotLoader
                loading = {true}
                size = {100}
                color={"yellow"}
                ></DotLoader>
            </div>
        </>
    )
}

export default Loading_component